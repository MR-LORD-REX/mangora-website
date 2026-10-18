import { Seo } from '../components/ui/Seo'
import { Section } from '../components/ui/Section'
import { Markdown } from '../components/ui/Markdown'
import content from '../content/legal/terms.md?raw'

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Use - Mangora"
        description="Terms for Mangora, an Android reader and translator. Learn how third-party extensions and services are handled, your responsibilities, and the limits of the software."
        path="/terms"
      />
      <Section className="pt-14">
        <div className="mx-auto max-w-3xl">
          <Markdown content={content} />
        </div>
      </Section>
    </>
  )
}