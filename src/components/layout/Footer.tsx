import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, MessagesSquare, Send } from 'lucide-react'
import { Container } from '../ui/Container'
import { GithubIcon } from '../ui/BrandIcon'
import { Logo } from '../ui/Logo'
import { SITE } from '../../lib/site'
import { LINKS } from '../../lib/links'
import { useReleases } from '../../hooks/useReleases'

const PRODUCT = [
  { label: 'Home', to: '/' },
  { label: 'Download', to: '/download' },
  { label: "What's New", to: '/whats-new' },
  { label: 'How to use', to: '/how-to-use' },
]

const LEGAL = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Copyright', to: '/copyright' },
]

const COMMUNITY = [
  { label: 'Telegram', href: LINKS.telegram, Icon: Send },
  { label: 'Reddit', href: LINKS.reddit, Icon: MessageCircle },
  { label: 'GitHub', href: LINKS.github, Icon: GithubIcon },
  { label: 'Discord', href: LINKS.discord, Icon: MessagesSquare },
]

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">{title}</h2>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  )
}

export function Footer() {
  const { latestVersion } = useReleases()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-line bg-surface/40">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Column title="Product">
            {PRODUCT.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Legal">
            {LEGAL.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Community">
            {COMMUNITY.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-ink"
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {label}
                </a>
              </li>
            ))}
          </Column>
          <div>
            <h2 className="mb-4 font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">About</h2>
            <Logo className="mb-3" />
            <p className="text-sm leading-relaxed text-muted">
              A free, open-source Android manga and manhwa reader with offline downloads and built-in AI
              translation.
            </p>
            <p className="mt-3 font-mono text-xs text-muted">
              Version <span className="text-ink">{latestVersion}</span>
            </p>
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE.name}. All rights reserved.
          </p>
          <p className="max-w-2xl text-balance sm:text-right">
            {SITE.name} is a reader. It hosts no content and is not affiliated with any of the providers it
            supports.
          </p>
        </Container>
      </div>
    </footer>
  )
}