'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * Returns a 0..1 value representing how far down the page the user has scrolled.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const scrollTop  = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return progress
}

/**
 * Returns scroll progress of a specific element (0..1).
 * Attach the returned ref to the element you want to track.
 */
export function useElementScrollProgress() {
  const ref  = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const { top, height } = entry.boundingClientRect
        const vh = window.innerHeight
        setProgress(clamp01((vh - top) / (vh + height)))
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, progress }
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))