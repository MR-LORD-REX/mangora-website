import type { ReactNode } from 'react'
import { cn } from '../../lib/format'

interface CardProps {
  className?: string
  children: ReactNode
  as?: 'div' | 'article' | 'li'
}

export function Card({ className, children, as: As = 'div' }: CardProps) {
  return (
    <As
      className={cn(
        'rounded-lg border border-line bg-surface p-6 transition-colors duration-150',
        'shadow-[var(--shadow-lift)]',
        className,
      )}
    >
      {children}
    </As>
  )
}