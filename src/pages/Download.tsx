import { ChevronDown, ShieldCheck, Smartphone, HardDrive, Package } from 'lucide-react'
import { Seo } from '../components/ui/Seo'
import { Section } from '../components/ui/Section'
import { Skeleton } from '../components/ui/Skeleton'
import { ErrorCard } from '../components/ui/ErrorCard'
import { Badge } from '../components/ui/Badge'
import { PlatformDetect } from '../components/download/PlatformDetect'
import { ReleaseCard } from '../components/download/ReleaseCard'
import { VersionHistory } from '../components/download/VersionHistory'
import { AssetTable } from '../components/download/AssetTable'
import { useReleases } from '../hooks/useReleases'
import { usePlatform } from '../hooks/usePlatform'
import { softwareApplicationLd } from '../lib/seo'
import { SITE_LINKS } from '../lib/links'

const REQUIREMENTS = [
  { Icon: Smartphone, label: 'Android 7.0 or newer' },
  { Icon: Package, label: 'ARM64 (arm64-v8a) device' },
  { Icon: HardDrive, label: 'About 120 MB to install' },
  { Icon: ShieldCheck, label: 'Allow install from unknown sources' },
]

const ERRORS = {
  'rate-limited': 'GitHub is rate-limiting anonymous requests right now. The direct releases page still works.',
  'not-found': 'No published release was found for this repository yet.',
  network: 'The release feed could not be reached. Check your connection, or open the releases page directly.',
} as const

export default function Download() {
  const platform = usePlatform()
  const { loading, stable, prerelease, error, latest, latestVersion, reload } = useReleases()

  return (
    <>
      <Seo
        title="Download Mangora - Free Manga Reader APK for Android"
        description="Download the latest Mangora APK for Android: free, ARM64, Android 7.0+, served from GitHub Releases, with offline downloads and built-in AI translation."
        path="/download"
        image="/assets/og/og-download.png"
        jsonLd={[softwareApplicationLd(latestVersion)]}
      />

      <Section className="pb-8">
        <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">Download</p>
        <h1 className="font-display text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
          Get Mangora on Android
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Free, open source and signed. The APK is published on GitHub Releases and mirrored on Telegram.
        </p>

        <div className="mt-8">
          <PlatformDetect platform={platform} />
        </div>

        <div className="mt-8">
          {loading ? <PrimarySkeleton /> : null}

          {!loading && error ? (
            <ErrorCard
              title="Could not load the latest release"
              body={ERRORS[error]}
              href={SITE_LINKS.githubReleases}
              hrefLabel="Open GitHub Releases"
              onRetry={reload}
            />
          ) : null}

          {!loading && !error && latest ? <ReleaseCard release={latest} /> : null}

          {!loading && !error && !latest ? (
            <ErrorCard
              title="No releases yet"
              body="Once a release is published it shows up here automatically, with the size, date and a direct download."
              href={SITE_LINKS.githubReleases}
              hrefLabel="Open GitHub Releases"
            />
          ) : null}
        </div>
      </Section>

      <Section className="py-8">
        <h2 className="text-lg font-semibold text-ink">Requirements</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REQUIREMENTS.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3.5">
              <Icon aria-hidden="true" className="size-5 shrink-0 text-accent" strokeWidth={1.75} />
              <span className="text-sm text-ink">{label}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Badge tone="accent">arm64-v8a</Badge>
          <p className="text-sm text-muted">32-bit ARM builds are not distributed.</p>
        </div>
      </Section>

      <Section className="border-t border-line">
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Version history</h2>
        <p className="mt-2 mb-6 text-sm text-muted">Every published release, newest first.</p>

        {loading ? <HistorySkeleton /> : null}
        {!loading && error ? (
          <p className="text-sm text-muted">
            Release history is unavailable right now -{' '}
            <a
              href={SITE_LINKS.githubReleases}
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
            >
              view it on GitHub
            </a>
            .
          </p>
        ) : null}
        {!loading && !error && stable.length + prerelease.length > 0 ? (
          <VersionHistory releases={[...stable, ...prerelease]} />
        ) : null}
        {!loading && !error && stable.length + prerelease.length === 0 ? (
          <p className="text-sm text-muted">
            No releases have been published yet - check back soon, or{' '}
            <a
              href={SITE_LINKS.githubReleases}
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
            >
              watch the GitHub releases page
            </a>
            .
          </p>
        ) : null}

        {!loading && !error && prerelease.length > 0 ? (
          <details className="group mt-8 rounded-lg border border-line bg-surface">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-medium text-ink">
              Pre-releases ({prerelease.length})
              <ChevronDown aria-hidden="true" className="size-5 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <div className="space-y-4 border-t border-line p-5">
              {prerelease.map((release) => (
                <div key={release.id}>
                  <p className="mb-2 flex items-center gap-2 font-mono text-sm text-ink">
                    {release.tag_name}
                    <Badge tone="gold">Beta</Badge>
                  </p>
                  <AssetTable release={release} />
                </div>
              ))}
            </div>
          </details>
        ) : null}
      </Section>
    </>
  )
}

function PrimarySkeleton() {
  return (
    <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="mt-5 h-10 w-64 max-w-full" />
      <Skeleton className="mt-4 h-4 w-80 max-w-full" />
      <Skeleton className="mt-7 h-12 w-44 rounded-full" />
    </div>
  )
}

function HistorySkeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  )
}