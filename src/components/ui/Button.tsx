import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/format'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'lg'

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(
    'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap',
    'transition-[transform,background-color,border-color,color,filter] duration-150 ease-out',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    'disabled:cursor-not-allowed disabled:opacity-50',
    size === 'lg' ? 'px-7 py-3 text-base' : 'px-5 py-2.5 text-sm',
    variant === 'primary' && 'bg-accent text-on-accent hover:brightness-110 active:translate-y-px',
    variant === 'secondary' &&
      'border border-line bg-surface-high text-ink hover:border-accent/60 hover:bg-surface-high/70 active:translate-y-px',
    variant === 'ghost' && 'text-muted hover:bg-surface-high/60 hover:text-ink',
    className,
  )
}

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
  icon?: ReactNode
  iconRight?: ReactNode
  /** Internal route -> react-router Link. */
  to?: string
  /** External / file URL -> anchor. */
  href?: string
  /** Adds the download attribute (same-origin file links). */
  download?: string | boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  ariaLabel?: string
  title?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon,
  iconRight,
  to,
  href,
  download,
  onClick,
  type = 'button',
  ariaLabel,
  title,
}: ButtonProps) {
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {iconRight}
    </>
  )
  const cls = buttonClasses(variant, size, className)

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick} aria-label={ariaLabel} title={title}>
        {content}
      </Link>
    )
  }
  if (href) {
    const external = /^https?:\/\//i.test(href)
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        aria-label={ariaLabel}
        title={title}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...(download ? { download: typeof download === 'string' ? download : '' } : {})}
      >
        {content}
      </a>
    )
  }
  return (
    <button type={type} className={cls} onClick={onClick} aria-label={ariaLabel} title={title}>
      {content}
    </button>
  )
}