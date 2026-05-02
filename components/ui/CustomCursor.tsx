'use client'
import { useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

/**
 * Replaces the default OS cursor with a two-layer yellow dot:
 *   • Inner dot  — follows instantly
 *   • Outer ring — follows with spring lag
 *
 * On pointer-cursor elements (links, buttons) the ring expands.
 */
export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springCfg = { stiffness: 400, damping: 35, mass: 0.4 }
  const ringX = useSpring(cursorX, springCfg)
  const ringY = useSpring(cursorY, springCfg)

  const ringRef  = useRef<HTMLDivElement>(null)
  const isPointer = useRef(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const checkTarget = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const pointer = window.getComputedStyle(el).cursor === 'pointer'
      if (pointer !== isPointer.current) {
        isPointer.current = pointer
        if (ringRef.current) {
          ringRef.current.style.width  = pointer ? '44px' : '28px'
          ringRef.current.style.height = pointer ? '44px' : '28px'
          ringRef.current.style.borderColor = pointer ? 'var(--clr-yellow)' : 'rgba(250,204,21,0.5)'
          ringRef.current.style.mixBlendMode = pointer ? 'normal' : 'normal'
        }
      }
    }

    window.addEventListener('mousemove', move,        { passive: true })
    window.addEventListener('mouseover', checkTarget, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', checkTarget)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Inner dot */}
      <motion.div
        style={{
          position:     'fixed',
          top:          0,
          left:         0,
          width:        8,
          height:       8,
          borderRadius: '50%',
          background:   'var(--clr-yellow)',
          pointerEvents:'none',
          zIndex:       'var(--z-cursor)' as never,
          translateX:   '-50%',
          translateY:   '-50%',
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* Outer ring */}
      <motion.div
        ref={ringRef}
        style={{
          position:     'fixed',
          top:          0,
          left:         0,
          width:        28,
          height:       28,
          borderRadius: '50%',
          border:       '1.5px solid rgba(250,204,21,0.5)',
          pointerEvents:'none',
          zIndex:       'var(--z-cursor)' as never,
          translateX:   '-50%',
          translateY:   '-50%',
          x: ringX,
          y: ringY,
          transition:   'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
    </>
  )
}