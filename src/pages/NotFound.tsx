import { Seo } from '../components/ui/Seo'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found - Mangora"
        description="That page does not exist. Head back to the Mangora home page, or download the app."
        path="/404"
      />
      <Section className="py-24 text-center">
        <p className="font-mono text-sm tracking-[0.18em] text-accent uppercase">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">This page does not exist</h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          The link may be broken or the page may have moved. Everything lives from the home page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">Back to home</Button>
          <Button to="/download" variant="secondary">
            Download Mangora
          </Button>
        </div>
      </Section>
    </>
  )
}