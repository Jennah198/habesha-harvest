import type { Metadata, Viewport } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['400', '500', '600', '700'],
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Habesha Harvest — Authentic Ethiopian Injera, Exported Worldwide',
  description:
    'Premium Ethiopian injera exported to 15+ countries. Hand-crafted from 100% teff grain, traditionally fermented, vacuum-sealed for freshness.',
  keywords: [
    'Ethiopian injera',
    'teff injera export',
    'wholesale injera',
    'Habesha Harvest',
  ],
}

export const viewport: Viewport = {
  themeColor: '#fbf4ea',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  )
}
