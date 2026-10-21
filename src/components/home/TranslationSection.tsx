import { ScanText, Sparkles, WandSparkles } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'

const STEPS = [
  { Icon: Sparkles, title: 'Detect', body: 'A YOLO model finds the speech bubbles and text regions on the page.' },
  { Icon: ScanText, title: 'Read', body: 'Download the OCR model for your language and read text entirely on-device.' },
  { Icon: WandSparkles, title: 'Translate', body: 'Use free or Gemini translation in Auto pages or Auto bubbles, or pre-translate whole downloaded chapters.' },
]

export function TranslationSection() {
  return (
    <Section className="border-t border-line bg-surface/20">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">Translation</p>
          <h2 className="font-display text-2xl font-semibold text-balance sm:text-3xl lg:text-4xl">
            Read a series the day it comes out
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            You do not need a pre-translated release. Mangora detects the text on the page, reads it on-device, translates
            it and draws it back over the artwork - with adjustable text scale so the overlay fits the bubbles.
            Auto pages waits for the full page; AI Auto bubbles sends 1-5 OCR-ready bubbles at a time for faster first
            translations while keeping prior pages as context. Downloadable PP-OCR models recognize text on-device:
            PP-OCRv6 covers Japanese, Chinese and English, while PP-OCRv5 covers Korean and Latin-script languages.
            You can also queue downloaded chapters for batch pre-translation under Settings, so translated pages can
            reopen from the saved translation cache.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {STEPS.map(({ Icon, title, body }, i) => (
              <li key={title} className="rounded-lg border border-line bg-surface p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface-high font-mono text-sm text-accent">
                  {i + 1}
                </span>
                <p className="mt-4 flex items-center gap-2 text-sm font-medium text-ink">
                  <Icon aria-hidden="true" className="size-4 text-accent" strokeWidth={1.75} />
                  {title}
                </p>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  )
}
