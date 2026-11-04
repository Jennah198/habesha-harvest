'use client'

import { motion } from 'framer-motion'
import { Scale, ArrowRight, Leaf, ShieldCheck, Clock3, Sparkles } from 'lucide-react'
import { products } from '@/data/content'
import { Reveal, SectionHeader, scrollToId } from '@/components/ui/clay'
import Image from 'next/image'

const themes = [
  { card: 'bg-white', plate: 'bg-butter', badge: 'bg-terracotta text-white', accent: 'text-terracotta' },
  { card: 'bg-white', plate: 'bg-mint', badge: 'bg-sage text-white', accent: 'text-forest' },
  { card: 'bg-white', plate: 'bg-sky', badge: 'bg-gold text-cocoa', accent: 'text-terracotta-dark' },
]

const features = [
  { icon: Leaf, title: '100% Natural', desc: 'No preservatives or additives', tone: 'bg-mint' },
  { icon: ShieldCheck, title: 'Export Ready', desc: 'Certified for international shipping', tone: 'bg-blush' },
  { icon: Clock3, title: 'Stays Fresh', desc: '30 days at room temperature', tone: 'bg-butter' },
]

export default function ProductShowcase() {
  return (
    <section id="products" className="section-pad relative bg-clay/60">
      <div className="max-container">
        <SectionHeader
          eyebrow="Our products"
          title={
            <>
              Crafted with <span className="text-terracotta">tradition</span>
            </>
          }
          subtitle="Three varieties. One tradition. Shipped anywhere in the world with care and precision."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {products.map((p, i) => {
            const t = themes[i % themes.length]
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`clay clay-hover group relative flex flex-col overflow-hidden ${t.card}`}
              >
                <div className={`clay-inset relative m-3 h-56 overflow-hidden rounded-[1.6rem] ${t.plate}`}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 360px, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] shadow-[inset_6px_6px_16px_rgb(0_0_0/0.18),inset_-6px_-6px_16px_rgb(255_255_255/0.2)]" />
                  <span className={`clay-btn absolute left-4 top-4 inline-flex items-center gap-1 px-3 py-1 text-xs font-bold ${t.badge}`}>
                    <Sparkles size={12} /> {p.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 pt-3">
                  <h3 className="font-display text-2xl font-semibold text-cocoa">{p.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-cocoa-soft">{p.description}</p>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="clay-inset inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-xs font-bold text-cocoa">
                      <Scale size={14} className={t.accent} />
                      {p.weightInfo}
                    </span>
                    <button
                      onClick={() => scrollToId('#contact')}
                      className={`inline-flex cursor-pointer items-center gap-1 text-sm font-bold ${t.accent} transition-all hover:gap-2`}
                    >
                      Get Quote <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, desc, tone }, i) => (
            <Reveal key={title} delay={i * 0.1} className="clay-sm flex items-center gap-4 bg-white p-5">
              <span className={`clay-sm flex h-14 w-14 shrink-0 items-center justify-center ${tone}`}>
                <Icon size={22} className="text-cocoa" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-cocoa">{title}</p>
                <p className="text-sm text-cocoa-soft">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
