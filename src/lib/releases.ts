import { REPO } from './site'

export type ReleaseType = 'stable' | 'beta'

export interface ReleaseIndexEntry {
  version: string
  date: string
  title: string
  file: string
  type: ReleaseType
}

export interface ReleaseIndex {
  latest: string
  versions: ReleaseIndexEntry[]
  general: { file: string; updated: string }
}

export type FetchError = 'not-found' | 'network' | null

export interface FetchResult<T> {
  data: T | null
  error: FetchError
}

const CACHE_TTL = 5 * 60 * 1000 // matches raw.githubusercontent max-age

function readCache<T>(key: string): T | null {
  if (typeof sessionStorage === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { at: number; data: T }
    if (Date.now() - parsed.at > CACHE_TTL) return null
    return parsed.data
  } catch {
    return null
  }
}

function writeCache<T>(key: string, data: T): void {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }))
  } catch {
    /* ignore */
  }
}

async function fetchText(url: string): Promise<{ text: string | null; status: number }> {
  const res = await fetch(url, { headers: { Accept: 'text/plain, application/json' } })
  if (!res.ok) return { text: null, status: res.status }
  return { text: await res.text(), status: res.status }
}

/**
 * Fetch releases/index.json from the raw endpoint. Falls back to the GitHub
 * Contents API if the file is missing, so a half-populated repo still renders.
 */
export async function fetchReleaseIndex(): Promise<FetchResult<ReleaseIndex>> {
  const cacheKey = 'mangora:release-index'
  const cached = readCache<ReleaseIndex>(cacheKey)
  if (cached) return { data: cached, error: null }

  try {
    const { text, status } = await fetchText(`${REPO.rawBase}/releases/index.json`)
    if (status === 404) return fetchIndexFromContents()
    if (!text) return { data: null, error: 'network' }

    const parsed = JSON.parse(text) as ReleaseIndex
    if (!parsed || !Array.isArray(parsed.versions)) return { data: null, error: 'network' }
    writeCache(cacheKey, parsed)
    return { data: parsed, error: null }
  } catch {
    return { data: null, error: 'network' }
  }
}

/** Last-resort index: enumerate the releases folder via the Contents API. */
async function fetchIndexFromContents(): Promise<FetchResult<ReleaseIndex>> {
  try {
    const res = await fetch(`${REPO.contentsApi}/releases`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return { data: null, error: res.status === 404 ? 'not-found' : 'network' }
    const files = (await res.json()) as Array<{ name: string; download_url: string }>
    const versions = files
      .map((f) => /^v(.+?)\.md$/.exec(f.name))
      .filter((m): m is RegExpExecArray => m != null)
      .map((m) => ({ version: m[1], date: '', title: `Version ${m[1]}`, file: `v${m[1]}.md`, type: 'stable' as ReleaseType }))
      .sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }))
    if (!versions.length) return { data: null, error: 'not-found' }
    const index: ReleaseIndex = {
      latest: versions[0].version,
      versions,
      general: { file: 'general.md', updated: '' },
    }
    return { data: index, error: null }
  } catch {
    return { data: null, error: 'network' }
  }
}

/** Fetch a single markdown note by file name (e.g. "v1.0.1.md"). */
export async function fetchNote(file: string): Promise<FetchResult<string>> {
  const cacheKey = `mangora:note:${file}`
  const cached = readCache<string>(cacheKey)
  if (cached) return { data: cached, error: null }

  try {
    const { text, status } = await fetchText(`${REPO.rawBase}/releases/${file}`)
    if (status === 404) return { data: null, error: 'not-found' }
    if (!text) return { data: null, error: 'network' }
    writeCache(cacheKey, text)
    return { data: text, error: null }
  } catch {
    return { data: null, error: 'network' }
  }
}