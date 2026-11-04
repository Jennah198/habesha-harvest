'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, X, ZoomIn, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { galleryItems } from '@/data/content'
import { ClayButton, Reveal, SectionHeader } from '@/components/ui/clay'
import Image from 'next/image'

const reach = [
  { value: '15+', label: 'Countries', tone: 'bg-blush' },
  { value: '500+', label: 'Restaurant Partners', tone: 'bg-butter' },
  { value: '5', label: 'Continents', tone: 'bg-mint' },
  { value: '10yr', label: 'Exporting', tone: 'bg-sky' },
]

export default function Gallery() {
  const [visible, setVisible] = useState(6)
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const items = galleryItems.slice(0, visible)
  const current = openIdx !== null ? galleryItems[openIdx] : null

  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenIdx((i) => (i === null ? i : (i + dir + galleryItems.length) % galleryItems.length)),
    [],
  )

  useEffect(() => {
    if (openIdx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdx(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIdx, step])

  return (
    <section id="gallery" className="section-pad bg-clay/60">
      <div className="max-container">
        <SectionHeader
          eyebrow="Global reach"
          title={
            <>
              Injera around the <span className="text-terracotta">world</span>
            </>
          }
          subtitle="From Addis Ababa to Amsterdam — our injera is on tables across five continents."
        />

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
                onClick={() => setOpenIdx(i)}
                className={`clay group relative block w-full cursor-pointer break-inside-avoid overflow-hidden ${item.height} [--clay-drop:rgb(58_36_22/0.3)]`}
                style={{ background: `linear-gradient(135deg, ${item.colorFrom}, ${item.colorTo})` }}
                aria-label={`View ${item.location}`}
              >
                <Image
                  src={item.image}
                  alt={`Habesha Harvest injera served in ${item.location}`}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 95vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/35 via-transparent to-transparent shadow-[inset_6px_6px_16px_rgb(255_255_255/0.25),inset_-6px_-6px_16px_rgb(0_0_0/0.2)]" />
                <span className="clay-sm absolute bottom-4 left-4 inline-flex items-center gap-1.5 bg-white/90 px-3 py-1.5 text-xs font-bold text-cocoa backdrop-blur">
                  <MapPin size={12} className="text-terracotta" />
                  {item.location}
                </span>
                <span className="clay-btn absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-white/90 text-cocoa opacity-0 transition-opacity group-hover:opacity-100 [--clay-drop:rgb(0_0_0/0.2)]">
                  <ZoomIn size={16} />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {visible < galleryItems.length && (
          <div className="mt-4 flex justify-center">
            <ClayButton variant="soft" onClick={() => setVisible(galleryItems.length)}>
              <Plus size={16} /> Load more photos
            </ClayButton>
          </div>
        )}

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {reach.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.08} className={`clay-sm p-6 text-center ${r.tone}`}>
              <p className="font-display text-4xl font-semibold text-cocoa">{r.value}</p>
              <p className="mt-1 text-sm font-semibold text-cocoa-soft">{r.label}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIdx(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-cocoa/70 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={current.location}
          >
            <motion.div
              key={current.id}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="clay relative w-full max-w-2xl bg-cream p-3"
            >
              <div
                className="clay-inset relative h-[min(70vh,560px)] overflow-hidden rounded-[1.5rem]"
                style={{ background: `linear-gradient(135deg, ${current.colorFrom}, ${current.colorTo})` }}
              >
                <Image
                  src={current.image}
                  alt={`Habesha Harvest injera served in ${current.location}`}
                  fill
                  sizes="(min-width: 768px) 672px, 95vw"
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-3 pb-2 pt-4">
                <p className="flex items-center gap-2 font-display text-xl font-semibold text-cocoa">
                  <MapPin size={18} className="text-terracotta" /> {current.location}
                </p>
                <div className="flex gap-2">
                  <button onClick={() => step(-1)} aria-label="Previous" className="clay-btn flex h-11 w-11 cursor-pointer items-center justify-center bg-white text-cocoa [--clay-drop:rgb(0_0_0/0.15)]">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={() => step(1)} aria-label="Next" className="clay-btn flex h-11 w-11 cursor-pointer items-center justify-center bg-white text-cocoa [--clay-drop:rgb(0_0_0/0.15)]">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => setOpenIdx(null)}
                className="clay-btn absolute -right-3 -top-3 flex h-11 w-11 cursor-pointer items-center justify-center bg-terracotta text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
