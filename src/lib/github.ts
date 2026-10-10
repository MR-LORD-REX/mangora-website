import { REPO } from './site'
import { normalizeVersion } from './format'

export interface ReleaseAsset {
  name: string
  browser_download_url: string
  size: number
  download_count: number
}

export interface Release {
  id: number
  tag_name: string
  name: string | null
  body: string | null
  draft: boolean
  prerelease: boolean
  published_at: string | null
  created_at: string | null
  html_url: string
  assets: ReleaseAsset[]
}

/** A release asset that matched mangora-<abi>-<version>.apk. */
export interface ParsedApk {
  abi: string
  version: string
  url: string
  size: number
  downloadCount: number
  name: string
}

const APK_RE = /^mangora-(.+?)-(\d+\.\d+\.\d+)\.apk$/i

export function parseApkAsset(asset: ReleaseAsset): ParsedApk | null {
  const m = APK_RE.exec(asset.name)
  if (!m) return null
  return {
    abi: m[1],
    version: m[2],
    url: asset.browser_download_url,
    size: asset.size,
    downloadCount: asset.download_count,
    name: asset.name,
  }
}

export function releaseVersion(release: Release): string {
  return normalizeVersion(release.tag_name || release.name || '')
}

export type ReleasesError = 'rate-limited' | 'not-found' | 'network' | null

export interface ReleasesResult {
  releases: Release[]
  error: ReleasesError
}

const CACHE_KEY = 'mangora:releases'
const CACHE_TTL = 10 * 60 * 1000 // unauthenticated GitHub limit is 60 req/hr/IP

/** Dedupes concurrent callers (Footer + Download page) onto one request. */
let inFlight: Promise<ReleasesResult> | null = null

function readCache(): ReleasesResult | null {
  if (typeof sessionStorage === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { at: number; data: ReleasesResult }
    if (Date.now() - parsed.at > CACHE_TTL) return null
    return parsed.data
  } catch {
    return null
  }
}

function writeCache(data: ReleasesResult): void {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }))
  } catch {
    /* quota / private mode */
  }
}

/**
 * Fetch releases, drop drafts. Never throws - returns a typed error so pages
 * can render a fallback card instead of a blank screen (plan S7).
 */
export function fetchReleases(): Promise<ReleasesResult> {
  const cached = readCache()
  if (cached) return Promise.resolve(cached)
  if (inFlight) return inFlight

  inFlight = (async (): Promise<ReleasesResult> => {
    try {
      const res = await fetch(`${REPO.releasesApi}?per_page=100`, {
        headers: { Accept: 'application/vnd.github+json' },
      })
      if (res.status === 403 || res.status === 429) return { releases: [], error: 'rate-limited' }
      if (res.status === 404) return { releases: [], error: 'not-found' }
      if (!res.ok) return { releases: [], error: 'network' }
      const json = (await res.json()) as Release[]
      const releases = Array.isArray(json) ? json.filter((r) => !r.draft) : []
      const data: ReleasesResult = { releases, error: null }
      writeCache(data)
      return data
    } catch {
      return { releases: [], error: 'network' }
    } finally {
      inFlight = null
    }
  })()

  return inFlight
}

export interface SplitReleases {
  stable: Release[]
  prerelease: Release[]
}

export function splitReleases(releases: Release[]): SplitReleases {
  const sorted = [...releases].sort(
    (a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime(),
  )
  return {
    stable: sorted.filter((r) => !r.prerelease),
    prerelease: sorted.filter((r) => r.prerelease),
  }
}