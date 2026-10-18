import type { ReactNode } from 'react'
import { Seo } from '../components/ui/Seo'
import { Section } from '../components/ui/Section'

interface GuideSection {
  id: string
  heading: string
  what: ReactNode
  how: ReactNode
  gotchas: ReactNode[]
}

const SECTIONS: GuideSection[] = [
  {
    id: 'install',
    heading: 'Install Mangora',
    what: 'Mangora is distributed as a signed APK on GitHub Releases, with a mirror on Telegram. There is no Play Store listing.',
    how: (
      <>
        Open the <a href="/download">download page</a>, tap <strong>Download APK</strong>, then confirm the
        install when Android warns about unknown sources. Allow installs from your browser or file manager the
        first time.
      </>
    ),
    gotchas: [
      'Android 7.0 or newer, on an ARM64 (arm64-v8a) device. 32-bit ARM builds are not published.',
      'If Play Protect flags the sideload, choose “Install anyway” — the APK is signed and the certificate is published.',
      'Updating never requires uninstalling: a newer APK installs straight over the older one.',
    ],
  },
  {
    id: 'reader',
    heading: 'Read a chapter',
    what: 'Four reader modes cover webtoons and traditional manga: vertical scroll, horizontal scroll, vertical paged and horizontal paged.',
    how: (
      <>
        Open a series from your library or a source, then tap a chapter. Switch modes from the reader toolbar;
        tap zones turn pages, and rotation lock, keep-screen-awake and auto-scroll sit alongside.
      </>
    ),
    gotchas: [
      'Very tall webtoon pages decode through native subsampling, so the first screens of a long strip may fill in progressively.',
      'Some extensions may require an active session or foreground browsing for their content to remain available.',
    ],
  },
  {
    id: 'downloads',
    heading: 'Download for offline reading',
    what: 'Chapters are saved as .cbz archives into a folder you pick once, and stay fully browsable with no connection.',
    how: (
      <>
        Choose your download folder the first time you download. Queue chapters from a series, then watch the
        queue from the downloads library or the foreground notification.
      </>
    ),
    gotchas: [
      'Turn on Wi-Fi-only to pause the queue on mobile data; it resumes on its own when Wi-Fi returns.',
      'Live browse and search feeds are not cached — only downloaded chapters read offline.',
    ],
  },
  {
    id: 'translation',
    heading: 'OCR and AI translation',
    what: 'Mangora detects the text on a page, reads it, translates it and draws the result back over the artwork as an overlay.',
    how: (
      <>
        Translation is off by default. Free translation sends recognized text to Google's translation service.
        AI translation sends recognized text to Gemini using the API key you provide. Cloud OCR sends page
        crops to the service configured in the app; on-device OCR processes crops locally.
      </>
    ),
    gotchas: [
      'Online translation and cloud OCR involve external services and transmit text or image crops. Review the Privacy Policy before enabling them.',
      'Translation quality depends on the model and the key you supply; adjust the overlay text scale to fit the bubbles.',
    ],
  },
  {
    id: 'backup',
    heading: 'Back up and restore',
    what: 'The whole database exports to a single .db file, so your libraries, history and progress survive a reinstall.',
    how: (
      <>
        Open Settings and choose export. Point it at a folder you will keep; restore does the reverse from that
        same file.
      </>
    ),
    gotchas: ['Keep the exported .db somewhere safe — it is the only copy of your library state.'],
  },
  {
    id: 'extensions',
    heading: 'Extensions and reading services',
    what: 'Mangora includes an extension host, not a built-in catalogue or content service. You choose whether to connect a repository and install its extension.',
    how: (
      <>
        Add a compatible repository in Browse, review its listings, and install the extension you choose using
        Android's package installer. Installed extensions provide catalog and search results and retrieve
        material from their own endpoints.
      </>
    ),
    gotchas: [
      'Repositories, extensions and content services are independently operated. Mangora does not verify their authorization, legality, safety or privacy practices.',
      'Requests made while browsing, reading or downloading may disclose your IP address and request details to those services. See the Terms and Privacy Policy.',
    ],
  },
]

export default function HowToUse() {
  return (
    <>
      <Seo
        title="How to Use Mangora - Offline Reading & AI Translation"
        description="Step-by-step guide to Mangora: install the APK, read in four modes, translate manga pages with OCR and AI, download chapters offline, and back up your library."
        path="/how-to-use"
      />

      <Section>
        <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">Guide</p>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">How to use Mangora</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Everything from installing the APK to reading a translated page offline. Jump to a section below.
        </p>

        <nav aria-label="On this page" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex min-h-[36px] items-center rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
                >
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      <div className="border-t border-line">
        {SECTIONS.map((s) => (
          <Section key={s.id} id={s.id} className="scroll-mt-24 border-b border-line last:border-b-0">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">{s.heading}</h2>
                <p className="mt-3 leading-relaxed text-muted">{s.what}</p>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">How</h3>
                  <p className="mt-2 leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-2 [&_strong]:text-ink">
                    {s.how}
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Good to know</h3>
                  <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-2">
                    {s.gotchas.map((g, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Section>
        ))}
      </div>
    </>
  )
}