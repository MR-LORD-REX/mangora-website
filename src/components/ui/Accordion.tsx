import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/format'

export interface AccordionEntry {
  question: string
  answer: ReactNode
}

interface AccordionProps {
  items: AccordionEntry[]
  /** Index open on first paint, or -1 for all closed. */
  defaultOpen?: number
  className?: string
}

/**
 * Single-open accordion. Answers stay in the DOM when collapsed (grid 0fr->1fr
 * trick) so prerendered HTML carries the full FAQ text for SEO (plan S10.3).
 */
export function Accordion({ items, defaultOpen = 0, className }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const base = useId()

  return (
    <div className={cn('divide-y divide-line rounded-lg border border-line bg-surface', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${base}-btn-${i}`
        const panelId = `${base}-panel-${i}`
        return (
          <div key={item.question}>
            <h3 className="m-0">
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={cn(
                  'flex min-h-[44px] w-full items-center justify-between gap-4 px-5 py-4 text-left',
                  'text-[15px] font-medium text-ink transition-colors hover:bg-surface-high/50',
                  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent',
                )}
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn('size-5 shrink-0 text-muted transition-transform duration-200', isOpen && 'rotate-180 text-accent')}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                'grid transition-[grid-template-rows] duration-250 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.answer}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}