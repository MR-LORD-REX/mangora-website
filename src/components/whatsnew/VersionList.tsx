import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { formatDate } from '../../lib/format'
import type { ReleaseIndexEntry } from '../../lib/releases'

export function VersionList({ versions }: { versions: ReleaseIndexEntry[] }) {
  if (versions.length === 0) return null
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line">
      {versions.map((v) => (
        <li key={v.version}>
          <Link
            to={`/whats-new/${encodeURIComponent(v.version)}`}
            className="flex items-center justify-between gap-4 bg-surface px-5 py-4 transition-colors hover:bg-surface-high/60"
          >
            <span className="min-w-0">
              <span className="flex items-center gap-2">
                <span className="font-mono text-sm text-ink">{v.version}</span>
                {v.type === 'beta' ? <Badge tone="gold">Beta</Badge> : null}
              </span>
              <span className="mt-0.5 block truncate text-sm text-muted">{v.title}</span>
            </span>
            <span className="flex shrink-0 items-center gap-3 text-xs text-muted">
              <span className="hidden sm:inline">{formatDate(v.date)}</span>
              <ChevronRight aria-hidden="true" className="size-4 text-muted" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}