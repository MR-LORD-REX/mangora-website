import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const SITE_URL = 'https://mangora-web.web.app'
const INDEX_URL = 'https://raw.githubusercontent.com/MR-LORD-REX/mangora/main/releases/index.json'
const VIRTUAL_ID = 'virtual:mangora-release-paths'
const RESOLVED_ID = '\0' + VIRTUAL_ID
const ALLOWED_HOSTS = ['shandra-polysyllogistic-electorally.ngrok-free.dev', 'localhost', '127.0.0.1']

interface IndexEntry {
  version: string
  date?: string
}

interface IndexShape {
  versions?: IndexEntry[]
}

function pickVersions(json: IndexShape): IndexEntry[] {
  return (json.versions ?? []).filter((v) => typeof v?.version === 'string')
}

/** releases/index.json at build time: local checkout first, then the raw endpoint. */
async function fetchVersions(): Promise<IndexEntry[]> {
  try {
    const local = path.resolve(process.cwd(), '..', 'TrApp', 'releases', 'index.json')
    if (fs.existsSync(local)) {
      const parsed = pickVersions(JSON.parse(fs.readFileSync(local, 'utf-8')) as IndexShape)
      if (parsed.length) return parsed
    }
  } catch {
    /* fall through to the network */
  }
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 4000)
    const res = await fetch(INDEX_URL, { signal: controller.signal })
    clearTimeout(timer)
    if (!res.ok) return []
    return pickVersions((await res.json()) as IndexShape)
  } catch {
    return []
  }
}

/**
 * Replaces the prerendered #root contents with an empty container and drops
 * `data-server-rendered`, so vite-react-ssg renders on the client instead of
 * hydrating. The catch-all rewrite points here, which keeps unknown paths
 * (404, /manga/:id) free of hydration mismatches (plan S10.4).
 */

function mangoraSeo(): Plugin {
  let versions: IndexEntry[] = []
  let isClientBuild = true

  return {
    name: 'mangora-seo',
    async configResolved(config) {
      isClientBuild = !config.build.ssr
      // Both builds need the list: the client build writes the sitemap, the SSR
      // build resolves getStaticPaths for /whats-new/:version.
      versions = await fetchVersions()
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
      return null
    },
    load(id) {
      if (id === RESOLVED_ID) {
        return `export const versionPaths = ${JSON.stringify(versions.map((v) => v.version))}`
      }
      return null
    },
    closeBundle() {
      if (!isClientBuild) return
      const outDir = path.resolve(process.cwd(), 'dist')
      if (!fs.existsSync(outDir)) return

      const today = new Date().toISOString().slice(0, 10)
      const staticRoutes = ['/', '/download', '/whats-new', '/how-to-use', '/privacy', '/terms', '/copyright']

      const urls = staticRoutes.map(
        (r) => `  <url><loc>${SITE_URL}${r}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`,
      )
      for (const v of versions) {
        urls.push(
          `  <url><loc>${SITE_URL}/whats-new/${encodeURIComponent(v.version)}</loc><lastmod>${
            v.date || today
          }</lastmod></url>`,
        )
      }
      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
          '\n',
        )}\n</urlset>\n`,
      )

      this.info?.(`sitemap.xml written (${urls.length} urls)`)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), mangoraSeo()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ALLOWED_HOSTS,
    hmr: {
      host: 'shandra-polysyllogistic-electorally.ngrok-free.dev',
      protocol: 'wss',
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ALLOWED_HOSTS,
  },
  ssgOptions: {
    entry: 'src/main.tsx',
    dirStyle: 'nested',
  },
})