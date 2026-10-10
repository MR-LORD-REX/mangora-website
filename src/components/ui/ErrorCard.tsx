import { TriangleAlert } from 'lucide-react'
import { Button } from './Button'

interface ErrorCardProps {
  title: string
  body: string
  href?: string
  hrefLabel?: string
  onRetry?: () => void
}

/** Non-blank failure state: a plain explanation plus a way out (plan S7, S8). */
export function ErrorCard({ title, body, href, hrefLabel = 'Open on GitHub', onRetry }: ErrorCardProps) {
  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <div className="flex items-start gap-3">
        <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.75} />
        <div>
          <p className="font-medium text-ink">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
        </div>
      </div>
      {href || onRetry ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {onRetry ? (
            <Button variant="secondary" onClick={onRetry}>
              Try again
            </Button>
          ) : null}
          {href ? <Button href={href}>{hrefLabel}</Button> : null}
        </div>
      ) : null}
    </div>
  )
}