/**
 * Site-wide identity. One place for the name, domain and defaults so nothing
 * downstream hardcodes them.
 */
export const SITE = {
  name: 'Mangora',
  url: 'https://mangora-web.web.app',
  title: 'Mangora - Manga & Manhwa Reader with AI Translation',
  description:
    'Mangora is an Android reader and translator with four reader modes, offline .cbz downloads, on-device OCR and optional online translation.',
  tagline: 'Read your way with four reader modes, offline downloads and optional page translation.',
  /** Fallback when no release is loaded yet; the live value comes from the latest GitHub release. */
  version: '0.0.1',
  packageId: 'com.mangora.app',
  locale: 'en',
  twitter: '@mangora',
} as const

/** Repository + raw content endpoints used by the data layer. */
export const REPO = {
  owner: 'MR-LORD-REX',
  name: 'mangora',
  branch: 'main',
  get html() {
    return `https://github.com/${REPO.owner}/${REPO.name}`
  },
  get rawBase() {
    return `https://raw.githubusercontent.com/${REPO.owner}/${REPO.name}/${REPO.branch}`
  },
  get releasesApi() {
    return `https://api.github.com/repos/${REPO.owner}/${REPO.name}/releases`
  },
  get contentsApi() {
    return `https://api.github.com/repos/${REPO.owner}/${REPO.name}/contents`
  },
} as const