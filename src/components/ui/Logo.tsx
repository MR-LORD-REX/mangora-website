import { useState } from 'react'
import { cn } from '../../lib/format'
import { SITE } from '../../lib/site'

/** Horizontal wordmark. Falls back to a text lockup if the asset is missing. */
export function Logo({ className, imgClassName }: { className?: string; imgClassName?: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <span className={cn('inline-flex items-center', className)}>
      {failed ? (
        <span className="font-display text-lg font-semibold tracking-tight text-ink">{SITE.name}</span>
      ) : (
        <img
          src="/assets/branding/wordmark-text.png"
          alt={`${SITE.name} home`}
          width={120}
          height={28}
          className={cn('h-7 w-auto', imgClassName)}
          onError={() => setFailed(true)}
          decoding="async"
        />
      )}
    </span>
  )
}