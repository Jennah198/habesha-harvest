import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100)
    }
    window.addEventListener('scroll', update)
    return () => window.removeEventListener('scroll', update)
  }, [])

  return progress
}
