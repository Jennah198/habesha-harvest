'use client'

import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { categories } from '@/data/content'

// ─── Animation variants ────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

// ─── Smooth scroll helper ──────────────────────────────────────────
const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Categories() {
  return (
    <section id="categories" className="bg-white py-20 px-8 sm:px-12 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* ── Section heading ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* Small label above heading */}
          <span
            className="inline-block text-xs font-bold uppercase
                           tracking-widest text-terracotta font-body mb-3"
          >
            What We Offer
          </span>

          {/* Main heading */}
          <h2
            className="font-display font-bold text-warmBrown
                         text-3xl md:text-4xl"
          >
            Our best delivered categories
          </h2>

          {/* Terracotta accent underline */}
          <div
            className="w-16 h-1 bg-terracotta rounded-full
                          mx-auto mt-4"
          />

          {/* Subtitle */}
          <p
            className="text-warmBrown/50 text-sm font-body
                        mt-4 max-w-md mx-auto leading-relaxed"
          >
            Three varieties of authentic Ethiopian injera, vacuum-sealed and
            shipped fresh to your door.
          </p>
        </motion.div>

        {/* ── Three cards grid ─────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={fadeUp}
              className="group bg-white rounded-3xl
                         border border-gray-100
                         shadow-sm hover:shadow-xl
                         hover:shadow-terracotta/10
                         transition-all duration-500
                         hover:-translate-y-2
                         flex flex-col items-center
                         text-center p-7"
            >
              {/* ── Circular image ──────────────────────────── */}
              <div className="relative mb-5">
                {/* Outer decorative ring */}
                <div
                  className="w-36 h-36 rounded-full
                                bg-linen-dark p-1.5
                                group-hover:scale-105
                                transition-transform duration-500"
                >
                  {/* Inner image circle */}
                  <div
                    className="w-full h-full rounded-full
                                  overflow-hidden border-4
                                  border-white shadow-md"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover
                                 group-hover:scale-110
                                 transition-transform duration-700"
                      onError={(e) => {
                        // gradient fallback per category color
                        e.currentTarget.style.display = 'none'
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.style.background =
                            cat.id === 'classic-teff'
                              ? 'linear-gradient(135deg,#C8531A,#F5C842)'
                              : cat.id === 'mixed-grain'
                                ? 'linear-gradient(135deg,#F97316,#FBBF24)'
                                : 'linear-gradient(135deg,#2D5016,#F5C842)'
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Small category number badge */}
                <div
                  className="absolute -bottom-1 -right-1
                                w-7 h-7 rounded-full bg-terracotta
                                border-2 border-white
                                flex items-center justify-center
                                shadow-md"
                >
                  <span className="text-white text-[10px] font-black">
                    {categories.indexOf(cat) + 1}
                  </span>
                </div>
              </div>

              {/* ── Product name ─────────────────────────────── */}
              <h3
                className="font-display font-bold text-warmBrown
                             text-lg leading-tight mt-1"
              >
                {cat.name}
              </h3>

              {/* ── Subtitle ─────────────────────────────────── */}
              <p className="text-gray-400 text-xs font-body mt-1.5">
                {cat.subtitle}
              </p>

              {/* ── Pack info ────────────────────────────────── */}
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className="w-1 h-1 rounded-full bg-terracotta/40
                                 inline-block"
                />
                <p className="text-gray-400 text-xs font-body">{cat.info}</p>
              </div>

              {/* ── Thin divider ─────────────────────────────── */}
              <div className="w-full h-px bg-gray-100 my-5" />

              {/* ── Order Now button ─────────────────────────── */}
              <button
                onClick={() => scrollTo('#contact')}
                className={`
                  w-full flex items-center justify-center gap-2
                  text-white font-bold text-sm
                  py-3 rounded-full
                  transition-all duration-300
                  hover:shadow-lg hover:-translate-y-0.5
                  active:translate-y-0
                  ${cat.buttonColor} ${cat.buttonHover}
                `}
              >
                <ShoppingCart size={14} />
                Order Now
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom CTA strip ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-linen rounded-3xl px-8 py-6
                     flex flex-col sm:flex-row items-center
                     justify-between gap-4 border border-linen-dark"
        >
          {/* Left text */}
          <div>
            <p className="font-display font-bold text-warmBrown text-lg">
              Need a custom quantity?
            </p>
            <p className="text-warmBrown/50 text-sm font-body mt-0.5">
              We handle bulk orders from 10kg to several tons.
            </p>
          </div>

          {/* Right button */}
          <button
            onClick={() => scrollTo('#contact')}
            className="flex-shrink-0 bg-terracotta hover:bg-terracotta-dark
                       text-white font-bold text-sm px-7 py-3
                       rounded-full transition-all duration-300
                       hover:shadow-lg hover:shadow-terracotta/30
                       hover:-translate-y-0.5 active:translate-y-0"
          >
            Get a Custom Quote
          </button>
        </motion.div>
      </div>
    </section>
  )
}
