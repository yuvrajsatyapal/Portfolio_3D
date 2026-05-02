'use client'
import { useEffect, useState } from 'react'

const breakpoints = {
  sm:  '(min-width: 640px)',
  md:  '(min-width: 768px)',
  lg:  '(min-width: 1024px)',
  xl:  '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
} as const

type Breakpoint = keyof typeof breakpoints

export function useMedia(bp: Breakpoint): boolean {
  const query = breakpoints[bp]
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}

/** Returns true on mobile (< md) */
export function useIsMobile(): boolean {
  const isMd = useMedia('md')
  return !isMd
}