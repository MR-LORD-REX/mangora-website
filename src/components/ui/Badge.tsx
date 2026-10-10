import type { ReactNode } from 'react'
import { cn } from '../../lib/format'

export type BadgeTone = 'neutral' | 'accent' | 'gold' | 'danger' | 'success'

interface BadgeProps {
  tone?: BadgeTone
  className?: string
  children: ReactNode
}

const TONES: Record<BadgeTone, string> = {
  neutral: 'border-line bg-surface-high text-muted',
  accent: 'border-accent/40 bg-accent-soft text-accent',
  gold: 'border-gold/40 bg-gold/10 text-gold',
  danger: 'border-danger/40 bg-danger/10 text-danger',
  success: 'border-success/40 bg-success/10 text-success',
}

export function Badge({ tone = 'neutral', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs font-medium whitespace-nowrap',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}