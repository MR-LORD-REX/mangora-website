// Build-time asset prep. Run: node scripts/gen-assets.mjs
//  1. Derives a transparent horizontal wordmark from the app's stacked lockup.
//  2. Produces PWA icons + favicon from the app icon.
//  3. Fills every image slot from plan S12 with a themed placeholder so a
//     missing real asset never breaks the build or logs a 404.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { decodePng, encodePng, resize } from './png.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const branding = path.join(root, 'public/assets/branding')
const providers = path.join(root, 'public/assets/providers')
const screenshots = path.join(root, 'public/assets/screenshots')
const og = path.join(root, 'public/assets/og')
for (const dir of [branding, providers, screenshots, og]) fs.mkdirSync(dir, { recursive: true })

const BG = [0x0d, 0x10, 0x14]
const SURFACE = [0x1d, 0x23, 0x2d]
const ACCENT = [0x8f, 0xae, 0xff]

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b

// ---------------------------------------------------------------------------
// 1. Transparent horizontal wordmark
// ---------------------------------------------------------------------------
function deriveWordmark() {
  const img = decodePng(fs.readFileSync(path.join(branding, 'wordmark.png')))
  const { width: W, height: H, data } = img

  // Key the near-uniform dark background to transparent.
  const alpha = new Float32Array(W * H)
  const bright = new Uint8Array(W * H)
  for (let i = 0; i < W * H; i++) {
    const r = data[i * 4]
    const g = data[i * 4 + 1]
    const b = data[i * 4 + 2]
    const l = lum(r, g, b)
    const sat = Math.max(r, g, b) - Math.min(r, g, b)
    const isBgHue = sat < 56
    alpha[i] = isBgHue ? Math.min(1, Math.max(0, (l - 24) / (96 - 24))) : 1
    bright[i] = l > 150 ? 1 : 0
  }

  // Text band = the lower bright run (the lockup puts the wordmark under the icon).
  const rowCount = new Int32Array(H)
  for (let y = 0; y < H; y++) {
    let c = 0
    for (let x = 0; x < W; x++) c += bright[y * W + x]
    rowCount[y] = c
  }
  let top = -1
  let bottom = -1
  let runStart = -1
  for (let y = Math.floor(H * 0.45); y < H; y++) {
    const on = rowCount[y] > 4
    if (on && runStart < 0) runStart = y
    if ((!on || y === H - 1) && runStart >= 0) {
      const end = on ? y : y - 1
      // The lockup stacks icon over name - keep the bottom-most run, the wordmark.
      if (end - runStart < 420) {
        top = runStart
        bottom = end
      }
      runStart = -1
    }
  }
  if (top < 0) throw new Error('wordmark: could not locate text band')
  top = Math.max(0, top - 6)
  bottom = Math.min(H - 1, bottom + 6)

  let left = W
  let right = 0
  for (let y = top; y <= bottom; y++) {
    for (let x = 0; x < W; x++) {
      if (alpha[y * W + x] > 0.08) {
        if (x < left) left = x
        if (x > right) right = x
      }
    }
  }
  left = Math.max(0, left - 4)
  right = Math.min(W - 1, right + 4)

  const cw = right - left + 1
  const ch = bottom - top + 1
  const out = Buffer.alloc(cw * ch * 4)
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const si = (y + top) * W + (x + left)
      const di = (y * cw + x) * 4
      out[di] = data[si * 4]
      out[di + 1] = data[si * 4 + 1]
      out[di + 2] = data[si * 4 + 2]
      out[di + 3] = Math.round(alpha[si] * 255)
    }
  }
  fs.writeFileSync(path.join(branding, 'wordmark-text.png'), encodePng(cw, ch, out))
  console.log(`wordmark-text.png ${cw}x${ch}`)
  return { width: cw, height: ch, data: out }
}

// ---------------------------------------------------------------------------
// 2. Icons + favicon from the app icon
// ---------------------------------------------------------------------------
function writeIco(png32, file) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)
  const entry = Buffer.alloc(16)
  entry[0] = 32
  entry[1] = 32
  entry[2] = 0
  entry[3] = 0
  entry.writeUInt16LE(1, 4)
  entry.writeUInt16LE(32, 6)
  entry.writeUInt32LE(png32.length, 8)
  entry.writeUInt32LE(22, 12)
  fs.writeFileSync(file, Buffer.concat([header, entry, png32]))
}

function icons() {
  const icon = decodePng(fs.readFileSync(path.join(branding, 'app-icon.png')))
  for (const size of [192, 512]) {
    fs.writeFileSync(path.join(branding, `icon-${size}.png`), encodePng(size, size, resize(icon, size, size).data))
  }
  const small = resize(icon, 32, 32)
  writeIco(encodePng(32, 32, small.data), path.join(branding, 'favicon.ico'))
  console.log('icon-192 / icon-512 / favicon.ico written')
}

// ---------------------------------------------------------------------------
// 3. Themed placeholders
// ---------------------------------------------------------------------------
function blank(w, h, from, to) {
  const data = Buffer.alloc(w * h * 4)
  for (let y = 0; y < h; y++) {
    const t = y / (h - 1)
    for (let x = 0; x < w; x++) {
      const d = (y * w + x) * 4
      for (let c = 0; c < 3; c++) data[d + c] = Math.round(from[c] + (to[c] - from[c]) * t)
      data[d + 3] = 255
    }
  }
  return { width: w, height: h, data }
}

function glow(img, cx, cy, radius, color, strength) {
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const dx = (x - cx) / radius
      const dy = (y - cy) / radius
      const f = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy)) ** 2 * strength
      if (f <= 0) continue
      const d = (y * img.width + x) * 4
      for (let c = 0; c < 3; c++) img.data[d + c] = Math.min(255, Math.round(img.data[d + c] * (1 - f) + color[c] * f))
    }
  }
}

function composite(dst, src, ox, oy) {
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const s = (y * src.width + x) * 4
      const a = src.data[s + 3] / 255
      if (a <= 0) continue
      const dx = x + ox
      const dy = y + oy
      if (dx < 0 || dy < 0 || dx >= dst.width || dy >= dst.height) continue
      const d = (dy * dst.width + dx) * 4
      for (let c = 0; c < 3; c++) dst.data[d + c] = Math.round(dst.data[d + c] * (1 - a) + src.data[s + c] * a)
    }
  }
}

function ogImage(file, wordmark) {
  const img = blank(1200, 630, [0x0b, 0x0e, 0x12], SURFACE)
  glow(img, 200, 120, 620, ACCENT, 0.18)
  glow(img, 1040, 560, 520, [0xc0, 0x84, 0xfc], 0.12)
  const target = Math.round(1200 * 0.5)
  const scaled = resize(wordmark, target, Math.round((wordmark.height / wordmark.width) * target))
  composite(img, scaled, Math.round((1200 - scaled.width) / 2), Math.round((630 - scaled.height) / 2))
  fs.writeFileSync(path.join(og, file), encodePng(img.width, img.height, img.data))
}

function screenshot(file) {
  const img = blank(1080, 2340, BG, [0x12, 0x17, 0x20])
  glow(img, 540, 420, 900, ACCENT, 0.10)
  glow(img, 540, 2100, 800, [0xc0, 0x84, 0xfc], 0.06)
  fs.writeFileSync(path.join(screenshots, file), encodePng(img.width, img.height, img.data))
}

const wordmark = deriveWordmark()
icons()
for (const f of ['og-home.png', 'og-download.png', 'og-whatsnew.png', 'og-default.png']) ogImage(f, wordmark)
for (const f of [
  'hero-before.png', 'hero-after.png', 'library.png', 'translation-overlay.png', 'downloads.png',
  'reader-scroll.png', 'reader-paged.png', 'history.png', 'browse.png', 'download-queue.png', 'settings.png',
]) screenshot(f)
console.log('OG + screenshot placeholders written')