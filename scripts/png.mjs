// Minimal dependency-free PNG decode/encode for build-time asset prep.
// Supports 8-bit RGB (colortype 2) and RGBA (colortype 6), non-interlaced.
import zlib from 'node:zlib'

const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const body = Buffer.concat([typeBuf, data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body), 0)
  return Buffer.concat([len, body, crc])
}

/** @returns {{width:number,height:number,data:Buffer}} data is RGBA, row-major. */
export function decodePng(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not a png')
  let offset = 8
  let width = 0
  let height = 0
  let colorType = 6
  let bitDepth = 8
  const idat = []
  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset)
    const type = buf.toString('ascii', offset + 4, offset + 8)
    const data = buf.subarray(offset + 8, offset + 8 + len)
    if (type === 'IHDR') {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      bitDepth = data[8]
      colorType = data[9]
      if (data[12] !== 0) throw new Error('interlaced png unsupported')
      if (bitDepth !== 8) throw new Error('bit depth ' + bitDepth + ' unsupported')
    } else if (type === 'IDAT') {
      idat.push(Buffer.from(data))
    } else if (type === 'IEND') {
      break
    }
    offset += 12 + len
  }
  const raw = zlib.inflateSync(Buffer.concat(idat))
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 0
  if (!channels) throw new Error('color type ' + colorType + ' unsupported')
  const stride = width * channels
  const out = Buffer.alloc(width * height * 4)
  let prev = Buffer.alloc(stride)
  let pos = 0
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++]
    const line = Buffer.alloc(stride)
    for (let x = 0; x < stride; x++) {
      const rawByte = raw[pos++]
      const a = x >= channels ? line[x - channels] : 0
      const b = prev[x]
      const c = x >= channels ? prev[x - channels] : 0
      let value
      switch (filter) {
        case 0: value = rawByte; break
        case 1: value = rawByte + a; break
        case 2: value = rawByte + b; break
        case 3: value = rawByte + ((a + b) >> 1); break
        case 4: {
          const p = a + b - c
          const pa = Math.abs(p - a)
          const pb = Math.abs(p - b)
          const pc = Math.abs(p - c)
          value = rawByte + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)
          break
        }
        default: throw new Error('filter ' + filter)
      }
      line[x] = value & 0xff
    }
    for (let x = 0; x < width; x++) {
      const s = x * channels
      const d = (y * width + x) * 4
      out[d] = line[s]
      out[d + 1] = channels >= 3 ? line[s + 1] : line[s]
      out[d + 2] = channels >= 3 ? line[s + 2] : line[s]
      out[d + 3] = channels === 4 ? line[s + 3] : 255
    }
    prev = line
  }
  return { width, height, data: out }
}

/** Encode RGBA (row-major) to a PNG buffer. */
export function encodePng(width, height, rgba) {
  const stride = width * 4
  const raw = Buffer.alloc((stride + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride)
  }
  const idat = zlib.deflateSync(raw, { level: 9 })
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/** Box-filtered downscale of an RGBA image. */
export function resize(img, dstW, dstH) {
  const out = Buffer.alloc(dstW * dstH * 4)
  const xRatio = img.width / dstW
  const yRatio = img.height / dstH
  for (let y = 0; y < dstH; y++) {
    const sy0 = Math.floor(y * yRatio)
    const sy1 = Math.min(img.height, Math.max(sy0 + 1, Math.ceil((y + 1) * yRatio)))
    for (let x = 0; x < dstW; x++) {
      const sx0 = Math.floor(x * xRatio)
      const sx1 = Math.min(img.width, Math.max(sx0 + 1, Math.ceil((x + 1) * xRatio)))
      let r = 0
      let g = 0
      let b = 0
      let a = 0
      let n = 0
      for (let sy = sy0; sy < sy1; sy++) {
        for (let sx = sx0; sx < sx1; sx++) {
          const s = (sy * img.width + sx) * 4
          r += img.data[s]
          g += img.data[s + 1]
          b += img.data[s + 2]
          a += img.data[s + 3]
          n++
        }
      }
      const d = (y * dstW + x) * 4
      out[d] = Math.round(r / n)
      out[d + 1] = Math.round(g / n)
      out[d + 2] = Math.round(b / n)
      out[d + 3] = Math.round(a / n)
    }
  }
  return { width: dstW, height: dstH, data: out }
}