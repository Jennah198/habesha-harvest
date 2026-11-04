'use client'

import Image from 'next/image'
import { Award, Leaf, Globe, MapPin, Wheat, Users, Ship } from 'lucide-react'
import { Reveal, SectionHeader } from '@/components/ui/clay'

const certifications = [
  { icon: Award, label: 'ISO Certified', tone: 'bg-butter' },
  { icon: Leaf, label: '100% Organic', tone: 'bg-mint' },
  { icon: Globe, label: 'Export Licensed', tone: 'bg-sky' },
]

const story = [
  {
    year: '1985',
    icon: Users,
    title: 'A family kitchen',
    text: "Habesha Harvest was founded in 1985 by the Tadesse family in the heart of Addis Ababa. What began as a small neighborhood injera kitchen has grown over three generations into one of Ethiopia's most trusted injera exporters — without ever compromising the traditional recipes passed down through our family.",
    tone: 'bg-blush',
  },
  {
    year: 'Highlands',
    icon: Wheat,
    title: 'Teff from the source',
    text: 'Every batch of our injera begins with teff grain sourced exclusively from the fertile highlands of Tigray and Amhara — the same regions that have grown teff for over three thousand years. Our farmers are paid fairly and work under sustainable agricultural practices we help fund.',
    tone: 'bg-butter',
  },
  {
    year: '2010',
    icon: Ship,
    title: 'Going global',
    text: 'Since receiving our international export license in 2010, we have shipped to restaurants, diaspora grocery stores, and wholesale distributors across 15 countries. Every shipment carries our ISO certification and full cold-chain documentation — so your customers receive injera exactly as it left our kitchen.',
    tone: 'bg-mint',
  },
]

const facts = [
  { value: '1985', label: 'Founded' },
  { value: '40yr', label: 'Experience' },
  { value: '15+', label: 'Countries' },
]

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div className="max-container grid items-start gap-14 lg:grid-cols-[1fr_1.15fr]">
        {/* Visual column */}
        <div className="lg:sticky lg:top-28">
          <SectionHeader
            align="left"
            eyebrow="Our story"
            title={
              <>
                Rooted in Ethiopian <span className="text-terracotta">heritage</span>
              </>
            }
            subtitle="Three generations, one recipe, and a promise that every round of injera tastes like it came from grandmother's mitad."
          />

          <Reveal className="clay relative bg-butter p-6 [--clay-drop:rgb(217_162_30/0.4)]">
            <div className="clay-inset relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-clay">
              <Image
                src="/images/beyaynetu-platter.png"
                alt="Traditional beyaynetu platter of stews served on injera"
                fill
                sizes="(min-width: 1024px) 520px, 95vw"
                className="object-cover"
              />
              <span className="clay-sm absolute left-4 top-4 inline-flex items-center gap-1.5 bg-white px-3 py-1.5 text-xs font-bold text-cocoa">
                <MapPin size={12} className="text-terracotta" /> Addis Ababa, Ethiopia
              </span>
              <span className="clay-sm absolute bottom-4 right-4 bg-terracotta px-4 py-2 text-center text-white">
                <span className="block font-display text-2xl font-semibold leading-none">3rd</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Generation</span>
              </span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {facts.map((f) => (
                <div key={f.label} className="clay-sm bg-white/90 py-4 text-center">
                  <p className="font-display text-2xl font-semibold text-cocoa">{f.value}</p>
                  <p className="text-xs font-semibold text-cocoa-soft">{f.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Timeline column */}
        <div className="flex flex-col gap-6 lg:pt-4">
          {story.map(({ year, icon: Icon, title, text, tone }, i) => (
            <Reveal key={title} delay={i * 0.1} className="clay clay-hover flex gap-5 bg-white p-6 sm:p-7">
              <div className="flex flex-col items-center">
                <span className={`clay-sm flex h-14 w-14 shrink-0 items-center justify-center ${tone}`}>
                  <Icon size={24} className="text-cocoa" />
                </span>
                {i < story.length - 1 && <span className="clay-inset mt-3 w-1.5 flex-1 rounded-full bg-clay" />}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-terracotta">{year}</span>
                <h3 className="font-display text-2xl font-semibold text-cocoa">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa-soft">{text}</p>
              </div>
            </Reveal>
          ))}

          <Reveal className="clay bg-clay p-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-cocoa-soft">
              Certifications &amp; compliance
            </p>
            <div className="flex flex-wrap gap-3">
              {certifications.map(({ icon: Icon, label, tone }) => (
                <span key={label} className={`clay-sm inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-cocoa ${tone}`}>
                  <Icon size={16} /> {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
