'use client'
import { useEffect, useRef } from 'react'

interface MousePos { x: number; y: number }

/**
 * Returns a ref with mouse position normalised to -1..1 range.
 * Using a ref (not state) avoids re-renders every mouse move.
 */
export function useMousePosition() {
  const mouse = useRef<MousePos>({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current = {
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return mouse
}

/**
 * Returns a ref with raw pixel mouse position.
 */
export function useRawMousePosition() {
  const mouse = useRef<MousePos>({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return mouse
}