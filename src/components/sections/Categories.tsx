'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Package, ArrowRight } from 'lucide-react'
import { categories } from '@/data/content'
import { ClayButton, Reveal, SectionHeader, scrollToId, toneBg } from '@/components/ui/clay'

const dropTone = {
  mint: '[--clay-drop:rgb(63_107_42/0.3)]',
  blush: '[--clay-drop:rgb(168_72_31/0.3)]',
  butter: '[--clay-drop:rgb(217_162_30/0.35)]',
  sky: '[--clay-drop:rgb(60_110_150/0.3)]',
  lilac: '[--clay-drop:rgb(110_80_160/0.3)]',
}

const btnVariant = { mint: 'sage', blush: 'primary', butter: 'gold', sky: 'primary', lilac: 'primary' } as const

export default function Categories() {
  return (
    <section id="our-injera" className="section-pad relative">
      <div className="max-container">
        <SectionHeader
          eyebrow="What we offer"
          title={
            <>
              Our best delivered <span className="text-terracotta">categories</span>
            </>
          }
          subtitle="Three varieties of authentic Ethiopian injera, vacuum-sealed and shipped fresh to your door."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.article
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`clay clay-hover group flex flex-col items-center p-7 text-center ${toneBg[cat.tone]} ${dropTone[cat.tone]}`}
            >
              <div className="clay relative mb-6 h-44 w-44 rounded-full bg-white/70 p-3">
                <div className="clay-inset relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="176px"
                    className="object-cover transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110"
                  />
                </div>
                <span className="clay-sm absolute -right-1 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white font-display text-sm font-semibold text-terracotta">
                  0{i + 1}
                </span>
              </div>

              <h3 className="font-display text-2xl font-semibold text-cocoa">{cat.name}</h3>
              <p className="mt-1 text-sm text-cocoa-soft">{cat.subtitle}</p>

              <span className="clay-inset mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/40 px-4 py-1.5 text-xs font-bold text-cocoa">
                <Package size={14} /> {cat.info}
              </span>

              <ClayButton
                variant={btnVariant[cat.tone]}
                onClick={() => scrollToId('#contact')}
                className="mt-6 w-full"
              >
                <ShoppingCart size={16} />
                Order Now
              </ClayButton>
            </motion.article>
          ))}
        </div>

        <Reveal className="clay mt-12 flex flex-col items-center justify-between gap-5 bg-white p-6 text-center sm:flex-row sm:px-10 sm:text-left">
          <div>
            <p className="font-display text-xl font-semibold text-cocoa">Need a custom quantity?</p>
            <p className="text-sm text-cocoa-soft">
              Restaurants, grocers and distributors — we tailor packs and pallets to your volume.
            </p>
          </div>
          <ClayButton variant="gold" onClick={() => scrollToId('#contact')} className="shrink-0">
            Get a Custom Quote <ArrowRight size={16} />
          </ClayButton>
        </Reveal>
      </div>
    </section>
  )
}
