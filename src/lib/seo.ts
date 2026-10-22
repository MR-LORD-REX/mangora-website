import { SITE } from './site'

export interface PageMeta {
  /** <= 60 chars, keyword-led then brand. */
  title: string
  /** 140-160 chars, benefit-led, unique. */
  description: string
  /** Route path beginning with "/" - used for canonical + og:url. */
  path: string
  /** Absolute or root-relative OG image. Defaults to /assets/og/og-default.png. */
  image?: string
  type?: 'website' | 'article'
  jsonLd?: unknown[]
}

const DEFAULT_OG = '/assets/og/og-default.png'

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const clean = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE.url}${clean}`
}

export function ogImage(image?: string): string {
  return absoluteUrl(image ?? DEFAULT_OG)
}

/** JSON-LD: SoftwareApplication, emitted on Home and Download. */
export function softwareApplicationLd(version: string, screenshots: string[] = []): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE.name,
    description: SITE.description,
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Manga reader',
    operatingSystem: 'Android',
    softwareVersion: version,
    downloadUrl: `${SITE.url}/download`,
    installUrl: `${SITE.url}/download`,
    softwareRequirements: 'Android 7.0 or newer, ARM64 or 32-bit ARM device',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    isAccessibleForFree: true,
    license: 'https://github.com/MR-LORD-REX/mangora/blob/main/LICENSE',
    ...(screenshots.length ? { screenshot: screenshots.map(absoluteUrl) } : {}),
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  }
}

/** JSON-LD: FAQPage, mirrors the Home FAQ. */
export function faqPageLd(faqs: Array<{ q: string; a: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** JSON-LD: WebSite (identity only - no on-site search, so no SearchAction). */
export function webSiteLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: SITE.locale,
  }
}