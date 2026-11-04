'use client'

import { useState } from 'react'
import { ArrowRight, Mail, Phone, MapPin, Check } from 'lucide-react'
import { contactInfo } from '@/data/content'
import { scrollToId } from '@/components/ui/clay'
import InjeraArt from '@/components/ui/InjeraArt'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Our Injera', href: '#our-injera' },
      { label: 'Products', href: '#products' },
      { label: 'Our Process', href: '#process' },
      { label: 'Gallery', href: '#gallery' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'How To Order', href: '#how-to-order' },
      { label: 'Testimonials', href: '#feedback' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]

// lucide v1 dropped brand icons, so these are simple inline marks
const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    path: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM12 2c-2.7 0-3 0-4.1.1C4.3 2.3 2.3 4.3 2.1 7.9 2 9 2 9.3 2 12s0 3 .1 4.1c.2 3.6 2.2 5.6 5.8 5.8 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c3.6-.2 5.6-2.2 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c-.2-3.6-2.2-5.6-5.8-5.8C15 2 14.7 2 12 2Z',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    path: 'M14 8V6.2c0-.8.2-1.2 1.4-1.2H17V2h-2.6C11.3 2 10 3.5 10 6v2H8v3h2v11h4V11h2.7l.3-3h-3Z',
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    path: 'M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6Z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.05c.53-1 1.84-2.05 3.8-2.05 4.05 0 4.8 2.67 4.8 6.14V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.9 1.28-1.9 2.6V21h-4V9.75Z',
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <footer className="px-3 pb-6 pt-12 sm:px-6">
      <div className="clay relative mx-auto max-w-7xl overflow-hidden bg-cocoa px-6 pb-8 pt-14 text-cream [--clay-drop:rgb(58_36_22/0.45)] sm:px-12">
        <InjeraArt className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 opacity-10" />

        <div className="relative grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-butter p-1.5 shadow-[inset_3px_3px_6px_rgb(255_255_255/0.6),inset_-3px_-3px_6px_rgb(0_0_0/0.15)]">
                <InjeraArt className="h-full w-full" />
              </span>
              <span className="font-display text-2xl font-semibold">Habesha Harvest</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              Authentic Ethiopian injera — hand-crafted from 100% teff in Addis Ababa and
              delivered fresh to tables in 15+ countries.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cream shadow-[inset_3px_3px_6px_rgb(255_255_255/0.12),inset_-3px_-3px_6px_rgb(0_0_0/0.25)] transition-all hover:-translate-y-1 hover:bg-terracotta"
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 font-display text-lg font-semibold text-gold">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <button
                      onClick={() => scrollToId(l.href)}
                      className="group inline-flex cursor-pointer items-center gap-1.5 text-sm text-cream/70 transition-colors hover:text-cream"
                    >
                      <ArrowRight size={12} className="-ml-4 opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100" />
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter + contact */}
          <div>
            <p className="mb-4 font-display text-lg font-semibold text-gold">Stay in the loop</p>
            <p className="mb-4 text-sm text-cream/60">Seasonal offers and new export routes, once a month.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email.includes('@')) setJoined(true)
              }}
              className="flex gap-2 rounded-full bg-black/20 p-1.5 shadow-[inset_4px_4px_8px_rgb(0_0_0/0.3),inset_-3px_-3px_6px_rgb(255_255_255/0.06)]"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={joined}
                placeholder={joined ? 'You’re subscribed!' : 'Your email'}
                aria-label="Email for newsletter"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-cream outline-none placeholder:text-cream/40"
              />
              <button
                type="submit"
                disabled={joined}
                className="clay-btn flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center bg-terracotta text-white [--clay-drop:rgb(0_0_0/0.3)]"
                aria-label="Subscribe"
              >
                {joined ? <Check size={16} /> : <ArrowRight size={16} />}
              </button>
            </form>

            <ul className="mt-6 space-y-2.5 text-sm text-cream/70">
              <li className="flex items-center gap-2"><Phone size={14} className="text-gold" /> {contactInfo.phone}</li>
              <li className="flex items-center gap-2"><Mail size={14} className="text-gold" /> {contactInfo.email}</li>
              <li className="flex items-center gap-2"><MapPin size={14} className="text-gold" /> {contactInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="relative mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Habesha Harvest. All rights reserved.</p>
          <p>Made with ❤️ in Addis Ababa</p>
        </div>
      </div>
    </footer>
  )
}
