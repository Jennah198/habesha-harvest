'use client'

import { motion } from 'framer-motion'
import {
  ClipboardList,
  FileText,
  CheckCircle,
  Truck,
  ArrowRight,
} from 'lucide-react'
import { orderSteps } from '@/data/content'

// ─── Map icon name strings to actual Lucide components ─────────────
const iconMap: Record<string, React.ElementType> = {
  ClipboardList,
  FileText,
  CheckCircle,
  Truck,
}

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

export default function HowToOrder() {
  return (
    <section
      id="how-to-order"
      className="bg-linen py-20 px-8 sm:px-12 lg:px-16
                 relative overflow-hidden"
    >
      {/* ── Decorative background circle ─────────────────────── */}
      <div
        className="absolute -right-32 top-1/2 -translate-y-1/2
                      w-[500px] h-[500px] rounded-full
                      bg-terracotta/5 blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Section header ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* Small label */}
          <span
            className="inline-block text-xs font-bold uppercase
                           tracking-widest text-terracotta font-body mb-3"
          >
            The Process
          </span>

          {/* Main heading */}
          <h2
            className="font-display font-bold text-warmBrown
                         text-3xl md:text-5xl"
          >
            Simple. Transparent. Reliable.
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
            From your first inquiry to delivery at your door — here is exactly
            what happens at every step.
          </p>
        </motion.div>

        {/* ── Steps ────────────────────────────────────────────── */}
        <div className="relative">
          {/*
            Connecting line — desktop only
            Runs horizontally across the center of the number badges
            Hidden on mobile (steps stack vertically there)
          */}
          <div
            className="hidden lg:block absolute top-[28px]
                          left-[8%] right-[8%] h-0.5
                          bg-terracotta/20 z-0"
          />

          {/* Steps grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2
                       lg:grid-cols-4 gap-10 lg:gap-6"
          >
            {orderSteps.map((step, index) => {
              const Icon = iconMap[step.iconName]
              const isLast = index === orderSteps.length - 1

              return (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center
                             relative z-10"
                >
                  {/* ── Number badge ──────────────────────────── */}
                  <div className="relative mb-6">
                    {/* Outer glow ring */}
                    <div
                      className="absolute inset-0 rounded-full
                                    bg-terracotta/20 scale-150
                                    blur-md"
                    />

                    {/* Main badge circle */}
                    <div
                      className="relative w-14 h-14 rounded-full
                                    bg-terracotta text-white
                                    font-display font-bold text-lg
                                    flex items-center justify-center
                                    shadow-lg shadow-terracotta/40
                                    border-4 border-linen
                                    z-10"
                    >
                      {step.number}
                    </div>

                    {/* Arrow between steps — desktop only */}
                    {!isLast && (
                      <div
                        className="hidden lg:flex absolute
                                      -right-[calc(50%+24px)]
                                      top-1/2 -translate-y-1/2
                                      items-center justify-center
                                      w-6 h-6 z-20"
                      >
                        <ArrowRight size={14} className="text-terracotta/40" />
                      </div>
                    )}
                  </div>

                  {/* ── Icon ─────────────────────────────────── */}
                  <div
                    className="w-14 h-14 rounded-2xl
                                  bg-white border border-gray-100
                                  shadow-sm flex items-center
                                  justify-center mb-5
                                  group-hover:bg-terracotta
                                  transition-colors duration-300"
                  >
                    {Icon && <Icon size={24} className="text-forest" />}
                  </div>

                  {/* ── Step title ───────────────────────────── */}
                  <h3
                    className="font-display font-bold
                                 text-warmBrown text-lg
                                 leading-tight mb-3"
                  >
                    {step.title}
                  </h3>

                  {/* ── Step description ─────────────────────── */}
                  <p
                    className="text-warmBrown/55 text-sm
                                font-body leading-relaxed
                                max-w-[220px]"
                  >
                    {step.description}
                  </p>

                  {/* ── Step connector — mobile only ─────────── */}
                  {/*
                    On mobile the steps stack vertically so we
                    show a small vertical line between them
                    instead of the horizontal desktop line
                  */}
                  {!isLast && (
                    <div
                      className="lg:hidden mt-8 w-px h-8
                                    bg-terracotta/30 mx-auto"
                    />
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* ── Bottom CTA card ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 bg-espresso rounded-3xl
                     px-8 py-10 md:py-12
                     flex flex-col md:flex-row items-center
                     justify-between gap-8
                     relative overflow-hidden"
        >
          {/* Decorative circle inside card */}
          <div
            className="absolute -right-16 -top-16 w-64 h-64
                          rounded-full bg-terracotta/10
                          blur-2xl pointer-events-none"
          />
          <div
            className="absolute -left-16 -bottom-16 w-64 h-64
                          rounded-full bg-gold/5
                          blur-2xl pointer-events-none"
          />

          {/* Left text */}
          <div className="text-center md:text-left relative z-10">
            <p
              className="text-white/50 text-xs font-body
                          uppercase tracking-widest mb-2"
            >
              Ready to get started?
            </p>
            <h3
              className="font-display font-bold text-white
                           text-2xl md:text-3xl"
            >
              Place your first order today
            </h3>
            <p className="text-white/40 text-sm font-body mt-2">
              Minimum 10kg · Response within 24 hours · Ships to 15+ countries
            </p>
          </div>

          {/* Right buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3
                          flex-shrink-0 relative z-10"
          >
            {/* Primary CTA */}
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-terracotta hover:bg-terracotta-dark
                         text-white font-bold text-sm
                         px-8 py-3.5 rounded-full
                         transition-all duration-300
                         hover:shadow-lg hover:shadow-terracotta/40
                         hover:-translate-y-0.5
                         active:translate-y-0
                         flex items-center justify-center gap-2"
            >
              Get Your Quote
              <ArrowRight size={15} />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => scrollTo('#our-injera')}
              className="border-2 border-white/20 text-white/80
                         hover:border-white/40 hover:text-white
                         font-bold text-sm px-8 py-3.5
                         rounded-full transition-all duration-300
                         flex items-center justify-center gap-2"
            >
              View Products
            </button>
          </div>
        </motion.div>

        {/* ── Trust row ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center
                     justify-center gap-8"
        >
          {[
            { emoji: '🔒', text: 'Secure Payments' },
            { emoji: '📦', text: 'Tracked Shipping' },
            { emoji: '↩️', text: 'Quality Guaranteed' },
            { emoji: '💬', text: '24hr Support' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span className="text-lg">{item.emoji}</span>
              <span
                className="text-warmBrown/50 text-xs
                               font-body font-bold uppercase
                               tracking-wide"
              >
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
