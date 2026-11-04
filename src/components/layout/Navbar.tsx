'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ClayButton, scrollToId } from '@/components/ui/clay'
import InjeraArt from '@/components/ui/InjeraArt'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Injera', href: '#our-injera' },
  { label: 'Process', href: '#process' },
  { label: 'How To Order', href: '#how-to-order' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navLinks.forEach((l) => {
      const el = document.querySelector(l.href)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const go = (href: string) => {
    setMobileOpen(false)
    scrollToId(href)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        className={cn(
          'clay mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 bg-cream/90 px-3 backdrop-blur-md transition-all duration-300 sm:px-4',
          isScrolled ? '[--clay-drop:rgb(150_95_55/0.35)]' : '[--clay-drop:rgb(150_95_55/0.18)]',
        )}
      >
        {/* Logo */}
        <button
          onClick={() => go('#home')}
          className="flex cursor-pointer items-center gap-2.5 rounded-full pr-2"
          aria-label="Habesha Harvest — back to top"
        >
          <span className="clay-sm flex h-11 w-11 items-center justify-center bg-butter p-1">
            <InjeraArt className="h-full w-full" />
          </span>
          <span className="font-display text-lg font-semibold leading-none text-cocoa">
            Habesha
            <span className="block text-xs font-medium tracking-[0.25em] text-terracotta">
              HARVEST
            </span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className="clay-inset hidden items-center gap-1 rounded-full bg-clay/60 p-1.5 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href
            return (
              <li key={link.href} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="clay-sm absolute inset-0 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <button
                  onClick={() => go(link.href)}
                  className={cn(
                    'relative z-10 cursor-pointer rounded-full px-3.5 py-2 text-sm font-semibold transition-colors',
                    isActive ? 'text-terracotta' : 'text-cocoa-soft hover:text-cocoa',
                  )}
                >
                  {link.label}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ClayButton size="sm" onClick={() => go('#contact')} className="hidden sm:inline-flex">
            <ShoppingBag size={16} />
            Order Now
          </ClayButton>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="clay-sm flex h-11 w-11 cursor-pointer items-center justify-center bg-clay text-cocoa lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="clay mx-auto mt-3 max-w-6xl bg-cream p-4 lg:hidden"
          >
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => go(link.href)}
                    className={cn(
                      'w-full cursor-pointer rounded-2xl px-4 py-3 text-left font-semibold transition-colors',
                      active === link.href
                        ? 'clay-sm bg-white text-terracotta'
                        : 'text-cocoa-soft hover:bg-clay',
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <ClayButton onClick={() => go('#contact')} className="mt-4 w-full sm:hidden">
              <ShoppingBag size={16} />
              Place an Order
            </ClayButton>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
