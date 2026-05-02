import { Variants } from 'framer-motion'

// ─── Easing curves ────────────────────────────────────────────────────────────
export const ease = {
  out:     [0.0, 0.0, 0.2, 1.0],
  in:      [0.4, 0.0, 1.0, 1.0],
  inOut:   [0.4, 0.0, 0.2, 1.0],
  spring:  { type: 'spring', stiffness: 300, damping: 30 },
  springSlower: { type: 'spring', stiffness: 120, damping: 20 },
} as const

// ─── Page transition ──────────────────────────────────────────────────────────
export const pageVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.3, ease: ease.in } },
}

// ─── Stagger container ────────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

// ─── Fade up ─────────────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
}

export const fadeUpFast: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: ease.out } },
}

// ─── Fade in ─────────────────────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease: ease.out } },
}

// ─── Slide in from left ───────────────────────────────────────────────────────
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: ease.out } },
}

// ─── Slide in from right ──────────────────────────────────────────────────────
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: ease.out } },
}

// ─── Scale up ─────────────────────────────────────────────────────────────────
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.6, ease: ease.out } },
}

// ─── Card hover ───────────────────────────────────────────────────────────────
export const cardHover = {
  rest:  { y: 0,   scale: 1,    transition: { duration: 0.3, ease: ease.out } },
  hover: { y: -8,  scale: 1.02, transition: { duration: 0.3, ease: ease.out } },
}

// ─── Text character reveal ────────────────────────────────────────────────────
export const charReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  show:   { opacity: 1, y: '0%', transition: { duration: 0.5, ease: ease.out } },
}

// ─── Underline draw ───────────────────────────────────────────────────────────
export const underlineDraw: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, transition: { duration: 0.4, ease: ease.out, delay: 0.3 } },
}

// ─── Navbar variants ─────────────────────────────────────────────────────────
export const navbarVariants: Variants = {
  top:      { backgroundColor: 'rgba(10,10,10,0)',  backdropFilter: 'blur(0px)' },
  scrolled: { backgroundColor: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)' },
}