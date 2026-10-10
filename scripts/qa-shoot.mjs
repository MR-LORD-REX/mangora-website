// Full-page screenshots + console-error audit via the DevTools protocol. No npm deps.
// Usage: node scripts/qa-shoot.mjs <outDir> <baseUrl> <jobsJsonFile>
// Job shape: { name, path, width, height, mobile?, scale?, fullPage?, scrollY?, waitMs?, reducedMotion? }
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const outDir = process.argv[2]
const baseUrl = process.argv[3]
const jobsFile = process.argv[4]

const jobs = JSON.parse(fs.readFileSync(jobsFile, 'utf-8'))
fs.mkdirSync(outDir, { recursive: true })

const port = 9333 + Math.floor(Math.random() * 400)
const userDir = path.join(outDir, '.chrome-profile')

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-color-profile=srgb',
    '--user-data-dir=' + userDir,
    'about:blank',
  ],
  { stdio: 'ignore' },
)

async function waitForDevtools() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch('http://127.0.0.1:' + port + '/json/version')
      if (res.ok) return await res.json()
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 200))
  }
  throw new Error('chrome devtools never came up')
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function connect(url) {
  const ws = new WebSocket(url)
  let nextId = 1
  const pending = new Map()
  const collected = []

  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)
    } else {
      collected.push(msg)
    }
  })

  const ready = new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve)
    ws.addEventListener('error', reject)
  })

  function send(method, params = {}, sessionId) {
    const id = nextId++
    const payload = { id, method, params }
    if (sessionId) payload.sessionId = sessionId
    ws.send(JSON.stringify(payload))
    return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
  }

  function once(method, sessionId) {
    return new Promise((resolve) => {
      const handler = (ev) => {
        const msg = JSON.parse(ev.data)
        if (msg.method === method && (!sessionId || msg.sessionId === sessionId)) {
          ws.removeEventListener('message', handler)
          resolve(msg.params)
        }
      }
      ws.addEventListener('message', handler)
    })
  }

  return { ready, send, once, collected, close: () => ws.close() }
}

const version = await waitForDevtools()
const cdp = connect(version.webSocketDebuggerUrl)
await cdp.ready

let totalIssues = 0

for (const job of jobs) {
  const url = baseUrl + job.path
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true })

  await cdp.send('Page.enable', {}, sessionId)
  await cdp.send('Log.enable', {}, sessionId)
  await cdp.send('Runtime.enable', {}, sessionId)
  if (job.reducedMotion) {
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }, sessionId)
  }
  await cdp.send(
    'Emulation.setDeviceMetricsOverride',
    { width: job.width, height: job.height, deviceScaleFactor: job.scale ?? 1, mobile: !!job.mobile },
    sessionId,
  )

  const loaded = cdp.once('Page.loadEventFired', sessionId)
  await cdp.send('Page.navigate', { url }, sessionId)
  await loaded
  await sleep(job.waitMs ?? 500)

  // Reveal-on-scroll sections would otherwise screenshot at opacity 0.
  if (!job.noRevealFix) await cdp.send(
    'Runtime.evaluate',
    {
      expression:
        "document.head.insertAdjacentHTML('beforeend','<style>[data-reveal]{opacity:1!important;transform:none!important;transition:none!important}</style>');void 0",
    },
    sessionId,
  )
  if (job.click) {
    await cdp.send('Runtime.evaluate', { expression: 'document.querySelector(' + JSON.stringify(job.click) + ')?.click()' }, sessionId)
    await sleep(500)
  }
  if (job.scrollY) {
    await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0, ' + job.scrollY + ')' }, sessionId)
  }
  await sleep(400)

  const { data } = await cdp.send(
    'Page.captureScreenshot',
    { format: 'png', captureBeyondViewport: job.fullPage !== false, fromSurface: true },
    sessionId,
  )
  const file = path.join(outDir, job.name + '.png')
  fs.writeFileSync(file, Buffer.from(data, 'base64'))

  const issues = cdp.collected.filter(
    (m) =>
      m.sessionId === sessionId &&
      (m.method === 'Runtime.exceptionThrown' ||
        (m.method === 'Log.entryAdded' && ['error', 'warning'].includes(m.params?.entry?.level)) ||
        (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params?.type))),
  )
  totalIssues += issues.length
  console.log('shot ' + job.name + ' ' + job.width + 'x' + job.height + ' -> ' + file)
  if (issues.length === 0) {
    console.log('   console: clean')
  } else {
    console.log('   console: ' + issues.length + ' issue(s)')
    for (const m of issues.slice(0, 12)) {
      const detail =
        m.method === 'Runtime.exceptionThrown'
          ? m.params.exceptionDetails?.text + ' ' + (m.params.exceptionDetails?.exception?.description ?? '')
          : JSON.stringify(m.params).slice(0, 240)
      console.log('     - ' + m.method + ': ' + detail)
    }
  }

  cdp.collected.length = 0
  await cdp.send('Target.closeTarget', { targetId })
}

console.log('TOTAL console issues: ' + totalIssues)
cdp.close()
chrome.kill()
await sleep(300)
process.exit(0)