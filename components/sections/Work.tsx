'use client'
import Link               from 'next/link'
import { motion }         from 'framer-motion'
import { ProjectCard }    from '@/components/ui/ProjectCard'
import { SectionReveal }  from '@/components/ui/SectionReveal'
import { projects, featuredProjects } from '@/lib/projects'
import { staggerContainer, fadeUp } from '@/lib/motion'

interface Props {
  showAll?: boolean
}

export function Work({ showAll }: Props) {
  const list = showAll ? projects : featuredProjects

  return (
    <section id="work" className="section">
      <div className="container-wide">
        {/* Header */}
        <SectionReveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(2rem,5vw,4rem)', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="text-label mb-3">Selected work</p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem,5vw,4rem)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.04em',
                  color: 'var(--clr-text)',
                }}
              >
                Projects
              </h2>
            </div>

            {!showAll && (
              <Link
                href="/work"
                style={{
                  color: 'var(--clr-yellow)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--clr-yellow)',
                  paddingBottom: 2,
                }}
              >
                View all →
              </Link>
            )}
          </div>
        </SectionReveal>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {list.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}