import { Seo } from '../components/ui/Seo'
import { Section } from '../components/ui/Section'
import { Markdown } from '../components/ui/Markdown'
import content from '../content/legal/terms.md?raw'

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Use - Mangora"
        description="The terms for using Mangora: free and open-source software, a reader that hosts no content, and your responsibility for the providers you choose to reach."
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