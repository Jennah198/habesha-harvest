'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { contactInfo } from '@/data/content'
import { scrollToId } from '@/components/ui/clay'
import BrandMark from '@/components/ui/BrandMark'

type Msg = { from: 'bot' | 'user'; text: string; action?: { label: string; href: string } }

// Simple FAQ assistant — answers are matched by keyword.
const faqs: { keys: string[]; chip?: string; answer: string; action?: Msg['action'] }[] = [
  {
    chip: 'Pricing',
    keys: ['price', 'pricing', 'cost', 'quote', 'how much'],
    answer:
      'Pricing depends on product, volume and destination. Send us an inquiry and our export team replies with a full quote — including shipping — within 24 hours.',
    action: { label: 'Request a quote', href: '#contact' },
  },
  {
    chip: 'Shipping',
    keys: ['ship', 'shipping', 'deliver', 'delivery', 'country', 'countries'],
    answer:
      'We ship to 15+ countries across 5 continents, including the USA, UK, Canada, UAE and much of Europe. Orders are dispatched within 5 business days with tracking.',
  },
  {
    chip: 'Shelf life',
    keys: ['fresh', 'shelf', 'last', 'expire', 'storage', 'store'],
    answer:
      'Our vacuum-sealed, nitrogen-flushed injera stays fresh for 30 days at room temperature — longer if refrigerated.',
  },
  {
    chip: 'Minimum order',
    keys: ['minimum', 'moq', 'small', 'kg', 'quantity'],
    answer: 'Our minimum order is 10 kg, and we scale up to full pallets and 1 ton+ bulk shipments.',
  },
  {
    chip: 'Ingredients',
    keys: ['ingredient', 'teff', 'gluten', 'organic', 'barley'],
    answer:
      'Classic Teff is 100% teff — naturally gluten-free. Mixed Grain blends teff and barley for a milder taste. No preservatives or additives, ever.',
    action: { label: 'See our injera', href: '#our-injera' },
  },
  {
    keys: ['payment', 'pay', 'deposit', 'bank'],
    answer: 'Once you approve your quote, a 50% deposit by bank transfer locks in your order. The balance is due before dispatch.',
  },
  {
    keys: ['hello', 'hi', 'selam', 'hey'],
    answer: 'Selam! How can I help you today?',
  },
]

const greeting: Msg = {
  from: 'bot',
  text: 'Selam! I’m the Habesha Harvest assistant. Ask me about pricing, shipping, freshness or ordering.',
}

function reply(input: string): Msg {
  const q = input.toLowerCase()
  const hit = faqs.find((f) => f.keys.some((k) => q.includes(k)))
  if (hit) return { from: 'bot', text: hit.answer, action: hit.action }
  return {
    from: 'bot',
    text: `Great question! Our team can answer that directly — message us on WhatsApp at ${contactInfo.phone} or send an inquiry.`,
    action: { label: 'Contact the team', href: '#contact' },
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([greeting])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text: string) => {
    const t = text.trim()
    if (!t || typing) return
    setMessages((m) => [...m, { from: 'user', text: t }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, reply(t)])
      setTyping(false)
    }, 700)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="clay fixed bottom-24 right-4 z-[70] flex h-[min(560px,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden bg-cream sm:right-6"
            role="dialog"
            aria-label="Chat with Habesha Harvest"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-terracotta px-5 py-4 text-white">
              <BrandMark className="h-11 w-11 rounded-full bg-cream text-terracotta" />
              <div className="flex-1 leading-tight">
                <p className="font-display text-lg font-semibold">Habesha Assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-mint" /> Usually replies instantly
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="cursor-pointer rounded-full p-2 hover:bg-white/15">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.from === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'clay-btn rounded-2xl rounded-br-md bg-terracotta text-white hover:translate-y-0'
                        : 'clay-sm rounded-2xl rounded-bl-md bg-white text-cocoa'
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.action && (
                    <button
                      onClick={() => {
                        setOpen(false)
                        scrollToId(m.action!.href)
                      }}
                      className="mt-2 cursor-pointer text-xs font-bold text-terracotta underline underline-offset-4"
                    >
                      {m.action.label} →
                    </button>
                  )}
                </div>
              ))}
              {typing && (
                <div className="clay-sm flex w-fit gap-1 rounded-2xl bg-white px-4 py-3">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-2 w-2 rounded-full bg-cocoa-soft/50"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick chips */}
            <div className="flex gap-2 overflow-x-auto px-4 pb-2">
              {faqs.filter((f) => f.chip).map((f) => (
                <button
                  key={f.chip}
                  onClick={() => send(f.chip!)}
                  className="clay-sm shrink-0 cursor-pointer rounded-full bg-butter px-3 py-1.5 text-xs font-bold text-cocoa"
                >
                  {f.chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex gap-2 p-4 pt-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                aria-label="Message"
                className="clay-inset h-11 min-w-0 flex-1 rounded-full bg-white/70 px-4 text-sm text-cocoa outline-none focus:ring-2 focus:ring-terracotta/40"
              />
              <button type="submit" aria-label="Send" className="clay-btn flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center bg-terracotta text-white">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((o) => !o)}
        className="clay-btn fixed bottom-6 right-4 z-[70] flex h-14 w-14 cursor-pointer items-center justify-center bg-terracotta text-white sm:right-6"
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'x' : 'chat'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X size={24} /> : <MessageCircle size={24} />}
          </motion.span>
        </AnimatePresence>
        {!open && <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-cream bg-gold" />}
      </motion.button>
    </>
  )
}
