import { Columns3, Rows3, ScanLine, SlidersHorizontal } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'

const MODES = [
  { Icon: Rows3, title: 'Vertical scroll', body: 'One continuous long strip - the webtoon default.' },
  { Icon: Columns3, title: 'Horizontal scroll', body: 'Swipe left to right through the chapter.' },
  { Icon: SlidersHorizontal, title: 'Vertical paged', body: 'One page at a time, top to bottom.' },
  { Icon: ScanLine, title: 'Horizontal paged', body: 'Classic right-to-left paged reading.' },
]

export function ReaderSection() {
  return (
    <Section className="border-t border-line">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">The reader</p>
          <h2 className="font-display text-2xl font-semibold text-balance sm:text-3xl lg:text-4xl">
            Four ways to read, and neither is an afterthought
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Very tall pages render through native subsampling instead of choking, so a full webtoon chapter
            decodes smoothly. Tap zones, rotation lock and keep-screen-awake work in every mode.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {MODES.map(({ Icon, title, body }) => (
              <li key={title} className="flex gap-3">
                <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-medium text-ink">{title}</p>
                  <p className="mt-0.5 text-sm text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}