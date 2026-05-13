'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 14,
  md: 20,
  lg: 28,
}

export default function StarRating({
  value,
  onChange,
  readonly = false,
  size = 'md',
}: StarRatingProps) {
  // tracks which star the mouse is hovering over
  const [hovered, setHovered] = useState(0)
  const px = sizes[size]

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        // star is filled if it's below hovered (on hover)
        // or below value (static/readonly)
        const filled = star <= (hovered || value)

        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
            className={cn(
              'transition-all duration-150',
              !readonly && 'cursor-pointer hover:scale-110',
              readonly && 'cursor-default',
            )}
            aria-label={`Rate ${star} out of 5`}
          >
            <Star
              size={px}
              className={cn(
                'transition-colors duration-150',
                filled ? 'text-gold fill-gold' : 'text-gray-200 fill-gray-200',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
