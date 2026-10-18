import { Seo } from '../components/ui/Seo'
import { Section } from '../components/ui/Section'
import { Markdown } from '../components/ui/Markdown'
import content from '../content/legal/privacy.md?raw'

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy - Mangora"
        description="See what Mangora stores on your device and what data may be sent to extension services, Google translation services, Gemini, OCR endpoints, GitHub and website hosting."
        path="/privacy"
      />
      <Section className="pt-14">
        <div className="mx-auto max-w-3xl">
          <Markdown content={content} />
        </div>
      </Section>
    </>
  )
}