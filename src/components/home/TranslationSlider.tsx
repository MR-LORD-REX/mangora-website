import { useCallback, useEffect, useRef, useState } from 'react'
import { GripVertical } from 'lucide-react'
import { cn } from '../../lib/format'

const EASE = 'cubic-bezier(.22,1,.36,1)'

/**
 * Hero before/after slider (plan S6.1.1). Pointer + keyboard operable.
 * Position is driven by state; the handle and the clipped overlay share the
 * same transition so they never desync. Reduced motion kills the transition
 * globally via index.css.
 */
export function TranslationSlider({ className }: { className?: string }) {
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  // One-time nudge the first time it scrolls into view, so it reads as draggable.
  useEffect(() => {
    const el = trackRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    let done = false
    const io = new IntersectionObserver(
      (entries) => {
        if (done || !entries.some((e) => e.isIntersecting)) return
        done = true
        io.disconnect()
        timers.current = [180, 620, 1060].map((delay, i) =>
          window.setTimeout(() => setPos([62, 40, 50][i]), delay),
        )
      },
      { threshold: 0.55 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      timers.current.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  const updateFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.width === 0) return
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }, [])

  function onKeyDown(e: React.KeyboardEvent) {
    let next: number | null = null
    if (e.key === 'ArrowLeft') next = pos - 2
    else if (e.key === 'ArrowRight') next = pos + 2
    else if (e.key === 'PageDown') next = pos - 10
    else if (e.key === 'PageUp') next = pos + 10
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = 100
    if (next == null) return
    e.preventDefault()
    setPos(Math.min(100, Math.max(0, next)))
  }

  const eased = dragging ? 'none' : `left .35s ${EASE}`
  const easedClip = dragging ? 'none' : `clip-path .35s ${EASE}`

  return (
    <div
      ref={trackRef}
      className={cn('relative h-full w-full touch-none overflow-hidden select-none', className)}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        setDragging(true)
        updateFromClientX(e.clientX)
      }}
      onPointerMove={(e) => {
        if (dragging) updateFromClientX(e.clientX)
      }}
      onPointerUp={(e) => {
        setDragging(false)
        try {
          e.currentTarget.releasePointerCapture(e.pointerId)
        } catch {
          /* pointer already released */
        }
      }}
      onPointerCancel={() => setDragging(false)}
    >
      <img
        src="/assets/screenshots/hero-before.png"
        alt="A manga page as it appears in Mangora, in the original language"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <img
        src="/assets/screenshots/hero-after.png"
        alt="The same manga page with Mangora's AI translation drawn over the artwork"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${pos}%)`, transition: easedClip }}
        draggable={false}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/70 to-transparent" />

      <span className="pointer-events-none absolute top-3 left-3 rounded-full border border-line bg-bg/70 px-2.5 py-1 font-mono text-[10px] tracking-wide text-ink uppercase backdrop-blur">
        Original
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-full border border-accent/40 bg-accent-soft/80 px-2.5 py-1 font-mono text-[10px] tracking-wide text-accent uppercase backdrop-blur">
        Translated
      </span>

      <div className="absolute top-0 bottom-0 z-20 w-px bg-accent" style={{ left: `${pos}%`, transition: eased }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Reveal the AI translation"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)} percent translated`}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-accent/60 bg-bg/90 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.9)] backdrop-blur transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <GripVertical aria-hidden="true" className="size-5 text-accent" />
        </div>
      </div>
    </div>
  )
}