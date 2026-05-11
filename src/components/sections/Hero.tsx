'use client'

import { motion } from 'framer-motion'
import { MapPin, Check, ShoppingBag, Play, HelpCircle } from 'lucide-react'

// ─── Animation variants ────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

// ─── Quick action buttons data ─────────────────────────────────────
const quickActions = [
  {
    label: 'Place Order',
    href: '#contact',
    icon: ShoppingBag,
  },
  {
    label: 'Watch it being made',
    href: '#process',
    icon: Play,
  },
  {
    label: "What's Injera",
    href: '#our-injera',
    icon: HelpCircle,
  },
]

// ─── Smooth scroll helper ──────────────────────────────────────────
const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-linen pt-14 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full py-12">
        {/*
          ── THREE COLUMN GRID ─────────────────────────────────────
          On mobile: single column stacked
          On large screens: left content | center circle | right actions
        */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto_260px]
                        gap-10 lg:gap-8 items-center"
        >
          {/* ════════════════════════════════════════════════════
              COLUMN 1 — Left: Headline + subtitle + CTA buttons
              ════════════════════════════════════════════════════ */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5 order-1"
          >
            {/* Small top badge */}
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-2
                               bg-terracotta/10 text-terracotta
                               border border-terracotta/20
                               rounded-full px-4 py-1.5 text-xs
                               font-bold font-body tracking-wide"
              >
                🌍 Exporting to 15+ Countries
              </span>
            </motion.div>

            {/* Main headline — 3 lines */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-warmBrown
                         leading-[1.08]"
            >
              <span className="block text-5xl md:text-6xl lg:text-[64px]">
                Fast
              </span>
              <span className="block text-5xl md:text-6xl lg:text-[64px]">
                Delivery &amp;
              </span>
              <span
                className="block text-5xl md:text-6xl lg:text-[64px]
                               text-terracotta"
              >
                easy pickup
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-warmBrown/60 text-sm leading-relaxed
                         max-w-[300px] font-body"
            >
              Hand-crafted from 100% Ethiopian teff grain. Traditionally
              fermented. Vacuum-sealed for freshness. Delivered worldwide.
            </motion.p>

            {/* CTA buttons — stacked vertically */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3 w-fit">
              {/* Button 1 — filled green */}
              <button
                onClick={() => scrollTo('#contact')}
                className="flex items-center gap-2 bg-cta hover:bg-green-600
                           text-white font-bold text-sm px-7 py-3
                           rounded-full transition-all duration-300
                           hover:shadow-lg hover:shadow-green-500/30
                           hover:-translate-y-0.5 active:translate-y-0"
              >
                <MapPin size={15} />
                See Store Location
              </button>

              {/* Button 2 — outline green */}
              <button
                onClick={() => scrollTo('#how-to-order')}
                className="flex items-center gap-2 border-2 border-cta
                           text-cta hover:bg-cta hover:text-white
                           font-bold text-sm px-7 py-3 rounded-full
                           transition-all duration-300 bg-transparent
                           hover:shadow-lg hover:shadow-green-500/30
                           hover:-translate-y-0.5 active:translate-y-0"
              >
                How to order
              </button>
            </motion.div>

            {/* Trust badges row */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 pt-2"
            >
              {['ISO Certified', 'Halal', '100% Teff'].map((badge) => (
                <span
                  key={badge}
                  className="text-xs text-warmBrown/50 font-body
                             flex items-center gap-1"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full
                                   bg-terracotta inline-block"
                  />
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ════════════════════════════════════════════════════
              COLUMN 2 — Center: Circular injera image
              ════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex items-center justify-center order-first
                       lg:order-2"
          >
            {/* Outer container — sets the circle size */}
            <div
              className="relative w-[300px] h-[300px]
                            md:w-[360px] md:h-[360px]
                            lg:w-[380px] lg:h-[380px]"
            >
              {/* ── Colorful geometric SVG background ────────── */}
              <div
                className="absolute inset-0 rounded-full overflow-hidden
                              shadow-2xl shadow-terracotta/20"
              >
                <svg
                  viewBox="0 0 380 380"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Base fill */}
                  <circle cx="190" cy="190" r="190" fill="#F97316" />
                  {/* Wedge segments — creates the colorful geometric look */}
                  <path
                    d="M190 190 L190 0 A190 190 0 0 1 380 190 Z"
                    fill="#FBBF24"
                  />
                  <path
                    d="M190 190 L380 190 A190 190 0 0 1 190 380 Z"
                    fill="#EC4899"
                  />
                  <path
                    d="M190 190 L190 380 A190 190 0 0 1 0 190 Z"
                    fill="#3B82F6"
                  />
                  <path
                    d="M190 190 L0 190 A190 190 0 0 1 190 0 Z"
                    fill="#10B981"
                  />
                  <path
                    d="M190 190 L285 95 A190 190 0 0 1 380 190 Z"
                    fill="#F59E0B"
                  />
                  <path
                    d="M190 190 L95 285 A190 190 0 0 1 0 190 Z"
                    fill="#8B5CF6"
                  />
                </svg>
              </div>

              {/* ── Injera image — sits on top of SVG ────────── */}
              {/*
                inset-3 = 12px gap from the outer circle edge,
                creating a subtle border effect
              */}
              <div
                className="absolute inset-3 rounded-full overflow-hidden
                              border-4 border-white/40"
              >
                <img
                  src="/images/injera.jpg"
                  alt="Fresh authentic Ethiopian injera"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback gradient if image not found
                    e.currentTarget.style.display = 'none'
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.style.background =
                        'linear-gradient(135deg, #C8531A, #F5C842)'
                    }
                  }}
                />
              </div>

              {/* ── Floating "System Active" badge card ──────── */}
              {/*
                Positioned top-left of the circle,
                slightly outside via negative top offset
              */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -top-3 left-6 z-10
                           bg-white rounded-2xl shadow-xl
                           px-4 py-2.5 border border-gray-100
                           flex items-center gap-2.5"
              >
                {/* Green checkmark circle */}
                <div
                  className="w-7 h-7 rounded-full bg-cta
                                flex items-center justify-center
                                flex-shrink-0"
                >
                  <Check size={13} className="text-white" strokeWidth={3} />
                </div>
                {/* Badge text */}
                <div className="leading-tight">
                  <p className="text-[11px] font-bold text-warmBrown">
                    System Active
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Orders delivered daily
                  </p>
                </div>
              </motion.div>

              {/* ── Floating stat badge — bottom right ───────── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -bottom-3 right-4 z-10
                           bg-espresso rounded-2xl shadow-xl
                           px-4 py-2.5 border border-white/10
                           flex items-center gap-2.5"
              >
                <div
                  className="w-7 h-7 rounded-full bg-gold
                                flex items-center justify-center
                                flex-shrink-0"
                >
                  <span className="text-[11px] font-black text-espresso">
                    15
                  </span>
                </div>
                <div className="leading-tight">
                  <p className="text-[11px] font-bold text-white">Countries</p>
                  <p className="text-[10px] text-white/50">Worldwide export</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════
              COLUMN 3 — Right: Quick Actions panel
              ════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col gap-3 order-3"
          >
            {/* Panel label */}
            <div className="mb-1">
              <p
                className="text-[11px] font-bold uppercase
                            tracking-widest text-warmBrown/40 font-body"
              >
                QUICK ACTIONS
              </p>
              <p className="text-[11px] text-warmBrown/30 font-body mt-0.5">
                Access core features easily
              </p>
            </div>

            {/* Three orange action buttons */}
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                onClick={() => scrollTo(action.href)}
                className="w-full bg-action hover:bg-orange-600
                           text-white font-bold text-sm
                           py-3.5 px-5 rounded-full
                           transition-all duration-300
                           hover:shadow-lg hover:shadow-orange-400/40
                           hover:-translate-y-0.5 active:translate-y-0
                           flex items-center justify-center gap-2"
              >
                <action.icon size={15} />
                {action.label}
              </motion.button>
            ))}

            {/* Small info card below buttons */}
            <div
              className="mt-3 bg-white rounded-2xl border border-linen-dark
                            p-4 shadow-sm"
            >
              <p className="text-[11px] font-bold text-warmBrown font-body">
                📦 Minimum Order
              </p>
              <p className="text-[11px] text-warmBrown/50 font-body mt-0.5">
                10kg for first-time buyers
              </p>
              <div className="mt-2.5 pt-2.5 border-t border-linen-dark">
                <p className="text-[11px] font-bold text-warmBrown font-body">
                  ⚡ Response Time
                </p>
                <p className="text-[11px] text-warmBrown/50 font-body mt-0.5">
                  Within 24 hours guaranteed
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
