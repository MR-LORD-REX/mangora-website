import { ExternalLink } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { formatBytes, formatCount, formatDate } from '../../lib/format'
import { releaseVersion, type Release } from '../../lib/github'
import { getApks, pickApk } from './ReleaseCard'

function sizeOf(release: Release): number | null {
  const apk = pickApk(release)
  return apk ? apk.size : null
}

function downloadsOf(release: Release): number {
  return release.assets.reduce((sum, a) => sum + (a.download_count ?? 0), 0)
}

export function VersionHistory({ releases }: { releases: Release[] }) {
  if (releases.length === 0) return null

  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <caption className="sr-only">Release history for Mangora</caption>
        <thead>
          <tr className="bg-surface-high text-left text-xs tracking-wide text-muted uppercase">
            <th scope="col" className="px-4 py-3 font-medium">Version</th>
            <th scope="col" className="px-4 py-3 font-medium">Date</th>
            <th scope="col" className="px-4 py-3 font-medium">Size</th>
            <th scope="col" className="px-4 py-3 font-medium">Downloads</th>
            <th scope="col" className="px-4 py-3 font-medium">Links</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {releases.map((release) => {
            const apks = getApks(release)
            const size = sizeOf(release)
            return (
              <tr key={release.id} className="bg-surface">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 font-mono text-ink">
                    {releaseVersion(release)}
                    {release.prerelease ? <Badge tone="gold">Beta</Badge> : null}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{formatDate(release.published_at)}</td>
                <td className="px-4 py-3 text-muted">{size ? formatBytes(size) : '-'}</td>
                <td className="px-4 py-3 text-muted">{formatCount(downloadsOf(release))}</td>
                <td className="px-4 py-3">
                  <span className="flex flex-wrap items-center gap-3">
                    {apks.map((asset) => (
                      <a
                        key={asset.name}
                        href={asset.url}
                        download
                        className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
                      >
                        {asset.abi}
                      </a>
                    ))}
                    <a
                      href={release.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 text-muted hover:text-ink"
                    >
                      GitHub
                      <ExternalLink aria-hidden="true" className="size-3.5" />
                    </a>
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}