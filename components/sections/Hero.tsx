'use client'
import { motion }         from 'framer-motion'
import { CanvasWrapper }  from '@/components/canvas/CanvasWrapper'
import { MagneticBtn }    from '@/components/ui/MagneticBtn'
import { staggerContainer, fadeUp, fadeIn } from '@/lib/motion'

const ROLES = ['Full-Stack Dev', 'Creative Technologist', '3D Enthusiast']

export function Hero() {
  return (
    <section
      style={{ position: 'relative', height: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
    >
      {/* ── Deep space background ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse at 60% 40%, #06041a 0%, #020208 55%, #000000 100%)',
      }} />

      {/* ── Nebula colour washes ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: [
          'radial-gradient(ellipse 55% 40% at 70% 50%, rgba(80,40,160,0.18) 0%, transparent 70%)',
          'radial-gradient(ellipse 35% 50% at 20% 30%, rgba(20,60,130,0.14) 0%, transparent 65%)',
          'radial-gradient(ellipse 25% 30% at 80% 75%, rgba(250,204,21,0.07) 0%, transparent 60%)',
        ].join(', '),
      }} />

      {/* ── 3D Canvas ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <CanvasWrapper />
      </div>

      {/* ── Scanline overlay — classic sci-fi CRT feel ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
      }} />

      {/* ── Bottom fade to page ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '45%',
        background: 'linear-gradient(to bottom, transparent, #000000)',
        zIndex: 3, pointerEvents: 'none',
      }} />

      {/* ── Text content ── */}
      <div className="container-wide" style={{ position: 'relative', zIndex: 4 }}>
        <motion.div variants={staggerContainer} initial="hidden" animate="show">

          {/* Coordinates label — space vibe */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xs)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'var(--clr-yellow)',
              marginBottom:  '1.75rem',
              display:       'flex',
              alignItems:    'center',
              gap:           '0.75rem',
            }}
          >
            {/* Blinking dot */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse', ease: [1, 0, 1, 0] }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--clr-yellow)', display: 'inline-block', flexShrink: 0 }}
            />
            SYS:ONLINE · SECTOR 7 · 2025
          </motion.p>

          {/* Main headline */}
          <motion.div variants={fadeUp}>
            {/* Line 1 */}
            <div style={{ overflow: 'hidden', marginBottom: '0.05em' }}>
              <motion.h1
                className="text-hero"
                style={{ color: 'var(--clr-text)', display: 'block' }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0,0,0.2,1] }}
              >
                Building things
              </motion.h1>
            </div>

            {/* Line 2 — outlined with yellow stroke + subtle glow */}
            <div style={{ overflow: 'hidden', marginBottom: '1.2rem', position: 'relative' }}>
              <motion.h1
                className="text-hero"
                style={{
                  display:          'block',
                  WebkitTextStroke: '1.5px var(--clr-yellow)',
                  color:            'transparent',
                  filter:           'drop-shadow(0 0 20px rgba(250,204,21,0.35))',
                }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0,0,0.2,1] }}
              >
                that matter.
              </motion.h1>
            </div>
          </motion.div>

          {/* Divider line — sci-fi horizontal bar */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0,0,0.2,1] }}
            style={{
              height:      1,
              width:       180,
              background:  'linear-gradient(to right, var(--clr-yellow), transparent)',
              marginBottom:'1.5rem',
            }}
          />

          {/* Role tags */}
          <motion.div
            variants={fadeUp}
            style={{ marginBottom: '2.75rem', display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            {ROLES.map((role, i) => (
              <span
                key={role}
                style={{
                  fontSize:      'var(--text-sm)',
                  fontFamily:    'var(--font-mono)',
                  color:         i === 0 ? 'var(--clr-yellow)' : 'var(--clr-grey-500)',
                  letterSpacing: '0.06em',
                }}
              >
                {i !== 0 && <span style={{ marginRight: '1.25rem', opacity: 0.25 }}>—</span>}
                {role}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={fadeIn} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <MagneticBtn
              href="/work"
              style={{
                background:    'var(--clr-yellow)',
                color:         'var(--clr-black)',
                padding:       '0.9rem 2.1rem',
                borderRadius:  '4px',
                fontWeight:    700,
                fontSize:      'var(--text-sm)',
                letterSpacing: '0.06em',
                textDecoration:'none',
                display:       'inline-block',
                textTransform: 'uppercase',
                boxShadow:     '0 0 24px rgba(250,204,21,0.35)',
              }}
            >
              View Work →
            </MagneticBtn>

            <MagneticBtn
              href="/contact"
              style={{
                background:    'transparent',
                color:         'var(--clr-grey-400)',
                padding:       '0.9rem 2.1rem',
                borderRadius:  '4px',
                fontWeight:    500,
                fontSize:      'var(--text-sm)',
                letterSpacing: '0.06em',
                textDecoration:'none',
                display:       'inline-block',
                textTransform: 'uppercase',
                border:        '1px solid var(--clr-grey-800)',
              }}
            >
              Get in Touch
            </MagneticBtn>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span className="text-label" style={{ fontSize: 10 }}>scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--clr-yellow), transparent)' }}
        />
      </motion.div>
    </section>
  )
}