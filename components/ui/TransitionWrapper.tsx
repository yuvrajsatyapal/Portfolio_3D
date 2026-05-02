'use client'
import { ReactNode }      from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname }    from 'next/navigation'
import { pageVariants }   from '@/lib/motion'

interface Props { children: ReactNode }

/**
 * Wraps page content in a Framer Motion AnimatePresence so that
 * navigating between routes produces a smooth fade-up transition.
 *
 * Place this directly inside <body> in app/layout.tsx.
 */
export function TransitionWrapper({ children }: Props) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}