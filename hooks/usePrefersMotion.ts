'use client'
import { useEffect, useState } from 'react'

/**
 * Returns true when the user has NOT requested reduced motion.
 * Use this to gate expensive animations.
 */
export function usePrefersMotion(): boolean {
  const [prefersMotion, setPrefersMotion] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersMotion(!mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersMotion(!e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersMotion
}