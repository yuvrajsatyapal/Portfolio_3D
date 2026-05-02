'use client'
import { ReactNode, ButtonHTMLAttributes } from 'react'
import { motion }                          from 'framer-motion'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children:  ReactNode
  variant?:  'primary' | 'ghost' | 'outline'
  size?:     'sm' | 'md' | 'lg'
  loading?:  boolean
  fullWidth?: boolean
  href?:     string           // renders an <a> when provided
}

const variants = {
  primary: {
    background: 'var(--clr-yellow)',
    color:      'var(--clr-black)',
    border:     '1px solid transparent',
    '--hover-bg': 'var(--clr-yellow-dark)',
  },
  ghost: {
    background: 'transparent',
    color:      'var(--clr-text)',
    border:     '1px solid var(--clr-grey-700)',
    '--hover-bg': 'var(--clr-grey-900)',
  },
  outline: {
    background: 'transparent',
    color:      'var(--clr-yellow)',
    border:     '1px solid var(--clr-yellow)',
    '--hover-bg': 'rgba(250,204,21,0.08)',
  },
} as const

const sizes = {
  sm: { padding: '0.5rem 1.125rem', fontSize: 'var(--text-sm)' },
  md: { padding: '0.75rem 1.75rem', fontSize: 'var(--text-base)' },
  lg: { padding: '0.9rem 2.25rem',  fontSize: 'var(--text-lg)' },
} as const

/**
 * Reusable button with three visual variants and a loading state.
 *
 * <Button>Primary</Button>
 * <Button variant="ghost">Ghost</Button>
 * <Button variant="outline" loading>Loading…</Button>
 * <Button href="/work">Link button</Button>
 */
export function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  fullWidth = false,
  href,
  style,
  disabled,
  ...rest
}: Props) {
  const baseStyle: React.CSSProperties = {
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            '0.5rem',
    fontFamily:     'var(--font-body)',
    fontWeight:     600,
    letterSpacing:  '0.02em',
    borderRadius:   '9999px',
    cursor:         loading || disabled ? 'not-allowed' : 'none',
    opacity:        loading || disabled ? 0.6 : 1,
    textDecoration: 'none',
    transition:     'background 0.2s, color 0.2s, opacity 0.2s, transform 0.15s',
    width:          fullWidth ? '100%' : 'auto',
    ...variants[variant],
    ...sizes[size],
    ...style,
  }

  if (href) {
    return (
      <motion.a
        href={href}
        style={baseStyle}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      style={baseStyle}
      whileHover={!loading && !disabled ? { scale: 1.03 } : {}}
      whileTap={!loading && !disabled ? { scale: 0.97 } : {}}
      disabled={loading || disabled}
      {...(rest as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {loading && (
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          style={{ animation: 'spin-slow 0.8s linear infinite', flexShrink: 0 }}
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </motion.button>
  )
}