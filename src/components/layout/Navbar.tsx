'use client'

import { useState, useEffect } from 'react'
import { Menu, User } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Injera', href: '#our-injera' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'How To Order', href: '#how-to-order' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-14 transition-shadow duration-300',
        isScrolled ? 'shadow-lg' : 'shadow-none',
      )}
      style={{ backgroundColor: '#8B4513' }}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* ── LEFT: Logo ── */}
        <button
          onClick={() => scrollTo('#home')}
          className="font-display font-bold text-white text-lg tracking-wide hover:opacity-80 transition-opacity"
        >
          Habesha Harvest
        </button>

        {/* ── CENTER: Desktop Nav Links ── */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="text-white/90 text-sm font-body hover:text-white hover:underline underline-offset-4 transition-all"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* ── RIGHT: Avatar + Mobile Trigger ── */}
        <div className="flex items-center gap-3">
          {/* Avatar button — always visible */}
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center border border-white/30 bg-white/10 hover:bg-white/25 transition-all"
            aria-label="Account"
          >
            <User size={16} className="text-white" />
          </button>

          {/* Hamburger — mobile only */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10 hover:text-white"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-64 p-0"
              style={{ backgroundColor: '#8B4513' }}
            >
              <div className="flex flex-col h-full pt-16 px-6 gap-2">
                {/* Mobile brand name */}
                <p className="font-display font-bold text-white text-xl mb-6">
                  Habesha Harvest
                </p>

                {/* Mobile nav links */}
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-white/90 text-base font-body text-left py-3 px-4 rounded-lg hover:bg-white/10 transition-all"
                  >
                    {link.label}
                  </button>
                ))}

                {/* Mobile CTA */}
                <div className="mt-auto pb-8">
                  <button
                    onClick={() => scrollTo('#contact')}
                    className="w-full bg-white text-[#8B4513] font-bold py-3 rounded-full hover:bg-white/90 transition-all"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
