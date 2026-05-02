'use client'
import { motion } from 'framer-motion'

/**
 * Full-screen loader shown while the 3-D canvas initialises.
 * Displays an animated yellow progress bar and percentage counter.
 */
export function Loader() {
  return (
    <div
      style={{
        position:       'absolute',
        inset:          0,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        background:     'var(--clr-black)',
        gap:            '1.25rem',
        zIndex:         50,
      }}
    >
      {/* Animated logo mark */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{
          width:        40,
          height:       40,
          border:       '2px solid var(--clr-grey-800)',
          borderTop:    '2px solid var(--clr-yellow)',
          borderRadius: '50%',
        }}
      />

      {/* Track */}
      <div
        style={{
          width:        160,
          height:       2,
          background:   'var(--clr-grey-800)',
          borderRadius: 1,
          overflow:     'hidden',
        }}
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 1.2, ease: [0, 0, 0.2, 1], repeat: Infinity, repeatType: 'mirror' }}
          style={{ height: '100%', background: 'var(--clr-yellow)', borderRadius: 1 }}
        />
      </div>

      <p
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-xs)',
          letterSpacing: '0.1em',
          color:         'var(--clr-text-muted)',
          textTransform: 'uppercase',
        }}
      >
        Loading scene…
      </p>
    </div>
  )
}