'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Leaf, Award, Globe } from 'lucide-react'

// ─── Animation variants ────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

// ─── Certification badges data ─────────────────────────────────────
const certifications = [
  { icon: Award, label: 'ISO Certified' },
  { icon: Leaf, label: '100% Organic' },
  { icon: Globe, label: 'Export Licensed' },
]

// ─── Story paragraphs ──────────────────────────────────────────────
const story = [
  {
    id: '1',
    text: "Habesha Harvest was founded in 1985 by the Tadesse family in the heart of Addis Ababa. What began as a small neighborhood injera kitchen has grown over three generations into one of Ethiopia's most trusted injera exporters — without ever compromising the traditional recipes passed down through our family.",
  },
  {
    id: '2',
    text: 'Every batch of our injera begins with teff grain sourced exclusively from the fertile highlands of Tigray and Amhara — the same regions that have grown teff for over three thousand years. Our farmers are paid fairly and work under sustainable agricultural practices we help fund.',
  },
  {
    id: '3',
    text: 'Since receiving our international export license in 2010, we have shipped to restaurants, diaspora grocery stores, and wholesale distributors across 15 countries. Every shipment carries our ISO certification and full cold-chain documentation — so your customers receive injera exactly as it left our kitchen.',
  },
]

// ─── Ethiopian kitchen SVG illustration ───────────────────────────
function KitchenIllustration() {
  return (
    <svg
      viewBox="0 0 480 420"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Background ──────────────────────────────────────── */}
      <rect width="480" height="420" rx="24" fill="#1A1208" />

      {/* ── Warm ambient light glow ──────────────────────────── */}
      <ellipse
        cx="240"
        cy="380"
        rx="200"
        ry="60"
        fill="#C8531A"
        opacity="0.12"
      />
      <ellipse
        cx="240"
        cy="210"
        rx="160"
        ry="120"
        fill="#F5C842"
        opacity="0.04"
      />

      {/* ── Kitchen floor ────────────────────────────────────── */}
      <rect
        x="40"
        y="340"
        width="400"
        height="40"
        rx="4"
        fill="#2C1F0D"
        opacity="0.8"
      />

      {/* ── Traditional mitad (injera griddle) stand ─────────── */}
      {/* Stand legs */}
      <rect x="155" y="290" width="14" height="55" rx="4" fill="#3D2510" />
      <rect x="311" y="290" width="14" height="55" rx="4" fill="#3D2510" />
      {/* Cross bar */}
      <rect x="155" y="318" width="170" height="8" rx="4" fill="#2C1A0E" />

      {/* ── Mitad (clay griddle) ─────────────────────────────── */}
      {/* Outer rim */}
      <ellipse cx="240" cy="288" rx="130" ry="18" fill="#5C3317" />
      {/* Griddle surface */}
      <ellipse cx="240" cy="283" rx="125" ry="15" fill="#8B4513" />
      {/* Hot surface glow */}
      <ellipse
        cx="240"
        cy="283"
        rx="110"
        ry="12"
        fill="#C8531A"
        opacity="0.6"
      />
      <ellipse cx="240" cy="283" rx="90" ry="9" fill="#F97316" opacity="0.4" />
      <ellipse cx="240" cy="283" rx="65" ry="6" fill="#F5C842" opacity="0.3" />

      {/* ── Injera on the griddle ────────────────────────────── */}
      <ellipse
        cx="240"
        cy="275"
        rx="95"
        ry="11"
        fill="#D4956A"
        opacity="0.85"
      />
      {/* Injera texture holes */}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i * 20 * Math.PI) / 180
        const radius = i % 3 === 0 ? 60 : i % 3 === 1 ? 38 : 18
        const x = 240 + radius * Math.cos(angle)
        const y = 275 + radius * 0.12 * Math.sin(angle)
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="2.5"
            ry="1.2"
            fill="#C8531A"
            opacity="0.5"
          />
        )
      })}

      {/* ── Steam lines rising from griddle ──────────────────── */}
      {[200, 228, 256, 284].map((x, i) => (
        <motion.path
          key={i}
          d={`M${x} 260 Q${x + 8} 240 ${x} 220 Q${x - 8} 200 ${x} 180`}
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0"
          animate={{
            opacity: [0, 0.3, 0],
            translateY: [0, -20, -40],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* ── Flames under the mitad ───────────────────────────── */}
      {[195, 225, 255, 285].map((x, i) => (
        <g key={i}>
          {/* Outer flame */}
          <path
            d={`M${x} 310 Q${x - 6} 298 ${x} 292 Q${x + 6} 298 ${x} 310`}
            fill="#F97316"
            opacity="0.8"
          />
          {/* Inner flame */}
          <path
            d={`M${x} 308 Q${x - 3} 300 ${x} 296 Q${x + 3} 300 ${x} 308`}
            fill="#F5C842"
            opacity="0.9"
          />
        </g>
      ))}

      {/* ── Teff grain stalks — left side ────────────────────── */}
      {/* Main stalk */}
      <line
        x1="80"
        y1="340"
        x2="95"
        y2="200"
        stroke="#2D5016"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Branches */}
      <line
        x1="90"
        y1="240"
        x2="70"
        y2="210"
        stroke="#2D5016"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="88"
        y1="260"
        x2="110"
        y2="235"
        stroke="#2D5016"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="93"
        y1="220"
        x2="78"
        y2="195"
        stroke="#2D5016"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Grain heads */}
      {[
        [70, 210],
        [110, 235],
        [78, 195],
        [95, 200],
      ].map(([x, y], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="5"
          ry="9"
          fill="#F5C842"
          opacity="0.8"
          transform={`rotate(-15 ${x} ${y})`}
        />
      ))}

      {/* ── Teff grain stalks — right side ───────────────────── */}
      <line
        x1="400"
        y1="340"
        x2="385"
        y2="200"
        stroke="#2D5016"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="390"
        y1="240"
        x2="410"
        y2="215"
        stroke="#2D5016"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="392"
        y1="260"
        x2="372"
        y2="238"
        stroke="#2D5016"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="387"
        y1="222"
        x2="403"
        y2="198"
        stroke="#2D5016"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {[
        [410, 215],
        [372, 238],
        [403, 198],
        [385, 200],
      ].map(([x, y], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="5"
          ry="9"
          fill="#F5C842"
          opacity="0.8"
          transform={`rotate(15 ${x} ${y})`}
        />
      ))}

      {/* ── Decorative Ethiopian pattern — top arch ───────────── */}
      {/* Arch border */}
      <path
        d="M60 100 Q240 20 420 100"
        fill="none"
        stroke="#C8531A"
        strokeWidth="1.5"
        opacity="0.4"
        strokeDasharray="6 4"
      />
      {/* Pattern dots along arch */}
      {Array.from({ length: 9 }).map((_, i) => {
        const t = i / 8
        const x = 60 + t * 360
        const y = 100 - Math.sin(t * Math.PI) * 80
        return (
          <circle key={i} cx={x} cy={y} r="3" fill="#F5C842" opacity="0.5" />
        )
      })}

      {/* ── Text label — top center ───────────────────────────── */}
      <text
        x="240"
        y="75"
        textAnchor="middle"
        fill="#F5C842"
        fontSize="13"
        fontFamily="serif"
        opacity="0.6"
        letterSpacing="3"
      >
        HABESHA HARVEST
      </text>
      <text
        x="240"
        y="92"
        textAnchor="middle"
        fill="#C8531A"
        fontSize="9"
        fontFamily="serif"
        opacity="0.5"
        letterSpacing="5"
      >
        EST. 1985 · ADDIS ABABA
      </text>

      {/* ── Corner decorative diamonds ────────────────────────── */}
      {[
        [60, 160],
        [420, 160],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect
            x={x - 6}
            y={y - 6}
            width="12"
            height="12"
            rx="2"
            fill="#C8531A"
            opacity="0.3"
            transform={`rotate(45 ${x} ${y})`}
          />
          <rect
            x={x - 3}
            y={y - 3}
            width="6"
            height="6"
            rx="1"
            fill="#F5C842"
            opacity="0.4"
            transform={`rotate(45 ${x} ${y})`}
          />
        </g>
      ))}
    </svg>
  )
}

export default function About() {
  return (
    <section
      id="about"
      className="bg-white py-20 px-8 sm:px-12 lg:px-16
                 relative overflow-hidden"
    >
      {/* ── Decorative blob ──────────────────────────────────────── */}
      <div
        className="absolute top-1/2 left-0 w-80 h-80
                      bg-terracotta/5 rounded-full blur-3xl
                      pointer-events-none -translate-x-1/2
                      -translate-y-1/2"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Section header — centered ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-bold uppercase
                           tracking-widest text-terracotta font-body mb-3"
          >
            Our Story
          </span>
          <h2
            className="font-display font-bold text-warmBrown
                         text-3xl md:text-5xl"
          >
            Rooted in Ethiopian Heritage
          </h2>
          <div
            className="w-16 h-1 bg-terracotta rounded-full
                          mx-auto mt-4"
          />
        </motion.div>

        {/* ── Two column layout ────────────────────────────────── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2
                        gap-14 lg:gap-20 items-center"
        >
          {/* ── LEFT: Illustration ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative order-2 lg:order-1"
          >
            {/* Main illustration box */}
            <div
              className="relative rounded-3xl overflow-hidden
                            shadow-2xl shadow-espresso/30
                            aspect-[4/3.5]"
            >
              <KitchenIllustration />
            </div>

            {/* ── Floating "Est." badge ──────────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-5 -right-5
                         bg-terracotta rounded-2xl
                         px-5 py-4 shadow-xl
                         shadow-terracotta/40
                         border-4 border-white"
            >
              <p
                className="text-white font-display font-bold
                            text-base leading-tight"
              >
                Est. 1985
              </p>
              <p className="text-white/70 text-xs font-body mt-0.5">
                Addis Ababa, Ethiopia
              </p>
            </motion.div>

            {/* ── Floating stat badge — top left ────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -top-5 -left-5
                         bg-white rounded-2xl
                         px-5 py-4 shadow-xl
                         border border-gray-100"
            >
              <p
                className="text-terracotta font-display
                            font-bold text-2xl leading-none"
              >
                3rd
              </p>
              <p
                className="text-warmBrown/50 text-xs
                            font-body mt-1"
              >
                Generation
              </p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Text content ────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-6 order-1 lg:order-2"
          >
            {/* Story paragraphs */}
            {story.map((para) => (
              <motion.div
                key={para.id}
                variants={fadeUp}
                className="flex gap-4"
              >
                {/* Left accent line */}
                <div
                  className="flex-shrink-0 w-0.5
                                bg-terracotta/20 rounded-full
                                mt-1"
                />

                <p
                  className="text-warmBrown/70 text-sm md:text-base
                              font-body leading-relaxed"
                >
                  {para.text}
                </p>
              </motion.div>
            ))}

            {/* ── Key facts row ──────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 mt-2"
            >
              {[
                { value: '1985', label: 'Founded' },
                { value: '40yr', label: 'Experience' },
                { value: '15+', label: 'Countries' },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="bg-linen rounded-2xl p-4
                                text-center border border-linen-dark"
                >
                  <p
                    className="font-display font-bold
                                text-terracotta text-xl"
                  >
                    {fact.value}
                  </p>
                  <p
                    className="text-warmBrown/50 text-xs
                                font-body mt-1"
                  >
                    {fact.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* ── Certification badges ───────────────────────── */}
            <motion.div variants={fadeUp}>
              <p
                className="text-xs font-bold uppercase
                            tracking-widest text-warmBrown/40
                            font-body mb-3"
              >
                Certifications & Compliance
              </p>
              <div className="flex flex-wrap gap-3">
                {certifications.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2
                               border border-forest/25
                               text-forest rounded-full
                               px-4 py-2 text-sm font-bold
                               font-body bg-forest/5
                               hover:bg-forest/10
                               transition-colors duration-300"
                  >
                    <Icon size={14} />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Values list ────────────────────────────────── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              {[
                'Sourced from Ethiopian highland farmers',
                'Traditional 3-day fermentation process',
                'Vacuum-sealed for 30-day freshness',
                'Full cold-chain export documentation',
              ].map((value) => (
                <div key={value} className="flex items-center gap-3">
                  <CheckCircle
                    size={16}
                    className="text-forest flex-shrink-0"
                  />
                  <span
                    className="text-warmBrown/70 text-sm
                                   font-body"
                  >
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
