import { useState } from 'react'
import { Section, SectionHeader } from '../ui/Section'
import { PROVIDERS, type Provider } from '../../lib/site'
import { SITE_LINKS } from '../../lib/links'
import { cn } from '../../lib/format'

function ProviderTile({ provider }: { provider: Provider }) {
  const [failed, setFailed] = useState(provider.logo == null)

  return (
    <li className="group flex flex-col items-center gap-3 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent/40">
      <span
        className="flex size-14 items-center justify-center overflow-hidden rounded-md border"
        style={{ borderColor: `${provider.accent}55`, background: `${provider.accent}14` }}
      >
        {failed || !provider.logo ? (
          <span
            className="font-display text-lg font-semibold"
            style={{ color: provider.accent }}
            aria-hidden="true"
          >
            {provider.name.slice(0, 1)}
          </span>
        ) : (
          <img
            src={provider.logo}
            alt=""
            width={56}
            height={56}
            className="size-14 object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
      </span>
      <span className="text-center text-sm font-medium text-ink">{provider.name}</span>
    </li>
  )
}

export function SourceStrip() {
  return (
    <Section id="sources" className="border-t border-line bg-surface/20">
      <SectionHeader
        align="center"
        eyebrow="Sources"
        title="Eight sources, one reader"
        lead="Mangora hosts no content of its own - it fetches live from each provider when you read, and holds none of it."
      />
      <ul className={cn('mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6')}>
        {PROVIDERS.map((provider) => (
          <ProviderTile key={provider.id} provider={provider} />
        ))}
      </ul>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted">
        Mangora supports additional sources beyond the ones shown here. The full provider list, including
        adult-oriented sources, is documented in the{' '}
        <a
          href={SITE_LINKS.githubReadmeSources}
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
        >
          project README
        </a>
        . An opt-in age gate for those sources is planned.
      </p>
    </Section>
  )
}