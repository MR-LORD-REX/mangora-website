import { Calendar, Download, HardDrive, Package } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { formatBytes, formatDate } from '../../lib/format'
import { parseApkAsset, releaseVersion, type Release } from '../../lib/github'
import { SITE_LINKS } from '../../lib/links'

export function getApks(release: Release) {
  const parsed = release.assets.map(parseApkAsset).filter((a): a is NonNullable<typeof a> => a != null)
  return parsed.filter((apk) => /^(arm64-v8a|armeabi-v7a)$/i.test(apk.abi))
}

/** Prefer arm64-v8a for the history row's single download link. */
export function pickApk(release: Release) {
  const apks = getApks(release)
  return apks.find((apk) => /^arm64-v8a$/i.test(apk.abi)) ?? apks[0] ?? null
}

export function ReleaseCard({ release }: { release: Release }) {
  const apk = pickApk(release)
  const apks = getApks(release)
  const version = releaseVersion(release)

  return (
    <div className="rounded-lg border border-accent/25 bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">Latest</Badge>
        <Badge>{release.prerelease ? 'Beta' : 'Stable'}</Badge>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Mangora {version}</h1>
        {release.name ? <p className="text-muted">{release.name}</p> : null}
      </div>

      <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        <div className="flex items-center gap-2">
          <Calendar aria-hidden="true" className="size-4 text-muted" strokeWidth={1.75} />
          <dt className="sr-only">Published</dt>
          <dd>{formatDate(release.published_at)}</dd>
        </div>
        {apk ? (
          <>
            <div className="flex items-center gap-2">
              <HardDrive aria-hidden="true" className="size-4" strokeWidth={1.75} />
              <dt className="sr-only">Size</dt>
              <dd>{formatBytes(apk.size)}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Package aria-hidden="true" className="size-4" strokeWidth={1.75} />
              <dt className="sr-only">ABI</dt>
              <dd className="font-mono">{apk.abi}</dd>
            </div>
          </>
        ) : null}
      </dl>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        {apks.length > 0 ? (
          apks.map((asset) => (
            <Button
              key={asset.name}
              href={asset.url}
              download
              size="lg"
              icon={<Download aria-hidden="true" className="size-5" />}
            >
              Download {asset.abi}
            </Button>
          ))
        ) : (
          <Button href={release.html_url} size="lg" icon={<Download aria-hidden="true" className="size-5" />}>
            Open on GitHub
          </Button>
        )}
        <Button href={SITE_LINKS.githubReleases} variant="secondary" size="lg">
          All releases
        </Button>
      </div>

      {apks.length > 0 ? (
        <p className="mt-4 font-mono text-xs break-all text-muted">
          {apks.map((asset) => asset.name).join(' · ')}
          <span className="text-muted/60"> &middot; Choose the APK matching your device architecture.</span>
        </p>
      ) : (
        <p className="mt-4 text-xs text-muted">
          No APK asset on this release yet - open it on GitHub for the details.
        </p>
      )}
    </div>
  )
}