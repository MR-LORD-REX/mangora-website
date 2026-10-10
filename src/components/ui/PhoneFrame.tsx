import type { ReactNode } from 'react'
import { cn } from '../../lib/format'

/**
 * Pure-CSS phone mockup. No screenshot border baked in - children are clipped
 * to the screen area with rounded corners.
 */
export function PhoneFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('relative mx-auto w-full max-w-[300px]', className)}>
      <div className="relative rounded-[2.4rem] border border-line bg-surface-high p-[10px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="pointer-events-none absolute top-[10px] left-1/2 z-20 h-[22px] w-[92px] -translate-x-1/2 rounded-b-[14px] bg-bg/95" />
        <div className="relative overflow-hidden rounded-[1.9rem] border border-line bg-bg">
          <div className="relative aspect-[9/19.5] w-full">{children}</div>
        </div>
      </div>
    </div>
  )
}