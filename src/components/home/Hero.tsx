import { ArrowRight, Download } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { PhoneFrame } from '../ui/PhoneFrame'
import { TranslationSlider } from './TranslationSlider'
import { SITE } from '../../lib/site'

export function Hero() {
  const reduce = useReducedMotion()
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  }
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  }

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-accent/12 blur-[120px]"
      />
      <Container className="relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:gap-10 lg:py-24">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs tracking-wide text-muted"
          >
            Free &middot; Open source &middot; Android
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl lg:text-6xl"
          >
            Read manga and manhwa <span className="text-accent">in your language</span>
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {SITE.tagline}
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/download" size="lg" icon={<Download aria-hidden="true" className="size-5" />}>
              Download APK
            </Button>
            <Button
              to="/whats-new"
              size="lg"
              variant="secondary"
              iconRight={<ArrowRight aria-hidden="true" className="size-4" />}
            >
              What&apos;s new
            </Button>
          </motion.div>
          <motion.p variants={item} className="mt-5 font-mono text-xs text-muted">
            Latest release {SITE.version} &middot; ARM64 &middot; Android 7.0+
          </motion.p>
        </motion.div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <PhoneFrame className="rotate-0 lg:rotate-1">
            <TranslationSlider />
          </PhoneFrame>
          <p className="mt-4 text-center text-xs text-muted">Drag the handle to compare</p>
        </motion.div>
      </Container>
    </section>
  )
}