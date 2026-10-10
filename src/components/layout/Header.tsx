import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { GithubIcon } from '../ui/BrandIcon'
import { Logo } from '../ui/Logo'
import { NAV_ITEMS } from './nav'
import { MobileNav } from './MobileNav'
import { LINKS } from '../../lib/links'
import { cn } from '../../lib/format'

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    // NOTE: the blur lives on an inner wrapper, not the <header>. A
    // backdrop-filter on the header would make it the containing block for
    // position:fixed, which traps the full-screen mobile nav inside the bar.
    <header className="sticky top-0 z-50 border-b border-line">
      <div className="bg-bg/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4">
        <NavLink to="/" aria-label="Mangora home" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <Logo />
        </NavLink>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium transition-colors',
                      isActive ? 'text-ink' : 'text-muted hover:text-ink',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-accent transition-opacity duration-150',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Mangora on GitHub"
            className="inline-flex size-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-high hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <GithubIcon className="size-5" />
          </a>
          <Button href={LINKS.telegram} className="hidden sm:inline-flex">
            Join Telegram
          </Button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex size-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-high hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
          >
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
        </Container>
      </div>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  )
}