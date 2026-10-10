import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Seo } from '../components/ui/Seo'
import { Section } from '../components/ui/Section'
import { Badge } from '../components/ui/Badge'
import { ErrorCard } from '../components/ui/ErrorCard'
import { ReleaseNote } from '../components/whatsnew/ReleaseNote'
import { useNote, useReleaseIndex } from '../hooks/useReleaseNotes'
import { SITE_LINKS } from '../lib/links'
import { formatDate } from '../lib/format'

export default function WhatsNewVersion() {
  const { version = '' } = useParams<{ version: string }>()
  const { loading, index, error, reload } = useReleaseIndex()

  const idx = index?.versions.findIndex((v) => v.version === version) ?? -1
  const entry = idx >= 0 ? index!.versions[idx] : null
  const newer = idx > 0 ? index!.versions[idx - 1] : null
  const older = idx >= 0 && idx < (index?.versions.length ?? 0) - 1 ? index!.versions[idx + 1] : null

  const noteState = useNote(entry?.file ?? null)

  return (
    <>
      <Seo
        title={`Mangora ${version} Release Notes`}
        description={`What shipped in Mangora ${version}: release notes for the free Android manga and manhwa reader with offline downloads and AI translation.`}
        path={`/whats-new/${encodeURIComponent(version)}`}
        type="article"
      />

      <Section>
        <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">Release notes</p>

        {error ? (
          <ErrorCard
            title="Could not load the release notes"
            body="The notes index could not be fetched."
            href={SITE_LINKS.githubReleases}
            hrefLabel="Read on GitHub"
            onRetry={reload}
          />
        ) : null}

        {/* h1 comes from the route param so it is present in the prerendered HTML. */}
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Version {version}</h1>

        {entry ? (
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted">
            {entry.type === 'beta' ? <Badge tone="gold">Beta</Badge> : <Badge tone="accent">Stable</Badge>}
            {entry.date ? <span className="font-mono text-xs">Released {formatDate(entry.date)}</span> : null}
          </div>
        ) : null}

        {!error && !loading && !entry ? (
          <div className="mt-6 max-w-3xl">
            <ErrorCard
              title={`No notes for version ${version}`}
              body="That version is not in the release index. It may have been renamed, or the link is out of date."
              href={SITE_LINKS.githubReleases}
              hrefLabel="Read on GitHub"
            />
          </div>
        ) : null}

        {entry ? (
          <div className="mt-8 max-w-3xl">
            <ReleaseNote state={noteState} />
          </div>
        ) : null}

        <nav aria-label="Release navigation" className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-6">
          {newer ? (
            <Link
              to={`/whats-new/${encodeURIComponent(newer.version)}`}
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
              Newer: {newer.version}
            </Link>
          ) : (
            <span />
          )}
          {older ? (
            <Link
              to={`/whats-new/${encodeURIComponent(older.version)}`}
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              Older: {older.version}
              <ChevronRight aria-hidden="true" className="size-4" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </Section>
    </>
  )
}