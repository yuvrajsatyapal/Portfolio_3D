'use client'
import {
  useRef,
  useState,
  MouseEvent,
  ReactNode,
  CSSProperties,
} from 'react'
import { motion, useSpring } from 'framer-motion'

interface Props {
  children:   ReactNode
  href?:      string
  onClick?:   () => void
  style?:     CSSProperties
  className?: string
  /** How strongly the element follows the cursor (0 = off, 1 = full) */
  strength?:  number
  /** Radius (px) outside which magnetism is inactive */
  radius?:    number
}

/**
 * An element that drifts toward the cursor when hovered.
 *
 * Works as a link or a plain div — pass `href` for anchor behaviour.
 *
 * <MagneticBtn href="/work" style={{ ... }}>View Work →</MagneticBtn>
 */
export function MagneticBtn({
  children,
  href,
  onClick,
  style,
  className,
  strength = 0.35,
  radius   = 80,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive]  = useState(false)

  // Spring-based x/y for smooth elastic movement
  const springCfg = { stiffness: 200, damping: 20, mass: 0.5 }
  const x = useSpring(0, springCfg)
  const y = useSpring(0, springCfg)

  const handleMouseMove = (e: MouseEvent) => {
    const el = containerRef.current
    if (!el) return
    const rect   = el.getBoundingClientRect()
    const cx     = rect.left + rect.width  / 2
    const cy     = rect.top  + rect.height / 2
    const dx     = e.clientX - cx
    const dy     = e.clientY - cy
    const dist   = Math.hypot(dx, dy)

    if (dist < radius) {
      setActive(true)
      x.set(dx * strength)
      y.set(dy * strength)
    } else {
      setActive(false)
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    setActive(false)
    x.set(0)
    y.set(0)
  }

  const inner = (
    <motion.div
      ref={containerRef}
      style={{ display: 'inline-block', x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          className={className}
          style={{ ...style, display: 'inline-block' }}
        >
          {children}
        </a>
      ) : (
        <button
          onClick={onClick}
          className={className}
          style={{
            background: 'none',
            border:     'none',
            padding:    0,
            cursor:     'none',
            ...style,
          }}
        >
          {children}
        </button>
      )}
    </motion.div>
  )

  return inner
}