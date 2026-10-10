import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { NavLink } from 'react-router-dom'
import { MessageCircle, MessagesSquare, Send, X } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { GithubIcon } from '../ui/BrandIcon'
import { NAV_ITEMS } from './nav'
import { LINKS } from '../../lib/links'
import { cn } from '../../lib/format'

const SOCIALS = [
  { label: 'Telegram', href: LINKS.telegram, Icon: Send },
  { label: 'Reddit', href: LINKS.reddit, Icon: MessageCircle },
  { label: 'GitHub', href: LINKS.github, Icon: GithubIcon },
  { label: 'Discord', href: LINKS.discord, Icon: MessagesSquare },
]

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const list = panel ? Array.from(panel.querySelectorAll<HTMLElement>('a, button')) : []
    const first = list[0]
    const last = list[list.length - 1]
    first?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || list.length === 0) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col bg-bg/98 backdrop-blur-lg md:hidden"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-high hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
          <nav aria-label="Primary mobile" className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex min-h-[52px] items-center rounded-md px-4 text-lg font-medium transition-colors',
                        isActive ? 'bg-accent-soft text-accent' : 'text-ink hover:bg-surface-high',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-5">
              <p className="px-4 pb-2 font-mono text-xs tracking-[0.18em] text-muted uppercase">Community</p>
              <ul className="flex flex-col gap-1">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={onClose}
                      className="flex min-h-[48px] items-center gap-3 rounded-md px-4 text-base text-muted transition-colors hover:bg-surface-high hover:text-ink"
                    >
                      <Icon aria-hidden="true" className="size-5" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}