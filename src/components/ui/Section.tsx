import type { ReactNode } from 'react'
import { cn } from '../../lib/format'
import { Container } from './Container'

interface SectionProps {
  id?: string
  className?: string
  containerClassName?: string
  children: ReactNode
  /** Render as a section (default) or a plain div when nesting. */
  as?: 'section' | 'div'
}

export function Section({ id, className, containerClassName, children, as: As = 'section' }: SectionProps) {
  return (
    <As id={id} className={cn('py-16 sm:py-20 lg:py-24', className)}>
      <Container className={containerClassName}>{children}</Container>
    </As>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ eyebrow, title, lead, align = 'left', className }: SectionHeaderProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-2xl font-semibold text-balance sm:text-3xl lg:text-4xl">{title}</h2>
      {lead ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{lead}</p> : null}
    </div>
  )
}