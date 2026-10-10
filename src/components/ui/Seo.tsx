import { Head } from 'vite-react-ssg'
import { SITE } from '../../lib/site'
import { absoluteUrl, ogImage, type PageMeta } from '../../lib/seo'

/**
 * Every page routes its meta through here so no page hand-writes tags and the
 * prerendered HTML always carries a title, description, canonical and OG/Twitter
 * (plan S10.2).
 */
export function Seo({ title, description, path, image, type = 'website', jsonLd }: PageMeta) {
  const url = absoluteUrl(path)
  const og = ogImage(image)

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={og} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={og} />

      {(jsonLd ?? []).map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Head>
  )
}