export type Platform = 'android' | 'ios' | 'desktop'

/**
 * Client-only. Never call during render - invoke inside useEffect so the SSR
 * pass does not touch navigator (plan S4, S7).
 */
export function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'desktop'

  // userAgentData is Chromium-only and tells the truth about the OS even on
  // desktop; fall back to the UA string everywhere else.
  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string; mobile?: boolean } }).userAgentData
  if (uaData?.platform) {
    const p = uaData.platform.toLowerCase()
    if (p.includes('android')) return 'android'
    if (p.includes('ios') || p.includes('iphone') || p.includes('ipad')) return 'ios'
    if (uaData.mobile) return 'android'
    return 'desktop'
  }

  const ua = navigator.userAgent || ''
  if (/android/i.test(ua)) return 'android'
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios'
  // iPadOS 13+ reports as Macintosh but has touch points.
  if (/macintosh/i.test(ua) && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1) return 'ios'
  return 'desktop'
}