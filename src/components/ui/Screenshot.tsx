import { useState } from 'react'
import { cn } from '../../lib/format'
import { ImageFallback } from './Skeleton'

interface ScreenshotProps {
  src: string
  alt: string
  className?: string
  /** Shown inside the themed placeholder if the file is missing. */
  fallbackLabel?: string
  priority?: boolean
}

/** App screenshot with a themed placeholder fallback (plan S12). */
export function Screenshot({ src, alt, className, fallbackLabel, priority }: ScreenshotProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <ImageFallback className={cn('h-full w-full', className)} label={fallbackLabel ?? alt} />
  }
  return (
    <img
      src={src}
      alt={alt}
      width={1080}
      height={2340}
      className={cn('h-full w-full object-cover', className)}
      onError={() => setFailed(true)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
    />
  )
}