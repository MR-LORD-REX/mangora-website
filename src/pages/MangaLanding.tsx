import { useLocation, useSearchParams, useParams } from 'react-router-dom'
import { Download, ExternalLink } from 'lucide-react'
import { Seo } from '../components/ui/Seo'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { SITE } from '../lib/site'

/**
 * Phase 2 deep-link target (plan S14.3). Serves the not-installed case only -
 * it never loads or displays chapter content.
 */
export default function MangaLanding() {
  const { id = '' } = useParams<{ id: string }>()
  const location = useLocation()
  // /manga/... covers chapter sources; gallery (one-shot) shares use /oneshot/....
  const kind = location.pathname.startsWith('/oneshot') ? 'oneshot' : 'manga'
  const [params] = useSearchParams()
  const provider = params.get('provider') ?? ''
  const title = params.get('title') ?? ''
  const intentUrl = `intent://${kind}/${encodeURIComponent(id)}?provider=${encodeURIComponent(
    provider,
  )}#Intent;scheme=mangora;package=${SITE.packageId};end`

  return (
    <>
      <Seo
        title={title ? `Read ${title} in Mangora` : 'Open in Mangora'}
        description="Mangora is a free Android reader and translator. Open this link in the app to check whether the extension you use can retrieve its details."
        path={`/${kind}/${encodeURIComponent(id)}`}
      />
      <Section className="py-20">
        <div className="mx-auto max-w-xl rounded-lg border border-line bg-surface p-8 text-center">
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Open in Mangora</p>
          <h1 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {title || 'This series'}
          </h1>
          <p className="mt-6 leading-relaxed text-muted">
            This link can be opened in Mangora on Android. Mangora does not host the series; if available, its
            details are fetched by the third-party extension configured in the app.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/download" icon={<Download aria-hidden="true" className="size-5" />}>
              Get Mangora
            </Button>
            <Button href={intentUrl} variant="secondary" icon={<ExternalLink aria-hidden="true" className="size-4" />}>
              Open in app
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}