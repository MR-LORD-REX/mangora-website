import { Section, SectionHeader } from '../ui/Section'
import { Accordion } from '../ui/Accordion'
import { FAQ_ITEMS } from '../../content/faq'

export function Faq() {
  return (
    <Section id="faq" className="border-t border-line bg-surface/20">
      <SectionHeader
        align="center"
        eyebrow="FAQ"
        title="Questions, answered"
        lead="The things people ask before installing Mangora."
      />
      <div className="mx-auto mt-10 max-w-3xl">
        <Accordion
          items={FAQ_ITEMS.map((f) => ({ question: f.q, answer: <p>{f.a}</p> }))}
          defaultOpen={0}
        />
      </div>
    </Section>
  )
}