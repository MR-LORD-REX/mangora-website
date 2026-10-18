import { Bell, FolderDown, HardDrive, Wifi } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'

const POINTS = [
  { Icon: FolderDown, title: 'A folder you choose', body: 'Downloads land as clean .cbz archives wherever you point Mangora.' },
  { Icon: Wifi, title: 'Wi-Fi only, resumable', body: 'Queue chapters, switch on Wi-Fi-only, and it resumes on its own when you reconnect.' },
  { Icon: Bell, title: 'Foreground control', body: 'A notification drives the queue with pause, resume and cancel.' },
  { Icon: HardDrive, title: 'Read on a plane', body: 'Downloaded series stay fully browsable offline - search, sort and filters intact.' },
]

export function OfflineSection() {
  return (
    <Section className="border-t border-line">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">Offline</p>
        <h2 className="font-display text-2xl font-semibold text-balance sm:text-3xl lg:text-4xl">
          Download once, read anywhere
        </h2>
        <p className="mt-4 leading-relaxed text-muted">
          Mangora keeps its own library of what you have downloaded, separate from the live sources, so a
          finished series reads exactly the same with no connection at all.
        </p>
      </div>

      <div className="mt-14">
        <Reveal>
          <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {POINTS.map(({ Icon, title, body }) => (
              <li key={title} className="rounded-lg border border-line bg-surface p-5">
                <span className="mb-3 inline-flex size-10 items-center justify-center rounded-md border border-line bg-surface-high text-accent">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}