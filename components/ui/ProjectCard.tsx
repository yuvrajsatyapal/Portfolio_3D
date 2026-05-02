'use client'
import Link               from 'next/link'
import { motion }         from 'framer-motion'
import { Project }        from '@/types/project'
import { fadeUp }         from '@/lib/motion'

interface Props {
  project: Project
  index:   number
}

export function ProjectCard({ project, index }: Props) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/work/${project.slug}`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <motion.article
          initial="rest"
          whileHover="hover"
          style={{
            background:   'var(--clr-grey-900)',
            border:       '1px solid var(--clr-grey-800)',
            borderRadius: 'var(--radius-xl)',
            overflow:     'hidden',
            cursor:       'none',
            height:       '100%',
          }}
          variants={{
            rest:  { y: 0,  borderColor: 'var(--clr-grey-800)', transition: { duration: 0.3 } },
            hover: { y: -6, borderColor: project.color ?? 'var(--clr-yellow)', transition: { duration: 0.3 } },
          }}
        >
          {/* Colour swatch header */}
          <div
            style={{
              height:     200,
              background: `linear-gradient(135deg, ${project.color ?? '#FACC15'}22, ${project.color ?? '#FACC15'}08)`,
              display:    'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid var(--clr-grey-800)',
              position:   'relative',
              overflow:   'hidden',
            }}
          >
            {/* Year badge */}
            <span
              style={{
                position:    'absolute',
                top:         '1rem',
                right:       '1rem',
                fontFamily:  'var(--font-mono)',
                fontSize:    'var(--text-xs)',
                color:       'var(--clr-text-muted)',
                letterSpacing: '0.08em',
              }}
            >
              {project.year}
            </span>

            {/* Big index number as decoration */}
            <span
              style={{
                fontFamily:   'var(--font-display)',
                fontSize:     '7rem',
                fontWeight:   800,
                color:        project.color ?? '#FACC15',
                opacity:      0.08,
                lineHeight:   1,
                userSelect:   'none',
                letterSpacing: '-0.06em',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: '1.5rem' }}>
            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {project.tags.slice(0, 3).map(tag => (
                <span key={tag.label} className="tag">{tag.label}</span>
              ))}
            </div>

            <h3
              style={{
                fontFamily:   'var(--font-display)',
                fontSize:     'var(--text-2xl)',
                fontWeight:   800,
                color:        'var(--clr-text)',
                letterSpacing: '-0.03em',
                lineHeight:   1.1,
                marginBottom: '0.5rem',
              }}
            >
              {project.title}
            </h3>

            <p style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              {project.subtitle}
            </p>

            {/* Arrow link */}
            <motion.span
              variants={{
                rest:  { x: 0,  color: 'var(--clr-text-muted)' },
                hover: { x: 4,  color: project.color ?? 'var(--clr-yellow)' },
              }}
              style={{
                display:    'inline-flex',
                alignItems: 'center',
                gap:        '0.375rem',
                fontFamily: 'var(--font-mono)',
                fontSize:   'var(--text-sm)',
                letterSpacing: '0.04em',
              }}
            >
              View project →
            </motion.span>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  )
}