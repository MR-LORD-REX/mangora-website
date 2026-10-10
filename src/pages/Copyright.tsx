import { Seo } from '../components/ui/Seo'
import { Section } from '../components/ui/Section'
import { Markdown } from '../components/ui/Markdown'
import content from '../content/legal/copyright.md?raw'

export default function Copyright() {
  return (
    <>
      <Seo
        title="Copyright and DMCA - Mangora"
        description="Mangora hosts no content. Where to send a takedown request, what belongs to the project, and how provider names and logos are used."
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