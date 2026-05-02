'use client'
import dynamic             from 'next/dynamic'
import { Suspense }        from 'react'
import { motion }          from 'framer-motion'
import { SectionReveal }   from '@/components/ui/SectionReveal'
import { skills, skillsByCategory } from '@/lib/skills'
import { staggerContainer, fadeUp } from '@/lib/motion'

// Load the planets scene client-side only (SSR-safe shim pattern)
const SkillsScene = dynamic(
  () => import('@/components/3d/_SkillsSceneExport'),
  { ssr: false, loading: () => <div style={{ height: 400, background: 'var(--clr-grey-900)', borderRadius: 'var(--radius-xl)' }} /> }
)

interface Props { standalone?: boolean }

export function Skills({ standalone }: Props) {
  return (
    <section id="skills" className="section">
      <div className="container-wide">
        <SectionReveal>
          <p className="text-label mb-3">What I work with</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.04em', color: 'var(--clr-text)', marginBottom: 'clamp(2rem,5vw,4rem)' }}>
            Skills
          </h2>
        </SectionReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          {/* Skill bars */}
          <div>
            {Object.entries(skillsByCategory).map(([category, catSkills]) => (
              <SectionReveal key={category}>
                <div style={{ marginBottom: '2.5rem' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--clr-yellow)', marginBottom: '1rem' }}>
                    {category}
                  </p>
                  <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    {catSkills.map(skill => (
                      <motion.div key={skill.name} variants={fadeUp} style={{ marginBottom: '0.875rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--clr-text)' }}>{skill.name}</span>
                          <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--clr-text-muted)' }}>{skill.level}%</span>
                        </div>
                        <div style={{ height: 3, background: 'var(--clr-grey-800)', borderRadius: 2, overflow: 'hidden' }}>
                          <motion.div
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0,0,0.2,1], delay: 0.2 }}
                            style={{ height: '100%', width: `${skill.level}%`, background: skill.color, borderRadius: 2 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* 3D Orbs */}
          <SectionReveal delay={0.3}>
            <div style={{ height: 560, borderRadius: 'var(--radius-xl)', overflow: 'hidden', position: 'relative', border: '1px solid var(--clr-grey-800)' }}>
              <Suspense fallback={null}>
                <SkillsScene />
              </Suspense>
              <p style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--clr-text-muted)', letterSpacing: '0.08em' }}>
                hover planets · drag to rotate · scroll to zoom
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}