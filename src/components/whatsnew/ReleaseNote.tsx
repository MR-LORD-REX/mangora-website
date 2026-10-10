import { Markdown } from '../ui/Markdown'
import { Skeleton } from '../ui/Skeleton'
import { ErrorCard } from '../ui/ErrorCard'
import { SITE_LINKS } from '../../lib/links'
import type { NoteState } from '../../hooks/useReleaseNotes'

export function ReleaseNote({ state, emptyLabel }: { state: NoteState; emptyLabel?: string }) {
  if (state.loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    )
  }
  if (state.error || !state.note) {
    return (
      <ErrorCard
        title="Could not load this release note"
        body={emptyLabel ?? 'The note file could not be fetched. It may have moved, or the network dropped.'}
        href={SITE_LINKS.githubReleases}
        hrefLabel="Read it on GitHub"
        onRetry={state.reload}
      />
    )
  }
  return <Markdown content={state.note} />
}