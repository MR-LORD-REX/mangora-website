import { SITE } from './site'

/**
 * Canonical external + internal URLs. Mirrors the app's LINKS object in
 * components/settings/AboutSection.tsx. Components must import from here -
 * never hardcode a URL.
 */
export const LINKS = {
  whatsNew: `${SITE.url}/whats-new`,
  privacy: `${SITE.url}/privacy`,
  terms: `${SITE.url}/terms`,
  copyright: `${SITE.url}/copyright`,
  telegram: 'https://t.me/MangoraApp',
  reddit: 'https://www.reddit.com/r/mangora',
  github: 'https://github.com/MR-LORD-REX/mangora',
  discord: 'https://discord.gg/ZWfMtkRTFR',
} as const

/** Non-app links the site needs but the app does not. */
export const SITE_LINKS = {
  githubReleases: 'https://github.com/MR-LORD-REX/mangora/releases',
  githubLatest: 'https://github.com/MR-LORD-REX/mangora/releases/latest',
} as const