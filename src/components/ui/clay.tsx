'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const scrollToId = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export const toneBg = {
  mint: 'bg-mint',
  blush: 'bg-blush',
  butter: 'bg-butter',
  sky: 'bg-sky',
  lilac: 'bg-lilac',
} as const

/* ─── Reveal: fade-up on scroll ──────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  className,
  ...rest
}: { children: ReactNode; delay?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* ─── Section header ─────────────────────────────────────────── */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  invert = false,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  align?: 'center' | 'left'
  invert?: boolean
}) {
  return (
    <Reveal
      className={cn(
        'mb-14 flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start',
      )}
    >
      <span
        className={cn(
          'clay-sm inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]',
          invert ? 'bg-white/10 text-gold' : 'bg-butter text-terracotta-dark',
        )}
        style={invert ? { boxShadow: 'none' } : undefined}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {eyebrow}
      </span>
      <h2
        className={cn(
          'font-display text-4xl font-semibold leading-tight md:text-5xl',
          invert ? 'text-cream' : 'text-cocoa',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'max-w-xl text-base leading-relaxed',
            invert ? 'text-cream/60' : 'text-cocoa-soft',
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}

/* ─── Clay button ────────────────────────────────────────────── */
const variants = {
  primary: 'bg-terracotta text-white hover:bg-terracotta-dark',
  gold: 'bg-gold text-cocoa hover:bg-gold-dark [--clay-drop:rgb(217_162_30/0.5)]',
  sage: 'bg-sage text-white hover:bg-forest [--clay-drop:rgb(63_107_42/0.45)]',
  soft: 'bg-clay text-cocoa hover:bg-white [--clay-drop:rgb(150_95_55/0.3)]',
}

export function ClayButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: {
  variant?: keyof typeof variants
  size?: 'sm' | 'md' | 'lg'
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'clay-btn inline-flex cursor-pointer items-center justify-center gap-2 font-bold disabled:cursor-not-allowed disabled:opacity-60',
        size === 'sm' && 'px-5 py-2.5 text-sm',
        size === 'md' && 'px-7 py-3.5 text-sm',
        size === 'lg' && 'px-9 py-4 text-base',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

/* ─── Decorative clay blob ───────────────────────────────────── */
export function Blob({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('animate-wobble pointer-events-none absolute clay', className)}
    />
  )
}
