'use client'
import { useState, useEffect, useCallback } from 'react'
import Link                                  from 'next/link'
import { usePathname, useRouter }            from 'next/navigation'
import { motion, AnimatePresence }           from 'framer-motion'

// hash  = scroll to section on the home page (no route change)
// route = navigate to a dedicated page
const LINKS = [
  { label: 'About',   hash: 'about'   },
  { label: 'Experience', hash: 'experience' },
  { label: 'Work',    route: '/work'  },
  { label: 'Skills',  hash: 'skills'  },
  { label: 'Contact', route: '/contact' },
] as const

type NavItem = typeof LINKS[number]

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router   = useRouter()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  /**
   * For hash links:
   *   • If already on `/`  → just smooth-scroll, don't touch the URL
   *   • If on another page → navigate to `/#hash` then scroll after mount
   */
  const handleHashClick = useCallback(
    (hash: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      setMobileOpen(false)

      const scrollToEl = () => {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }

      if (pathname === '/') {
        // Already home — just scroll, keep URL clean
        scrollToEl()
      } else {
        // Go home first, then scroll once the page mounts
        router.push('/')
        // Small delay lets Next.js finish rendering the home page
        setTimeout(scrollToEl, 400)
      }
    },
    [pathname, router]
  )

  return (
    <>
      <motion.header
        animate={scrolled ? 'scrolled' : 'top'}
        variants={{
          top:      { backgroundColor: 'rgba(10,10,10,0)',     backdropFilter: 'blur(0px)'  },
          scrolled: { backgroundColor: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)' },
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 'var(--z-overlay)' as never,
          borderBottom: scrolled ? '1px solid var(--clr-grey-800)' : '1px solid transparent',
        }}
      >
        <div
          className="container-wide"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}
        >
          {/* Logo — always goes home */}
          <Link
            href="/"
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    800,
              fontSize:      'var(--text-xl)',
              color:         'var(--clr-yellow)',
              textDecoration:'none',
              letterSpacing: '-0.04em',
            }}
          >
            YN<span style={{ color: 'var(--clr-text)' }}>.</span>
          </Link>

          {/* Desktop nav */}
          <nav
            style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
            className="hidden md:flex"
          >
            {LINKS.map(link => (
              <DesktopNavItem
                key={link.label}
                item={link}
                onHashClick={handleHashClick}
              />
            ))}
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            className="md:hidden"
            style={{ background: 'none', border: 'none', cursor: 'none', padding: 8, color: 'var(--clr-text)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen
                ? <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              }
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0,
              zIndex: 'var(--z-modal)' as never,
              background: 'rgba(10,10,10,0.97)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '2rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            {LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <MobileNavItem
                  item={link}
                  onHashClick={handleHashClick}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Desktop item ──────────────────────────────────────────────────────────────
const linkStyle: React.CSSProperties = {
  fontFamily:    'var(--font-mono)',
  fontSize:      'var(--text-sm)',
  letterSpacing: '0.04em',
  color:         'var(--clr-text-muted)',
  textDecoration:'none',
  transition:    'color 0.2s',
  background:    'none',
  border:        'none',
  cursor:        'none',
  padding:       0,
}

function DesktopNavItem({
  item,
  onHashClick,
}: {
  item: NavItem
  onHashClick: (hash: string) => (e: React.MouseEvent) => void
}) {
  if ('hash' in item) {
    return (
      <a
        href={`#${item.hash}`}
        style={linkStyle}
        onClick={onHashClick(item.hash)}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--clr-yellow)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--clr-text-muted)')}
      >
        {item.label}
      </a>
    )
  }
  return (
    <Link
      href={item.route}
      style={linkStyle}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--clr-yellow)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--clr-text-muted)')}
    >
      {item.label}
    </Link>
  )
}

// ── Mobile item ───────────────────────────────────────────────────────────────
const mobileLinkStyle: React.CSSProperties = {
  fontFamily:    'var(--font-display)',
  fontSize:      'clamp(2rem,8vw,4rem)',
  fontWeight:    800,
  color:         'var(--clr-text)',
  textDecoration:'none',
  letterSpacing: '-0.03em',
  background:    'none',
  border:        'none',
  cursor:        'none',
}

function MobileNavItem({
  item,
  onHashClick,
}: {
  item: NavItem
  onHashClick: (hash: string) => (e: React.MouseEvent) => void
}) {
  if ('hash' in item) {
    return (
      <a
        href={`#${item.hash}`}
        style={mobileLinkStyle}
        onClick={onHashClick(item.hash)}
      >
        {item.label}
      </a>
    )
  }
  return (
    <Link href={item.route} style={mobileLinkStyle}>
      {item.label}
    </Link>
  )
}