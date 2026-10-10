import { cn } from '../../lib/format'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-md bg-surface-high', className)} aria-hidden="true" />
}

/** Neutral placeholder for a missing/failed image slot - keeps layout intact. */
export function ImageFallback({ className, label }: { className?: string; label?: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-md border border-line bg-surface-high/60 text-center',
        className,
      )}
      role="img"
      aria-label={label ?? 'Image placeholder'}
    >
      <span className="px-3 font-mono text-[11px] leading-tight tracking-wide text-muted/70">{label ?? 'image'}</span>
    </div>
  )
}