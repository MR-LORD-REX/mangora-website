import { Seo } from '../components/ui/Seo'
import { Section } from '../components/ui/Section'
import { Markdown } from '../components/ui/Markdown'
import content from '../content/legal/privacy.md?raw'

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy - Mangora"
        description="Mangora is private by default: no account, no telemetry, no analytics. See exactly what the app stores locally and when data can leave your device."
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