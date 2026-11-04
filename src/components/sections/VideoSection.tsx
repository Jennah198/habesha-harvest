'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'
import { stats, processVideos } from '@/data/content'
import { Reveal, SectionHeader } from '@/components/ui/clay'

const steps = ['Teff harvested', 'Stone-milled', '3-day ferment', 'Baked on mitad', 'Vacuum-sealed']

const thumb = (id: string, quality: 'hq' | 'maxres' = 'hq') =>
  `https://i.ytimg.com/vi/${id}/${quality}default.jpg`

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value, 1800)
  return (
    <div ref={ref} className="clay-sm flex flex-col items-center bg-white/95 px-4 py-6 text-center">
      <span className="font-display text-4xl font-semibold text-terracotta md:text-5xl">
        {count}
        {suffix}
      </span>
      <span className="mt-1 text-sm font-semibold text-cocoa-soft">{label}</span>
    </div>
  )
}

function PlayButton({ big = false }: { big?: boolean }) {
  return (
    <span
      className={`clay-btn relative flex items-center justify-center bg-terracotta text-white transition-transform group-hover:scale-110 ${big ? 'h-20 w-20' : 'h-11 w-11'}`}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-terracotta/40" />
      <Play size={big ? 30 : 16} className="relative ml-1 fill-current" />
    </span>
  )
}

export default function VideoSection() {
  const [playing, setPlaying] = useState<string | null>(null)
  const [main, ...secondary] = processVideos

  useEffect(() => {
    if (!playing) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPlaying(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playing])

  const current = processVideos.find((v) => v.id === playing)

  return (
    <section id="process" className="px-3 py-12 sm:px-6">
      <div className="clay section-pad relative mx-auto max-w-7xl overflow-hidden bg-terracotta [--clay-drop:rgb(168_72_31/0.45)]">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-terracotta-light/60 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-gold/30 blur-3xl" />

        <div className="max-container relative">
          <SectionHeader
            invert
            eyebrow="Behind the craft"
            title="From Teff to Table"
            subtitle="Watch how we turn raw Ethiopian teff grain into the world's finest injera, ready for your table."
          />

          {/* Process steps */}
          <Reveal className="mb-12 flex flex-wrap justify-center gap-3">
            {steps.map((s, i) => (
              <span
                key={s}
                className="clay-btn inline-flex items-center gap-2 bg-white/15 px-4 py-2 text-sm font-semibold text-cream [--clay-drop:rgb(0_0_0/0.15)] hover:bg-white/25"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-cocoa">
                  {i + 1}
                </span>
                {s}
              </span>
            ))}
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            {/* Featured */}
            <Reveal>
              <button
                onClick={() => setPlaying(main.id)}
                className={`clay group relative flex h-full min-h-80 w-full cursor-pointer flex-col justify-end overflow-hidden p-6 text-left ${main.tone} [--clay-drop:rgb(0_0_0/0.25)]`}
                aria-label={`Play video: ${main.title}`}
              >
                <Image
                  src={thumb(main.youtubeId)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 700px, 95vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/60 via-transparent to-transparent" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <PlayButton big />
                </span>
                <div className="clay-sm relative w-fit bg-white/90 px-5 py-3 backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-widest text-terracotta">Featured video</p>
                  <p className="font-display text-xl font-semibold text-cocoa">{main.title}</p>
                </div>
              </button>
            </Reveal>

            {/* Secondary */}
            <div className="grid gap-4">
              {secondary.map((v, i) => (
                <Reveal key={v.id} delay={i * 0.1}>
                  <button
                    onClick={() => setPlaying(v.id)}
                    className={`clay-sm clay-hover group flex w-full cursor-pointer items-center gap-4 p-3 text-left ${v.tone} [--clay-drop:rgb(0_0_0/0.2)]`}
                    aria-label={`Play video: ${v.title}`}
                  >
                    <span className="clay-inset relative flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden">
                      <Image src={thumb(v.youtubeId)} alt="" fill sizes="112px" className="object-cover" />
                      <span className="relative"><PlayButton /></span>
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-lg font-semibold text-cocoa">{v.title}</span>
                      <span className="text-sm text-cocoa-soft">Watch on site</span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-cocoa/70 p-4 backdrop-blur-sm"
            onClick={() => setPlaying(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="clay relative w-full max-w-4xl bg-cream p-3"
            >
              <button
                onClick={() => setPlaying(null)}
                className="clay-btn absolute -right-3 -top-3 z-10 flex h-11 w-11 cursor-pointer items-center justify-center bg-white text-cocoa [--clay-drop:rgb(0_0_0/0.3)]"
                aria-label="Close video"
              >
                <X size={20} />
              </button>
              <div className="clay-inset aspect-video w-full overflow-hidden rounded-[1.5rem] bg-cocoa">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1&rel=0`}
                  title={current.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              </div>
              <p className="px-3 pb-1 pt-3 font-display text-lg font-semibold text-cocoa">{current.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
