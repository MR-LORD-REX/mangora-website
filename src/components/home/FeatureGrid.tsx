import { BookOpen, Download, Languages, Library, ScanText, ShieldCheck } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'

const FEATURES = [
  {
    Icon: Library,
    title: 'Multi-source library',
    body: 'Every source in one place. Search inside a source, browse across all of them, and organize series into unlimited named libraries.',
  },
  {
    Icon: BookOpen,
    title: 'Four reader modes',
    body: 'Vertical scroll, horizontal scroll, vertical paged and horizontal paged - with tap-zone page turns, rotation lock and auto-scroll.',
  },
  {
    Icon: Download,
    title: 'Offline .cbz downloads',
    body: 'Chapters are saved as .cbz archives into a folder you choose, with a global queue and a Wi-Fi-only mode that resumes on its own.',
  },
  {
    Icon: ScanText,
    title: 'OCR text detection',
    body: 'YOLO finds the speech bubbles on any page. Download a Baberu or PP-OCRv5 model and run recognition entirely on-device.',
  },
  {
    Icon: Languages,
    title: 'AI page translation',
    body: 'Auto pages translates a whole page; Auto bubbles sends small OCR-ready batches for faster overlays. Both use prior pages as story context, then draw the result over the art.',
  },
  {
    Icon: ShieldCheck,
    title: 'Private by default',
    body: 'No account, in-app analytics or Mangora backend. Library data stays on-device; extensions and optional translation contact the services you choose directly.',
  },
]

export function FeatureGrid() {
  return (
    <Section id="features">
      <SectionHeader
        eyebrow="Everything in one app"
        title="Built to read, not to sell you something"
        lead="Mangora is a reader first - fast, offline-capable and private, with the translation tooling most readers leave for you to bolt on."
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ Icon, title, body }, i) => (
          <Reveal key={title} delay={i * 0.05}>
            <Card as="li" className="h-full hover:-translate-y-1 hover:border-accent/40">
              <span className="mb-5 inline-flex size-11 items-center justify-center rounded-md border border-line bg-surface-high text-accent">
                <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
              </span>
              <h3 className="text-base font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
