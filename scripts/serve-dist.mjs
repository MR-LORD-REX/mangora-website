import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
const root = path.resolve(process.argv[2] || 'dist')
const port = Number(process.argv[3] || 4173)
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.woff2':'font/woff2', '.xml':'application/xml', '.txt':'text/plain' }
http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0])
  let file = path.join(root, url)
  if (!file.startsWith(root)) { res.writeHead(403); return res.end() }
  try {
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
    if (!fs.existsSync(file)) {
      const shell = path.join(root, 'app.html')
      file = fs.existsSync(shell) ? shell : path.join(root, 'index.html')
    }
    const body = fs.readFileSync(file)
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' })
    res.end(body)
  } catch (e) { res.writeHead(500); res.end(String(e)) }
}).listen(port, () => console.log(`serving ${root} on http://127.0.0.1:${port}`))
