import { Cpu, Download, Languages, Plug, Wifi } from 'lucide-react'
import { Container } from '../ui/Container'

const ITEMS = [
  { Icon: Plug, label: 'User-installed extensions' },
  { Icon: Download, label: 'Offline downloads' },
  { Icon: Cpu, label: 'On-device OCR' },
  { Icon: Languages, label: 'AI translation' },
  { Icon: Wifi, label: 'Offline reading' },
]

export function TrustStrip() {
  return (
    <div className="border-b border-line bg-surface/30">
      <Container className="py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:justify-between">
          {ITEMS.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm text-muted">
              <Icon aria-hidden="true" className="size-[18px] text-accent" strokeWidth={1.75} />
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}