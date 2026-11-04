'use client'

import { motion } from 'framer-motion'
import {
  ShoppingBag,
  Play,
  HelpCircle,
  ArrowRight,
  MapPin,
  Leaf,
  Truck,
  Star,
} from 'lucide-react'
import Image from 'next/image'
import { ClayButton, scrollToId, Blob } from '@/components/ui/clay'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const quickActions = [
  { label: 'Place Order', hint: 'Get a quote in 24h', href: '#contact', icon: ShoppingBag, tone: 'bg-blush' },
  { label: 'Watch it being made', hint: 'From teff to table', href: '#process', icon: Play, tone: 'bg-mint' },
  { label: "What's Injera?", hint: 'Meet our three breads', href: '#our-injera', icon: HelpCircle, tone: 'bg-sky' },
]

const highlights = ['100% teff grain', '3-day natural ferment', 'Vacuum-sealed export']

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:pt-36">
      <Blob className="-left-24 top-24 h-72 w-72 bg-blush/70" />
      <Blob className="-right-20 bottom-10 h-80 w-80 bg-mint/70 [animation-delay:-3s]" />

      <div className="max-container relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        {/* ── Left: copy ─────────────────────────────────────── */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-6">
          <motion.span
            variants={fadeUp}
            className="clay-sm inline-flex w-fit items-center gap-2 bg-white px-4 py-2 text-sm font-bold text-cocoa"
          >
            <span className="text-base">🌍</span> Exporting to 15+ countries
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl font-semibold leading-[1.05] text-cocoa sm:text-6xl lg:text-7xl"
          >
            Fast delivery &amp;{' '}
            <span className="relative inline-block text-terracotta">
              easy pickup
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                className="absolute -bottom-2 left-0 h-3 w-full text-gold"
                preserveAspectRatio="none"
              >
                <path d="M2 9 Q 50 2 100 7 T 198 5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>{' '}
            of authentic injera.
          </motion.h1>

          <motion.p variants={fadeUp} className="max-w-lg text-lg leading-relaxed text-cocoa-soft">
            Hand-crafted in Addis Ababa from 100% Ethiopian teff, traditionally fermented and
            vacuum-sealed so it tastes like home — wherever your restaurant or store is.
          </motion.p>

          <motion.ul variants={fadeUp} className="flex flex-wrap gap-2.5">
            {highlights.map((h) => (
              <li
                key={h}
                className="clay-inset flex items-center gap-1.5 rounded-full bg-clay/50 px-3.5 py-1.5 text-sm font-semibold text-cocoa-soft"
              >
                <Leaf size={14} className="text-forest" />
                {h}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <ClayButton size="lg" onClick={() => scrollToId('#how-to-order')}>
              How to order
              <ArrowRight size={18} />
            </ClayButton>
            <ClayButton size="lg" variant="soft" onClick={() => scrollToId('#contact')}>
              <MapPin size={18} className="text-terracotta" />
              See store location
            </ClayButton>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {['ST', 'MA', 'TB', '+'].map((i, idx) => (
                <span
                  key={i}
                  className={`clay-sm flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream text-xs font-bold text-cocoa ${['bg-blush', 'bg-butter', 'bg-mint', 'bg-sky'][idx]}`}
                >
                  {i}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-0.5 text-gold-dark">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <p className="font-semibold text-cocoa-soft">
                Trusted by <span className="text-cocoa">500+ restaurant partners</span>
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: clay platter + quick actions ───────────── */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="clay relative mx-auto aspect-square w-[88%] rounded-full bg-butter p-6 [--clay-drop:rgb(217_162_30/0.45)] sm:p-8"
          >
            <div className="clay-inset relative h-full w-full overflow-hidden rounded-full bg-clay">
              <Image
                src="/images/injera-rolls-plate.png"
                alt="Freshly rolled teff injera on a white plate"
                fill
                preload
                sizes="(min-width: 1024px) 460px, 85vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_8px_8px_20px_rgb(0_0_0/0.18),inset_-8px_-8px_20px_rgb(255_255_255/0.25)]" />
            </div>
          </motion.div>

          {/* Floating badge — live */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="clay-sm animate-float absolute left-0 top-6 flex items-center gap-3 bg-white px-4 py-3"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-sage" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-cocoa">Kitchen open</p>
              <p className="text-xs text-cocoa-soft">Orders shipped daily</p>
            </div>
          </motion.div>

          {/* Floating badge — shipping */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="clay-sm animate-float-slow absolute right-0 top-1/3 flex items-center gap-3 bg-mint px-4 py-3"
          >
            <span className="clay-sm flex h-10 w-10 items-center justify-center bg-white">
              <Truck size={18} className="text-forest" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-cocoa">5-day dispatch</p>
              <p className="text-xs text-cocoa-soft">Tracked worldwide</p>
            </div>
          </motion.div>

          {/* Quick actions card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="clay relative -mt-16 ml-auto w-full max-w-sm bg-white/95 p-5 backdrop-blur sm:-mt-24"
          >
            <p className="mb-3 px-1 text-xs font-bold uppercase tracking-[0.18em] text-cocoa-soft">
              Quick actions
            </p>
            <div className="flex flex-col gap-2.5">
              {quickActions.map(({ label, hint, href, icon: Icon, tone }) => (
                <button
                  key={label}
                  onClick={() => scrollToId(href)}
                  className="group flex cursor-pointer items-center gap-3 rounded-2xl p-2 text-left transition-colors hover:bg-cream"
                >
                  <span className={`clay-sm flex h-11 w-11 shrink-0 items-center justify-center ${tone}`}>
                    <Icon size={18} className="text-cocoa" />
                  </span>
                  <span className="flex-1 leading-tight">
                    <span className="block text-sm font-bold text-cocoa">{label}</span>
                    <span className="text-xs text-cocoa-soft">{hint}</span>
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-cocoa-soft transition-transform group-hover:translate-x-1 group-hover:text-terracotta"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
