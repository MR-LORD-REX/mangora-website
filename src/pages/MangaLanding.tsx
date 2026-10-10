import { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import { Download, ExternalLink } from 'lucide-react'
import { Seo } from '../components/ui/Seo'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { SITE } from '../lib/site'

/**
 * Phase 2 deep-link target (plan S14.3). Serves the not-installed case only -
 * it never loads or displays chapter content.
 */
export default function MangaLanding() {
  const { id = '' } = useParams<{ id: string }>()
  const [params] = useSearchParams()
  const provider = params.get('provider') ?? ''
  const title = params.get('title') ?? ''
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const intentUrl = `intent://manga/${encodeURIComponent(id)}?provider=${encodeURIComponent(
    provider,
  )}#Intent;scheme=mangora;package=${SITE.packageId};end`

  return (
    <>
      <Seo
        title={title ? `Read ${title} in Mangora` : 'Open in Mangora'}
        description="Mangora is a free Android manga and manhwa reader with offline downloads and AI translation. Install it to open this series, or download the app."
        path={`/manga/${encodeURIComponent(id)}`}
      />
      <Section className="py-20">
        <div className="mx-auto max-w-xl rounded-lg border border-line bg-surface p-8 text-center">
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Open in Mangora</p>
          <h1 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {title || 'This series'}
          </h1>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {provider ? <Badge tone="accent">{provider}</Badge> : null}
            {id ? <Badge className="font-mono">{id}</Badge> : null}
          </div>

          <p className="mt-6 leading-relaxed text-muted">
            If Mangora is installed, open the link again from your Android device. If it is not, install it
            first — the series will load straight from {provider || 'the source'}.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/download" icon={<Download aria-hidden="true" className="size-5" />}>
              Get Mangora
            </Button>
            <Button href={intentUrl} variant="secondary" icon={<ExternalLink aria-hidden="true" className="size-4" />}>
              Open in app
            </Button>
          </div>

          {origin ? (
            <p className="mt-6 font-mono text-xs break-all text-muted/70">
              On-device link: mangora://manga/{id}
            </p>
          ) : null}
        </div>
      </Section>
    </>
  )
}