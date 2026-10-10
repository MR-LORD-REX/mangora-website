// Post-build: derive dist/app.html from the FINAL prerendered index.html by
// emptying #root and dropping data-server-rendered. vite-react-ssg uses that
// attribute to choose hydrate vs render; without it the catch-all rewrite
// target renders on the client with no hydration mismatch.
import fs from 'node:fs'
import path from 'node:path'

const outDir = path.resolve(process.cwd(), 'dist')
const indexHtml = path.join(outDir, 'index.html')
if (!fs.existsSync(indexHtml)) {
  console.error('make-shell: dist/index.html not found - run the build first')
  process.exit(1)
}

const html = fs.readFileSync(indexHtml, 'utf-8')
const start = html.indexOf('<div id="root"')
if (start < 0) {
  console.error('make-shell: #root not found in index.html')
  process.exit(1)
}

const openEnd = html.indexOf('>', start) + 1
const tag = /<\/?div\b[^>]*>/g
tag.lastIndex = openEnd
let depth = 1
let end = html.length
let match
while ((match = tag.exec(html))) {
  depth += match[0].startsWith('</') ? -1 : 1
  if (depth === 0) {
    end = match.index
    break
  }
}

const shell = html.slice(0, start) + '<div id="root"></div>' + html.slice(end + '</div>'.length)
fs.writeFileSync(path.join(outDir, 'app.html'), shell)
console.log(`make-shell: dist/app.html written (${shell.length} bytes)`)