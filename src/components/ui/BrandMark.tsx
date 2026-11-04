import { Wheat } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Habesha Harvest logo mark: a teff stalk on a terracotta tile. */
export default function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex shrink-0 items-center justify-center rounded-2xl bg-terracotta text-cream shadow-[inset_3px_3px_6px_rgb(255_255_255/0.3),inset_-3px_-3px_6px_rgb(0_0_0/0.18)]',
        className,
      )}
    >
      <Wheat className="h-[55%] w-[55%]" />
    </span>
  )
}
