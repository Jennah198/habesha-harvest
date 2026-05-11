'use client'

import { motion } from 'framer-motion'
import { Scale, Star, ArrowRight } from 'lucide-react'
import { products } from '@/data/content'
import { Badge } from '@/components/ui/badge'

// ─── Animation variants ────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
}

// ─── Smooth scroll helper ──────────────────────────────────────────
const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// ─── Injera SVG illustration per card ─────────────────────────────
// Each product gets a unique color scheme for its illustration
const cardThemes = [
  {
    bgFrom: '#FEF3E2',
    bgTo: '#FAD9B0',
    ringColor: '#C8531A',
    dotColor: '#F5C842',
  },
  {
    bgFrom: '#F0F7E8',
    bgTo: '#D4EAB8',
    ringColor: '#2D5016',
    dotColor: '#F5C842',
  },
  {
    bgFrom: '#FDE8D8',
    bgTo: '#F9C4A0',
    ringColor: '#F97316',
    dotColor: '#FBBF24',
  },
]

// ─── SVG injera illustration component ────────────────────────────
function InjeraIllustration({
  ringColor,
  dotColor,
}: {
  ringColor: string
  dotColor: string
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base injera circle */}
      <circle cx="100" cy="100" r="85" fill={ringColor} opacity="0.15" />
      <circle cx="100" cy="100" r="75" fill={ringColor} opacity="0.2" />

      {/* Injera texture — the characteristic holes */}
      {/* Outer ring of dots */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 100 + 55 * Math.cos(rad)
        const y = 100 + 55 * Math.sin(rad)
        return (
          <circle key={i} cx={x} cy={y} r="4" fill={dotColor} opacity="0.7" />
        )
      })}

      {/* Middle ring of dots */}
      {[22, 67, 112, 157, 202, 247, 292, 337].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 100 + 35 * Math.cos(rad)
        const y = 100 + 35 * Math.sin(rad)
        return (
          <circle key={i} cx={x} cy={y} r="3" fill={dotColor} opacity="0.5" />
        )
      })}

      {/* Inner dots */}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 100 + 16 * Math.cos(rad)
        const y = 100 + 16 * Math.sin(rad)
        return (
          <circle key={i} cx={x} cy={y} r="2.5" fill={dotColor} opacity="0.4" />
        )
      })}

      {/* Center dot */}
      <circle cx="100" cy="100" r="5" fill={ringColor} opacity="0.4" />

      {/* Decorative concentric rings */}
      <circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke={ringColor}
        strokeWidth="0.8"
        opacity="0.2"
        strokeDasharray="4 4"
      />
      <circle
        cx="100"
        cy="100"
        r="40"
        fill="none"
        stroke={ringColor}
        strokeWidth="0.8"
        opacity="0.15"
        strokeDasharray="3 5"
      />
    </svg>
  )
}

export default function ProductShowcase() {
  return (
    <section id="our-injera" className="bg-linen py-20 px-8 sm:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* ── Section header ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Small label */}
          <span
            className="inline-block text-xs font-bold uppercase
                           tracking-widest text-terracotta font-body mb-3"
          >
            Our Products
          </span>

          {/* Main heading */}
          <h2
            className="font-display font-bold text-warmBrown
                         text-3xl md:text-5xl"
          >
            Crafted With Tradition
          </h2>

          {/* Terracotta accent underline */}
          <div
            className="w-16 h-1 bg-terracotta rounded-full
                          mx-auto mt-4"
          />

          {/* Subtitle */}
          <p
            className="text-warmBrown/50 text-sm font-body
                        mt-4 max-w-lg mx-auto leading-relaxed"
          >
            Three varieties. One tradition. Shipped anywhere in the world with
            care and precision.
          </p>
        </motion.div>

        {/* ── Product cards grid ───────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-7"
        >
          {products.map((product, index) => {
            const theme = cardThemes[index]
            return (
              <motion.div
                key={product.id}
                variants={fadeUp}
                className="group relative bg-white rounded-3xl
                           overflow-hidden shadow-sm
                           hover:shadow-2xl hover:shadow-terracotta/15
                           transition-all duration-500
                           hover:-translate-y-3
                           flex flex-col"
              >
                {/* ── Image / illustration area ─────────────── */}
                <div
                  className="relative h-56 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg,
                      ${theme.bgFrom}, ${theme.bgTo})`,
                  }}
                >
                  {/* SVG injera illustration */}
                  <div
                    className="absolute inset-0 flex items-center
                                  justify-center p-8
                                  group-hover:scale-110
                                  transition-transform duration-700"
                  >
                    <InjeraIllustration
                      ringColor={theme.ringColor}
                      dotColor={theme.dotColor}
                    />
                  </div>

                  {/* Shimmer overlay on hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr
                                  from-transparent via-white/10 to-transparent
                                  opacity-0 group-hover:opacity-100
                                  transition-opacity duration-500"
                  />

                  {/* Badge — top right */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      className="bg-terracotta text-white text-[10px]
                                 font-bold px-3 py-1 rounded-full
                                 border-0 shadow-md"
                    >
                      {product.badge}
                    </Badge>
                  </div>

                  {/* Star rating — top left */}
                  <div
                    className="absolute top-4 left-4
                                  flex items-center gap-1
                                  bg-white/80 backdrop-blur-sm
                                  rounded-full px-2.5 py-1"
                  >
                    <Star size={10} className="text-gold fill-gold" />
                    <span
                      className="text-[10px] font-bold
                                     text-warmBrown"
                    >
                      5.0
                    </span>
                  </div>
                </div>

                {/* ── Card content ──────────────────────────── */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Product name */}
                  <h3
                    className="font-display font-bold text-warmBrown
                                 text-xl leading-tight"
                  >
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-warmBrown/60 text-sm font-body
                                leading-relaxed mt-2.5 flex-1"
                  >
                    {product.description}
                  </p>

                  {/* Weight info */}
                  <div
                    className="flex items-center gap-2 mt-4
                                  text-terracotta"
                  >
                    <Scale size={13} className="flex-shrink-0" />
                    <span className="text-sm font-bold font-body">
                      {product.weightInfo}
                    </span>
                  </div>

                  {/* Thin divider */}
                  <div className="w-full h-px bg-gray-100 my-5" />

                  {/* Get Quote button */}
                  <button
                    onClick={() => scrollTo('#contact')}
                    className="w-full flex items-center justify-center
                               gap-2 border-2 border-terracotta
                               text-terracotta font-bold text-sm
                               py-3 rounded-full
                               hover:bg-terracotta hover:text-white
                               transition-all duration-300
                               hover:shadow-lg
                               hover:shadow-terracotta/30
                               hover:-translate-y-0.5
                               active:translate-y-0 group/btn"
                  >
                    Get Quote
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1
                                 transition-transform duration-300"
                    />
                  </button>
                </div>

                {/* ── Bottom terracotta accent bar ──────────── */}
                {/*
                  Hidden by default, slides up on hover.
                  Creates a premium card feel.
                */}
                <div
                  className="absolute bottom-0 left-0 right-0
                                h-1 bg-gradient-to-r
                                from-terracotta via-gold to-terracotta
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-500"
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* ── Bottom info strip ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              icon: '🌿',
              title: '100% Natural',
              desc: 'No preservatives or additives',
            },
            {
              icon: '✈️',
              title: 'Export Ready',
              desc: 'Certified for international shipping',
            },
            {
              icon: '❄️',
              title: 'Stays Fresh',
              desc: '30 days at room temperature',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 bg-white
                         rounded-2xl px-5 py-4
                         border border-gray-100 shadow-sm"
            >
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <p
                  className="font-bold text-warmBrown text-sm
                               font-body"
                >
                  {item.title}
                </p>
                <p
                  className="text-warmBrown/50 text-xs
                               font-body mt-0.5"
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
