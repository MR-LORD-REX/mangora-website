import { useCallback, useEffect, useState } from 'react'
import { fetchReleases, splitReleases, releaseVersion, type Release } from '../lib/github'
import { SITE } from '../lib/site'

export interface ReleasesState {
  loading: boolean
  releases: Release[]
  stable: Release[]
  prerelease: Release[]
  error: 'rate-limited' | 'not-found' | 'network' | null
  /** Latest stable version, or the SITE fallback before the fetch resolves. */
  latestVersion: string
  latest: Release | null
  reload: () => void
}

const INITIAL = {
  loading: true,
  releases: [] as Release[],
  stable: [] as Release[],
  prerelease: [] as Release[],
  error: null,
  latestVersion: SITE.version,
  latest: null,
}

/** Client-only fetch of GitHub releases, cached 10 minutes. SSR-safe. */
export function useReleases(): ReleasesState {
  const [state, setState] = useState<Omit<ReleasesState, 'reload'>>(INITIAL)
  const [nonce, setNonce] = useState(0)
  const reload = useCallback(() => setNonce((n) => n + 1), [])

  useEffect(() => {
    let alive = true
    fetchReleases().then((res) => {
      if (!alive) return
      const split = splitReleases(res.releases)
      const latest = split.stable[0] ?? null
      setState({
        loading: false,
        releases: res.releases,
        stable: split.stable,
        prerelease: split.prerelease,
        error: res.error,
        latestVersion: latest ? releaseVersion(latest) : SITE.version,
        latest,
      })
    })
    return () => {
      alive = false
    }
  }, [nonce])

  return { ...state, reload }
}