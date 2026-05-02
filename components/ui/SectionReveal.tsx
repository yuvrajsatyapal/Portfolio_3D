'use client'
import { useRef, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  children:  ReactNode
  delay?:    number
  duration?: number
  y?:        number
  className?: string
  style?:    React.CSSProperties
  once?:     boolean
}

/**
 * Wraps children in a scroll-triggered fade-up reveal.
 * Uses Framer Motion's useInView for intersection detection.
 *
 * Usage:
 *   <SectionReveal delay={0.2}>
 *     <h2>Hello</h2>
 *   </SectionReveal>
 */
export function SectionReveal({
  children,
  delay    = 0,
  duration = 0.65,
  y        = 36,
  className,
  style,
  once     = true,
}: Props) {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once, margin: '-80px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration,
        delay,
        ease: [0.0, 0.0, 0.2, 1.0],
      }}
    >
      {children}
    </motion.div>
  )
}