import { Download, Send } from 'lucide-react'
import { Section } from '../ui/Section'
import { Button } from '../ui/Button'
import { LINKS } from '../../lib/links'

const REQUIREMENTS = ['Android 7.0+', 'ARM64 (arm64-v8a)', '~120 MB', 'Signed APK from GitHub']

export function InstallCta() {
  return (
    <Section className="border-t border-line">
      <div className="relative overflow-hidden rounded-xl border border-accent/25 bg-accent-soft/40 px-6 py-14 text-center sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]"
        />
        <div className="relative">
          <h2 className="font-display text-2xl font-semibold text-balance sm:text-3xl lg:text-4xl">
            Install Mangora in a minute
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
            Free to download, with no account. Choose whether to use extensions and online translation services.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button to="/download" size="lg" icon={<Download aria-hidden="true" className="size-5" />}>
              Download APK
            </Button>
            <Button
              href={LINKS.telegram}
              size="lg"
              variant="secondary"
              icon={<Send aria-hidden="true" className="size-4" />}
            >
              Join Telegram
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
            {REQUIREMENTS.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}