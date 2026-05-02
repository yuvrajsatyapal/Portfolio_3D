'use client'
import { useState } from 'react'
import { motion }   from 'framer-motion'

/**
 * Simple dark / light theme toggle.
 * Toggles a `data-theme="light"` attribute on <html>.
 * Add light-mode overrides to globals.css if needed.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        background:   'var(--clr-grey-900)',
        border:       '1px solid var(--clr-grey-800)',
        borderRadius: '9999px',
        padding:      '0.35rem 0.6rem',
        cursor:       'none',
        display:      'inline-flex',
        alignItems:   'center',
        gap:          '0.35rem',
        color:        'var(--clr-text-muted)',
        fontSize:     'var(--text-sm)',
        transition:   'border-color 0.2s',
      }}
    >
      <motion.span
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
        style={{ display: 'inline-block', fontSize: 14 }}
      >
        {isDark ? '🌙' : '☀️'}
      </motion.span>
    </button>
  )
}