import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Pressed-in clay well for text inputs, selects and textareas. */
export const inputClass =
  'clay-inset h-12 w-full border-0 bg-white/60 px-4 text-sm text-cocoa outline-none transition-shadow placeholder:text-cocoa-soft/60 focus:bg-white focus:ring-2 focus:ring-terracotta/40'

export function Field({
  label,
  error,
  optional,
  children,
  className,
}: {
  label: string
  error?: string
  optional?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <label className={cn('flex flex-col gap-2', className)}>
      <span className="text-sm font-bold text-cocoa">
        {label}
        {optional && <span className="ml-1 font-normal text-cocoa-soft">(optional)</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="text-xs font-semibold text-destructive">
          {error}
        </span>
      )}
    </label>
  )
}
