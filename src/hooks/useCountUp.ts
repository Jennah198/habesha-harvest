import { useState, useEffect, useRef } from 'react'

export function useCountUp(
  target: number,
  duration = 2000,
  startOnView = true,
) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(!startOnView) // Default to true if not waiting for view
  const ref = useRef<HTMLDivElement>(null)

  // 1. Intersection Observer Logic
  useEffect(() => {
    if (!startOnView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasStarted(true)
      },
      { threshold: 0.1 }, // Trigger earlier for better UX
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [startOnView])

  // 2. Counting Logic
  useEffect(() => {
    if (!hasStarted) return

    let startTimestamp: number | null = null
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)

      setCount(Math.floor(progress * target))

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step)
      }
    }

    animationFrameId = window.requestAnimationFrame(step)

    // Cleanup to prevent memory leaks if component unmounts
    return () => window.cancelAnimationFrame(animationFrameId)
  }, [hasStarted, target, duration])

  return { count, ref }
}
