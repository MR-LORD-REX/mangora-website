/**
 * Site-wide identity. One place for the name, domain and defaults so nothing
 * downstream hardcodes them.
 */
export const SITE = {
  name: 'Mangora',
  url: 'https://mangora-web.web.app',
  title: 'Mangora - Manga & Manhwa Reader with AI Translation',
  description:
    'Mangora is a free Android manga and manhwa reader with four reader modes, offline .cbz downloads, on-device OCR and built-in AI page translation.',
  tagline: 'Read manga and manhwa your way - eight sources, four reader modes, offline downloads and AI translation on every page.',
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

/** SFW providers only - the 18+ sources never appear on the site (plan S9). */
export interface Provider {
  id: string
  name: string
  accent: string
  /** null -> render a monogram tile instead of a logo */
  logo: string | null
}

export const PROVIDERS: Provider[] = [
  { id: 'mangadex', name: 'MangaDex', accent: '#8faeff', logo: '/assets/providers/mangadex.png' },
  { id: 'mangakatana', name: 'MangaKatana', accent: '#63d2a4', logo: '/assets/providers/mangakatana.png' },
  { id: 'mgeko', name: 'MangaGeko', accent: '#c084fc', logo: '/assets/providers/mgeko.png' },
  { id: 'comix', name: 'Comix', accent: '#22d3ee', logo: '/assets/providers/comix.png' },
  { id: 'brainrot', name: 'BrainRot', accent: '#a78bfa', logo: null },
  { id: 'philia', name: 'Philia Scans', accent: '#2dd4bf', logo: null },
]