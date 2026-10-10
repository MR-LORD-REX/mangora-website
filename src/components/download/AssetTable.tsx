import { Download } from 'lucide-react'
import { formatBytes, formatCount } from '../../lib/format'
import { type Release } from '../../lib/github'

export function AssetTable({ release }: { release: Release }) {
  if (release.assets.length === 0) {
    return <p className="text-sm text-muted">No downloadable assets on this release.</p>
  }
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-md border border-line">
      {release.assets.map((asset) => (
        <li key={asset.name} className="flex flex-wrap items-center justify-between gap-3 bg-surface px-4 py-3">
          <span className="font-mono text-xs break-all text-ink">{asset.name}</span>
          <span className="flex items-center gap-4 text-xs text-muted">
            <span>{formatBytes(asset.size)}</span>
            <span>{formatCount(asset.download_count)} downloads</span>
            <a
              href={asset.browser_download_url}
              download
              className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 font-medium text-accent transition-colors hover:border-accent/60"
            >
              <Download aria-hidden="true" className="size-3.5" />
              Download
            </a>
          </span>
        </li>
      ))}
    </ul>
  )
}