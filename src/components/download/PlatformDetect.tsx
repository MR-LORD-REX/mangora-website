import { Monitor, Smartphone, Tablet } from 'lucide-react'
import type { Platform } from '../../lib/platform'

const COPY: Record<Platform, { title: string; body: string }> = {
  android: {
    title: 'Looks like you are on Android',
    body: 'Grab the ARM64 build below. Android 7.0 or newer, ARM64 (arm64-v8a) devices only - 32-bit ARM is not supported.',
  },
  ios: {
    title: 'Mangora is Android-only',
    body: 'There is no iOS build. On iPhone or iPad, join Telegram or the subreddit to follow releases and help shape one.',
  },
  desktop: {
    title: 'Mangora runs on Android',
    body: 'This device cannot install the APK. Copy the link to your Android device, or join Telegram to get it there.',
  },
}

const ICONS: Record<Platform, typeof Smartphone> = {
  android: Smartphone,
  ios: Tablet,
  desktop: Monitor,
}

export function PlatformDetect({ platform }: { platform: Platform | null }) {
  if (!platform) return null
  const { title, body } = COPY[platform]
  const Icon = ICONS[platform]
  return (
    <div className="flex items-start gap-3 rounded-lg border border-line bg-surface p-4">
      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.75} />
      <div>
        <p className="text-sm font-medium text-ink">{title}</p>
        <p className="mt-1 text-sm text-muted">{body}</p>
      </div>
    </div>
  )
}