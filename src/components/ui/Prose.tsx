import type { ReactNode } from 'react'
import { cn } from '../../lib/format'

/** Typographic wrapper for markdown / legal copy. Hand-rolled, no plugin. */
export function Prose({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'max-w-none text-[15px] leading-relaxed text-muted',
        '[&_h1]:mt-0 [&_h1]:mb-6 [&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:text-ink',
        '[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink',
        '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-ink',
        '[&_p]:my-4 [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-2 hover:[&_a]:decoration-accent',
        '[&_strong]:font-semibold [&_strong]:text-ink',
        '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5',
        '[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5',
        '[&_li]:pl-1 [&_li::marker]:text-accent/70',
        '[&_code]:rounded [&_code]:bg-surface-high [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-ink',
        '[&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:border-line [&_pre]:bg-surface-high [&_pre]:p-4',
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
        '[&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:border-accent/50 [&_blockquote]:pl-4 [&_blockquote]:text-muted',
        '[&_hr]:my-8 [&_hr]:border-line',
        '[&_table]:my-5 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm',
        '[&_th]:border [&_th]:border-line [&_th]:bg-surface-high [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-ink',
        '[&_td]:border [&_td]:border-line [&_td]:px-3 [&_td]:py-2',
        className,
      )}
    >
      {children}
    </div>
  )
}