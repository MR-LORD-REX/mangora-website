import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../../lib/format'

export function CopyButton({ value, label = 'Copy', className }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable - leave the button as-is */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied' : label}
      className={cn(
        'inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-line bg-surface-high px-2.5 py-1.5',
        'font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-ink',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        className,
      )}
    >
      {copied ? <Check aria-hidden="true" className="size-3.5 text-success" /> : <Copy aria-hidden="true" className="size-3.5" />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  )
}