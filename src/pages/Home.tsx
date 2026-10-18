import { Seo } from '../components/ui/Seo'
import { Hero } from '../components/home/Hero'
import { TrustStrip } from '../components/home/TrustStrip'
import { FeatureGrid } from '../components/home/FeatureGrid'
import { ReaderSection } from '../components/home/ReaderSection'
import { TranslationSection } from '../components/home/TranslationSection'
import { OfflineSection } from '../components/home/OfflineSection'
import { HowToSteps } from '../components/home/HowToSteps'
import { Faq } from '../components/home/Faq'
import { InstallCta } from '../components/home/InstallCta'
import { SITE } from '../lib/site'
import { faqPageLd, softwareApplicationLd, webSiteLd } from '../lib/seo'
import { FAQ_ITEMS } from '../content/faq'

export default function Home() {
  return (
    <>
      <Seo
        title="Manga & Manhwa Reader with AI Translation - Mangora"
        description="Mangora is a free Android reader and translator with four reader modes, offline .cbz downloads, on-device OCR and optional online translation."
        path="/"
        image="/assets/og/og-home.png"
        jsonLd={[webSiteLd(), softwareApplicationLd(SITE.version), faqPageLd(FAQ_ITEMS)]}
      />
      <Hero />
      <TrustStrip />
      <FeatureGrid />
      <ReaderSection />
      <TranslationSection />
      <OfflineSection />
      <HowToSteps />
      <Faq />
      <InstallCta />
    </>
  )
}