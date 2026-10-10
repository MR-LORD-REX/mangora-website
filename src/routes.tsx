import type { RouteRecord } from 'vite-react-ssg'
import { versionPaths } from 'virtual:mangora-release-paths'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'
import Download from './pages/Download'
import WhatsNew from './pages/WhatsNew'
import WhatsNewVersion from './pages/WhatsNewVersion'
import HowToUse from './pages/HowToUse'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Copyright from './pages/Copyright'
import MangaLanding from './pages/MangaLanding'
import NotFound from './pages/NotFound'

export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'download', Component: Download },
      { path: 'whats-new', Component: WhatsNew },
      { path: 'whats-new/:version', Component: WhatsNewVersion, getStaticPaths: () => versionPaths.map((v) => `whats-new/${v}`) },
      { path: 'how-to-use', Component: HowToUse },
      { path: 'privacy', Component: Privacy },
      { path: 'terms', Component: Terms },
      { path: 'copyright', Component: Copyright },
      { path: 'manga/:id', Component: MangaLanding },
      { path: 'oneshot/:id', Component: MangaLanding },
      { path: '*', Component: NotFound },
    ],
  },
]