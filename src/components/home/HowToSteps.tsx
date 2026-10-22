import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Reveal } from '../ui/Reveal'

const STEPS = [
  { title: 'Install the APK', body: 'Choose the ARM64 or 32-bit ARM APK that matches your Android system, then allow the install.', to: '/how-to-use#install' },
  { title: 'Choose an extension', body: 'Add a compatible extension repository and install the extension you choose.', to: '/how-to-use#extensions' },
  { title: 'Read and translate', body: 'Download an OCR model, then pick Single page, Auto pages or Auto bubbles in the reader.', to: '/how-to-use#translation' },
  { title: 'Download for offline', body: 'Queue chapters to a folder you choose and read them with no connection.', to: '/how-to-use#downloads' },
]

export function HowToSteps() {
  return (
    <Section className="border-t border-line">
      <SectionHeader
        eyebrow="How to use"
        title="Set up in four steps"
        lead="From installing the APK to reading translated pages offline - the whole flow is short."
      />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.05}>
            <li className="h-full">
              <Link
                to={step.to}
                className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <span className="mb-4 font-mono text-2xl font-semibold text-accent/70">0{i + 1}</span>
                <span className="text-base font-semibold text-ink">{step.title}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{step.body}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Read the guide
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
