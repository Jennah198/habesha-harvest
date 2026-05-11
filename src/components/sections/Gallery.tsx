'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Plus, X, ZoomIn } from 'lucide-react'
import { galleryItems } from '@/data/content'

// ─── Animation variants ────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

export default function Gallery() {
  // how many items are visible — starts at 6, load more adds 3
  const [visibleCount, setVisibleCount] = useState(6)
  // which item is open in the lightbox
  const [lightboxItem, setLightboxItem] = useState<
    (typeof galleryItems)[0] | null
  >(null)

  const visibleItems = galleryItems.slice(0, visibleCount)
  const hasMore = visibleCount < galleryItems.length

  return (
    <section
      id="gallery"
      className="bg-white py-20 px-8 sm:px-12 lg:px-16
                 relative overflow-hidden"
    >
      {/* ── Decorative background blob ───────────────────────── */}
      <div
        className="absolute top-0 left-0 w-96 h-96
                      bg-terracotta/5 rounded-full blur-3xl
                      pointer-events-none -translate-x-1/2
                      -translate-y-1/2"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Section header ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* Small label */}
          <span
            className="inline-block text-xs font-bold uppercase
                           tracking-widest text-terracotta font-body mb-3"
          >
            Global Reach
          </span>

          {/* Main heading */}
          <h2
            className="font-display font-bold text-warmBrown
                         text-3xl md:text-5xl"
          >
            Injera Around the World
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
            From Addis Ababa to Amsterdam — our injera is on tables across five
            continents.
          </p>
        </motion.div>

        {/* ── Masonry grid ─────────────────────────────────────── */}
        {/*
          CSS columns masonry layout:
          1 column on mobile
          2 columns on tablet
          3 columns on desktop
          break-inside-avoid stops cards from splitting
          across columns
        */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="columns-1 sm:columns-2 lg:columns-3
                     gap-5"
        >
          <AnimatePresence>
            {visibleItems.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="break-inside-avoid mb-5
                           group relative rounded-2xl
                           overflow-hidden cursor-pointer
                           shadow-sm hover:shadow-xl
                           hover:shadow-terracotta/15
                           transition-shadow duration-500"
                style={{ height: item.height }}
                onClick={() => setLightboxItem(item)}
              >
                {/* ── Gradient background ───────────────────── */}
                <div
                  className="absolute inset-0 transition-transform
                              duration-700 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg,
                      ${item.colorFrom}, ${item.colorTo})`,
                  }}
                />

                {/* ── Injera texture pattern overlay ────────── */}
                <div className="absolute inset-0 opacity-20">
                  <svg
                    viewBox="0 0 300 300"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    {/* Concentric rings — injera texture */}
                    {[80, 55, 35, 18].map((r, i) => (
                      <circle
                        key={i}
                        cx="150"
                        cy="150"
                        r={r}
                        fill="none"
                        stroke="white"
                        strokeWidth="0.8"
                        strokeDasharray="4 5"
                        opacity={0.6 - i * 0.1}
                      />
                    ))}
                    {/* Outer dot ring */}
                    {Array.from({ length: 16 }).map((_, i) => {
                      const a = (i * 22.5 * Math.PI) / 180
                      return (
                        <circle
                          key={i}
                          cx={150 + 100 * Math.cos(a)}
                          cy={150 + 100 * Math.sin(a)}
                          r="2.5"
                          fill="white"
                          opacity="0.5"
                        />
                      )
                    })}
                    {/* Middle dot ring */}
                    {Array.from({ length: 10 }).map((_, i) => {
                      const a = (i * 36 * Math.PI) / 180
                      return (
                        <circle
                          key={i}
                          cx={150 + 65 * Math.cos(a)}
                          cy={150 + 65 * Math.sin(a)}
                          r="2"
                          fill="white"
                          opacity="0.4"
                        />
                      )
                    })}
                  </svg>
                </div>

                {/* ── Hover overlay ─────────────────────────── */}
                <div
                  className="absolute inset-0 bg-espresso/60
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-400
                                flex flex-col items-center
                                justify-center gap-3"
                >
                  {/* Zoom icon */}
                  <div
                    className="w-12 h-12 rounded-full
                                  bg-white/20 backdrop-blur-sm
                                  border border-white/30
                                  flex items-center justify-center
                                  transform scale-75
                                  group-hover:scale-100
                                  transition-transform duration-300"
                  >
                    <ZoomIn size={20} className="text-white" />
                  </div>

                  {/* Location label */}
                  <div
                    className="flex items-center gap-2
                                  bg-white/10 backdrop-blur-sm
                                  rounded-full px-4 py-2
                                  border border-white/20
                                  transform translate-y-2
                                  group-hover:translate-y-0
                                  transition-transform duration-300"
                  >
                    <MapPin size={12} className="text-gold" />
                    <span
                      className="text-white font-body
                                     font-bold text-sm"
                    >
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* ── Always-visible location pill ─────────── */}
                {/*
                  Small pill visible at all times in bottom-left,
                  disappears on hover when the full overlay shows
                */}
                <div
                  className="absolute bottom-3 left-3
                                bg-black/30 backdrop-blur-sm
                                rounded-full px-3 py-1.5
                                flex items-center gap-1.5
                                group-hover:opacity-0
                                transition-opacity duration-300"
                >
                  <MapPin size={10} className="text-white/70" />
                  <span
                    className="text-white/70 text-[10px]
                                   font-body font-bold"
                  >
                    {item.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Load More button ─────────────────────────────────── */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="flex items-center gap-2
                         border-2 border-terracotta text-terracotta
                         hover:bg-terracotta hover:text-white
                         font-bold text-sm px-8 py-3.5
                         rounded-full transition-all duration-300
                         hover:shadow-lg hover:shadow-terracotta/30
                         hover:-translate-y-0.5 active:translate-y-0"
            >
              <Plus size={16} />
              Load More Photos
            </button>
          </motion.div>
        )}

        {/* ── All loaded message ───────────────────────────────── */}
        {!hasMore && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-warmBrown/40 text-sm
                       font-body mt-10"
          >
            ✓ All {galleryItems.length} locations shown
          </motion.p>
        )}

        {/* ── Bottom stats strip ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4
                     gap-4"
        >
          {[
            { value: '15+', label: 'Countries' },
            { value: '500+', label: 'Restaurant Partners' },
            { value: '5', label: 'Continents' },
            { value: '10yr', label: 'Exporting' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-linen rounded-2xl p-5
                         text-center border border-linen-dark"
            >
              <p
                className="font-display font-bold
                            text-terracotta text-2xl"
              >
                {stat.value}
              </p>
              <p
                className="text-warmBrown/50 text-xs
                            font-body mt-1 uppercase
                            tracking-wide"
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Lightbox modal ───────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90
                       backdrop-blur-sm flex items-center
                       justify-center p-4"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-lg
                         rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox image area */}
              <div
                className="w-full h-80"
                style={{
                  background: `linear-gradient(135deg,
                    ${lightboxItem.colorFrom},
                    ${lightboxItem.colorTo})`,
                }}
              >
                {/* Injera texture in lightbox */}
                <div
                  className="w-full h-full opacity-30 flex
                                items-center justify-center"
                >
                  <svg
                    viewBox="0 0 300 300"
                    className="w-64 h-64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {[90, 65, 45, 28, 14].map((r, i) => (
                      <circle
                        key={i}
                        cx="150"
                        cy="150"
                        r={r}
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity={0.8 - i * 0.12}
                      />
                    ))}
                    {Array.from({ length: 20 }).map((_, i) => {
                      const a = (i * 18 * Math.PI) / 180
                      return (
                        <circle
                          key={i}
                          cx={150 + 110 * Math.cos(a)}
                          cy={150 + 110 * Math.sin(a)}
                          r="3"
                          fill="white"
                          opacity="0.6"
                        />
                      )
                    })}
                  </svg>
                </div>
              </div>

              {/* Lightbox info bar */}
              <div
                className="bg-espresso px-6 py-5
                              flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gold" />
                    <p
                      className="text-white font-display
                                  font-bold text-lg"
                    >
                      {lightboxItem.location}
                    </p>
                  </div>
                  <p
                    className="text-white/40 text-xs
                                font-body mt-1"
                  >
                    Habesha Harvest · Export Partner
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setLightboxItem(null)}
                  className="w-10 h-10 rounded-full
                             bg-white/10 border border-white/20
                             flex items-center justify-center
                             hover:bg-terracotta
                             hover:border-terracotta
                             transition-all duration-300"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
