import { ScanText, Sparkles, WandSparkles } from 'lucide-react'
import { Section } from '../ui/Section'
import { PhoneFrame } from '../ui/PhoneFrame'
import { Screenshot } from '../ui/Screenshot'
import { Reveal } from '../ui/Reveal'

const STEPS = [
  { Icon: Sparkles, title: 'Detect', body: 'A YOLO model finds the speech bubbles and text regions on the page.' },
  { Icon: ScanText, title: 'Read', body: 'OCR runs on-device through ExecuTorch, or through a cloud endpoint you configure.' },
  { Icon: WandSparkles, title: 'Translate', body: 'Gemini translates the text, batched with earlier pages for story context.' },
]

export function TranslationSection() {
  return (
    <Section className="border-t border-line bg-surface/20">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">Translation</p>
          <h2 className="font-display text-2xl font-semibold text-balance sm:text-3xl lg:text-4xl">
            Read a series the day it comes out
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            You do not need a pre-translated release. Mangora detects the text on the page, reads it, translates
            it and draws it back over the artwork - with adjustable text scale so the overlay fits the bubbles.
          </p>
          <ol className="mt-8 space-y-5">
            {STEPS.map(({ Icon, title, body }, i) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface-high font-mono text-sm text-accent">
                  {i + 1}
                </span>
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-ink">
                    <Icon aria-hidden="true" className="size-4 text-accent" strokeWidth={1.75} />
                    {title}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <PhoneFrame>
            <Screenshot
              src="/assets/screenshots/translation-overlay.png"
              alt="A manga page with Mangora's translated text drawn over the speech bubbles"
              fallbackLabel="translation-overlay.png"
            />
          </PhoneFrame>
        </Reveal>
      </div>
    </Section>
  )
}