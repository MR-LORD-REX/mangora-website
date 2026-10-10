import { useEffect, useState } from 'react'
import { detectPlatform, type Platform } from '../lib/platform'

/** null until mounted, so the SSR/prerender output stays platform-neutral. */
export function usePlatform(): Platform | null {
  const [platform, setPlatform] = useState<Platform | null>(null)
  useEffect(() => {
    setPlatform(detectPlatform())
  }, [])
  return platform
}