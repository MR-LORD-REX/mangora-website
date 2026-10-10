import { Seo } from '../components/ui/Seo'
import { Section } from '../components/ui/Section'
import { Skeleton } from '../components/ui/Skeleton'
import { ErrorCard } from '../components/ui/ErrorCard'
import { ReleaseNote } from '../components/whatsnew/ReleaseNote'
import { GeneralNotes } from '../components/whatsnew/GeneralNotes'
import { VersionList } from '../components/whatsnew/VersionList'
import { useNote, useReleaseIndex } from '../hooks/useReleaseNotes'
import { SITE_LINKS } from '../lib/links'
import { formatDate } from '../lib/format'

export default function WhatsNew() {
  const { loading, index, error, reload } = useReleaseIndex()
  const latestEntry = index?.versions[0] ?? null
  const noteState = useNote(latestEntry?.file ?? null)
  const generalState = useNote(index?.general.file ?? null)

  return (
    <>
      <Seo
        title="What's New - Mangora Release Notes"
        description="Release notes for Mangora, the free Android manga and manhwa reader: what shipped in each version, and what is planned and in progress right now."
        path="/whats-new"
        image="/assets/og/og-whatsnew.png"
      />

      <Section>
        <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">Release notes</p>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">What&apos;s new in Mangora</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Every shipped version, newest first, plus what is being worked on next. Notes are read straight from
          the app repository.
        </p>

        {error ? (
          <div className="mt-10">
            <ErrorCard
              title="Could not load the release notes"
              body="The notes index could not be fetched. It may have moved, or the network dropped."
              href={SITE_LINKS.githubReleases}
              hrefLabel="Read on GitHub"
              onRetry={reload}
            />
          </div>
        ) : null}
      </Section>

      {!error ? (
        <>
          <Section className="border-t border-line pt-10">
            {loading ? (
              <>
                <Skeleton className="h-8 w-72" />
                <div className="mt-6 space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </>
            ) : (
              <>
                <h2 className="font-display text-2xl font-semibold text-ink">
                  Version {latestEntry?.version}
                  {latestEntry?.title ? <span className="text-muted"> - {latestEntry.title}</span> : null}
                </h2>
                {latestEntry?.date ? (
                  <p className="mt-1 font-mono text-xs text-muted">Released {formatDate(latestEntry.date)}</p>
                ) : null}
                <div className="mt-6">
                  <ReleaseNote state={noteState} />
                </div>
              </>
            )}
          </Section>

          <Section className="border-t border-line bg-surface/20">
            <div className="mx-auto max-w-3xl">
              <GeneralNotes state={generalState} />
            </div>
          </Section>

          <Section className="border-t border-line">
            <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">All versions</h2>
            <p className="mt-2 mb-6 text-sm text-muted">Pick a version to read its full notes.</p>
            {loading ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : index ? (
              <VersionList versions={index.versions} />
            ) : null}
          </Section>
        </>
      ) : null}
    </>
  )
}