'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-1.5">
      <div
        className="h-full rounded-r-full bg-gradient-to-r from-terracotta via-gold to-sage transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
