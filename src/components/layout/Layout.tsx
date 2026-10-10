import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Header } from './Header'
import { Footer } from './Footer'
import { SITE } from '../../lib/site'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <>
      {/* Site-wide head. Per-page <Seo> renders later and overrides title /
          description (react-helmet resolves duplicates to the latter). */}
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d1014" />
        <title>{SITE.title}</title>
        <meta name="description" content={SITE.description} />
      </Head>

      <div className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only rounded-md bg-accent px-4 py-2 text-sm font-medium text-on-accent focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}