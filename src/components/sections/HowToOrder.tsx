'use client'

import { motion } from 'framer-motion'
import { ClipboardList, FileText, CheckCircle, Truck, ArrowRight } from 'lucide-react'
import { orderSteps } from '@/data/content'
import { ClayButton, Reveal, SectionHeader, scrollToId } from '@/components/ui/clay'

const iconMap: Record<string, React.ElementType> = { ClipboardList, FileText, CheckCircle, Truck }
const tones = ['bg-blush', 'bg-butter', 'bg-mint', 'bg-sky']

const trust = [
  { emoji: '🔒', text: 'Secure Payments' },
  { emoji: '📦', text: 'Tracked Shipping' },
  { emoji: '✅', text: 'Quality Guaranteed' },
  { emoji: '💬', text: '24hr Support' },
]

export default function HowToOrder() {
  return (
    <section id="how-to-order" className="section-pad">
      <div className="max-container">
        <SectionHeader
          eyebrow="The process"
          title={
            <>
              Simple. Transparent. <span className="text-terracotta">Reliable.</span>
            </>
          }
          subtitle="From your first inquiry to delivery at your door — here is exactly what happens at every step."
        />

        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting track (desktop) */}
          <div aria-hidden className="clay-inset absolute left-[12%] right-[12%] top-12 hidden h-3 rounded-full bg-clay lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="h-full origin-left rounded-full bg-gradient-to-r from-terracotta-light via-gold to-sage"
            />
          </div>

          {orderSteps.map((step, i) => {
            const Icon = iconMap[step.iconName] ?? ClipboardList
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className={`clay relative z-10 flex h-24 w-24 items-center justify-center rounded-full ${tones[i]}`}>
                  <Icon size={34} className="text-cocoa" />
                  <span className="clay-btn absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center bg-terracotta text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>
                <div className="clay clay-hover mt-6 flex-1 bg-white p-6">
                  <h3 className="font-display text-xl font-semibold text-cocoa">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cocoa-soft">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA banner */}
        <Reveal className="clay relative mt-16 overflow-hidden bg-butter p-8 [--clay-drop:rgb(217_162_30/0.4)] sm:p-12">
          <div aria-hidden className="animate-wobble absolute -right-10 -top-10 h-48 w-48 bg-gold/50" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-terracotta-dark">Ready to get started?</p>
              <p className="mt-1 font-display text-3xl font-semibold text-cocoa md:text-4xl">
                Place your first order today
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ClayButton size="lg" onClick={() => scrollToId('#contact')}>
                Get Your Quote <ArrowRight size={18} />
              </ClayButton>
              <ClayButton size="lg" variant="soft" onClick={() => scrollToId('#our-injera')}>
                View Products
              </ClayButton>
            </div>
          </div>

          <div className="relative mt-8 flex flex-wrap gap-3">
            {trust.map((t) => (
              <span key={t.text} className="clay-sm inline-flex items-center gap-2 bg-white/80 px-4 py-2 text-sm font-semibold text-cocoa">
                <span>{t.emoji}</span> {t.text}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
