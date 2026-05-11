'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'
import { stats } from '@/data/content'

// ─── Animation variants ────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

// ─── Secondary videos data ─────────────────────────────────────────
const secondaryVideos = [
  {
    id: '1',
    title: 'Fermentation Process',
    duration: '2:34',
    bgFrom: '#C8531A',
    bgTo: '#F5C842',
  },
  {
    id: '2',
    title: 'Our Kitchen',
    duration: '3:12',
    bgFrom: '#2D5016',
    bgTo: '#3D6B1E',
  },
  {
    id: '3',
    title: 'Packaging & Export',
    duration: '4:05',
    bgFrom: '#1A1208',
    bgTo: '#C8531A',
  },
]

// ─── Single stat counter component ────────────────────────────────
function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number
  suffix: string
  label: string
}) {
  const { count, ref } = useCountUp(value, 2000)

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      {/* Large animated number */}
      <span
        className="font-display font-bold text-gold
                       text-5xl md:text-6xl leading-none"
      >
        {count}
        <span className="text-3xl md:text-4xl">{suffix}</span>
      </span>
      {/* Label */}
      <span
        className="text-white/50 text-xs font-body
                       uppercase tracking-widest mt-3"
      >
        {label}
      </span>
    </div>
  )
}

export default function VideoSection() {
  // controls whether the main video modal is open
  const [videoOpen, setVideoOpen] = useState(false)
  // tracks which secondary video is active
  const [activeSecondary, setActiveSecondary] = useState<string | null>(null)

  return (
    <section
      id="process"
      className="bg-espresso py-20 px-8 sm:px-12 lg:px-16
                 relative overflow-hidden"
    >
      {/* ── Decorative background blobs ──────────────────────── */}
      {/*
        These large blurred circles add depth to the dark
        background without being distracting
      */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96
                      bg-terracotta/10 rounded-full blur-3xl
                      pointer-events-none"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96
                      bg-gold/5 rounded-full blur-3xl
                      pointer-events-none"
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
                           tracking-widest text-gold/60 font-body mb-3"
          >
            Behind The Craft
          </span>

          {/* Main heading */}
          <h2
            className="font-display font-bold text-white
                         text-3xl md:text-5xl"
          >
            From Teff to Table
          </h2>

          {/* Gold accent underline */}
          <div
            className="w-16 h-1 bg-gold rounded-full
                          mx-auto mt-4"
          />

          {/* Subtitle */}
          <p
            className="text-white/40 text-sm font-body
                        mt-4 max-w-md mx-auto leading-relaxed"
          >
            Watch how we turn raw Ethiopian teff grain into the world's finest
            injera, ready for your table.
          </p>
        </motion.div>

        {/* ── Primary video player ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="relative rounded-3xl overflow-hidden
                          border border-white/10 shadow-2xl
                          shadow-black/50 aspect-video
                          bg-espresso-light group cursor-pointer"
            onClick={() => setVideoOpen(true)}
          >
            {/* Video thumbnail background */}
            <div
              className="absolute inset-0 bg-gradient-to-br
                            from-terracotta/30 via-espresso-light
                            to-espresso"
            />

            {/* Injera pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg
                viewBox="0 0 800 450"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Large injera circle in background */}
                <circle
                  cx="400"
                  cy="225"
                  r="200"
                  fill="none"
                  stroke="#F5C842"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <circle
                  cx="400"
                  cy="225"
                  r="150"
                  fill="none"
                  stroke="#F5C842"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <circle
                  cx="400"
                  cy="225"
                  r="100"
                  fill="none"
                  stroke="#F5C842"
                  strokeWidth="1"
                  opacity="0.3"
                />
                {/* Texture dots */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 15 * Math.PI) / 180
                  const x = 400 + 170 * Math.cos(angle)
                  const y = 225 + 170 * Math.sin(angle)
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3"
                      fill="#F5C842"
                      opacity="0.4"
                    />
                  )
                })}
              </svg>
            </div>

            {/* Video title overlay — bottom left */}
            <div className="absolute bottom-6 left-6 z-10">
              <p
                className="text-white/40 text-xs font-body
                            uppercase tracking-widest mb-1"
              >
                Featured Video
              </p>
              <p className="text-white font-display font-bold text-xl">
                Our Traditional Process
              </p>
              <p className="text-white/50 text-sm font-body mt-1">
                4 min · HD Quality
              </p>
            </div>

            {/* Duration badge — top right */}
            <div
              className="absolute top-5 right-5 z-10
                            bg-black/40 backdrop-blur-sm
                            rounded-full px-3 py-1.5
                            border border-white/10"
            >
              <span className="text-white text-xs font-body font-bold">
                4:00
              </span>
            </div>

            {/* Play button — center */}
            <div
              className="absolute inset-0 flex items-center
                            justify-center z-10"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-terracotta
                           flex items-center justify-center
                           shadow-2xl shadow-terracotta/50
                           group-hover:shadow-terracotta/70
                           transition-shadow duration-300"
              >
                <Play size={30} className="text-white ml-1.5" fill="white" />
              </motion.div>
            </div>

            {/* Hover overlay */}
            <div
              className="absolute inset-0 bg-black/20
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300"
            />
          </div>
        </motion.div>

        {/* ── Stats row ────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-8
                     max-w-2xl mx-auto"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Thin gold divider ────────────────────────────────── */}
        <div className="w-full h-px bg-white/10 mt-14 mb-12" />

        {/* ── Secondary videos row ─────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {secondaryVideos.map((vid) => (
            <motion.div
              key={vid.id}
              variants={fadeUp}
              onClick={() =>
                setActiveSecondary(activeSecondary === vid.id ? null : vid.id)
              }
              className="group relative rounded-2xl overflow-hidden
                         border border-white/10
                         cursor-pointer aspect-video
                         hover:border-terracotta/50
                         transition-all duration-300
                         hover:shadow-lg hover:shadow-terracotta/20"
            >
              {/* Gradient background */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg,
                    ${vid.bgFrom}, ${vid.bgTo})`,
                }}
              />

              {/* Injera texture dots */}
              <div className="absolute inset-0 opacity-20">
                <svg
                  viewBox="0 0 300 170"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="150"
                    cy="85"
                    r="70"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.8"
                    strokeDasharray="3 4"
                  />
                  <circle
                    cx="150"
                    cy="85"
                    r="45"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.8"
                    strokeDasharray="3 4"
                  />
                  {Array.from({ length: 12 }).map((_, i) => {
                    const a = (i * 30 * Math.PI) / 180
                    return (
                      <circle
                        key={i}
                        cx={150 + 60 * Math.cos(a)}
                        cy={85 + 60 * Math.sin(a)}
                        r="2.5"
                        fill="white"
                        opacity="0.6"
                      />
                    )
                  })}
                </svg>
              </div>

              {/* Play button */}
              <div
                className="absolute inset-0 flex items-center
                              justify-center"
              >
                <div
                  className="w-11 h-11 rounded-full
                                bg-white/20 backdrop-blur-sm
                                border border-white/30
                                flex items-center justify-center
                                group-hover:bg-terracotta
                                group-hover:border-terracotta
                                transition-all duration-300"
                >
                  <Play size={16} className="text-white ml-0.5" fill="white" />
                </div>
              </div>

              {/* Title + duration — bottom */}
              <div
                className="absolute bottom-0 left-0 right-0
                              bg-gradient-to-t from-black/60
                              to-transparent p-4"
              >
                <p
                  className="text-white font-body font-bold
                               text-sm leading-tight"
                >
                  {vid.title}
                </p>
                <p className="text-white/50 text-xs font-body mt-0.5">
                  {vid.duration}
                </p>
              </div>

              {/* Active indicator */}
              {activeSecondary === vid.id && (
                <div
                  className="absolute inset-0 border-2
                                border-terracotta rounded-2xl
                                pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Full screen video modal ───────────────────────────── */}
      {videoOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90
                     backdrop-blur-sm flex items-center
                     justify-center p-4"
          onClick={() => setVideoOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl aspect-video
                       rounded-2xl overflow-hidden bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* YouTube embed — replace VIDEO_ID with real id */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Habesha Harvest — Our Traditional Process"
              allow="accelerometer; autoplay; clipboard-write;
                     encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Close button */}
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-10
                         w-10 h-10 rounded-full bg-black/60
                         backdrop-blur-sm border border-white/20
                         flex items-center justify-center
                         hover:bg-terracotta transition-all"
            >
              <X size={18} className="text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
