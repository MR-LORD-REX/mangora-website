import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../lib/format'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds. Use small offsets for staggered lists. */
  delay?: number
}

/**
 * Section reveal: opacity + translateY, once, on scroll-into-view.
 * Reduced motion keeps the opacity fade and drops the transform (plan S11).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      data-reveal=""
      className={cn(className)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}