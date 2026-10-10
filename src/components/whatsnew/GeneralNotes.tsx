import { Markdown } from '../ui/Markdown'
import { Skeleton } from '../ui/Skeleton'
import type { NoteState } from '../../hooks/useReleaseNotes'

export function GeneralNotes({ state }: { state: NoteState }) {
  if (state.loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    )
  }
  if (state.error || !state.note) return null
  return <Markdown content={state.note} />
}