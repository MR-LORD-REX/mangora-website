import { Seo } from '../components/ui/Seo'
import { Section } from '../components/ui/Section'
import { Markdown } from '../components/ui/Markdown'
import content from '../content/legal/copyright.md?raw'

export default function Copyright() {
  return (
    <>
      <Seo
        title="Copyright and DMCA - Mangora"
        description="Mangora is a reader and translator, not a content host. Learn how to contact the operator of third-party content and how to report material controlled by the project."
        path="/copyright"
      />
      <Section className="pt-14">
        <div className="mx-auto max-w-3xl">
          <Markdown content={content} />
        </div>
      </Section>
    </>
  )
}