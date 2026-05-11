import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Habesha Harvest — Authentic Ethiopian Injera, Exported Worldwide',
  description:
    'Premium Ethiopian injera exported to 15+ countries. Hand-crafted from 100% teff grain, traditionally fermented, vacuum-sealed for freshness.',
  keywords:
    'Ethiopian injera, teff injera export, wholesale injera, Habesha Harvest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
