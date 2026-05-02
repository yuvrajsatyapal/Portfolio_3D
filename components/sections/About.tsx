'use client'
import { motion } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { staggerContainer, fadeUp } from '@/lib/motion'

// ── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '5+',  label: 'Years experience' },
  { value: '40+', label: 'Projects shipped' },
  { value: '12+', label: 'Happy clients' },
  { value: '∞',   label: 'Cups of coffee' },
]

// ── Work history data ────────────────────────────────────────────────────────
const EXPERIENCE = [
  {
    title:    'Lead Front-end Engineer',
    company:  'Propbar',
    flag:     '🇬🇧',
    location: 'United Kingdom',
    type:     'Full-Time',
    period:   'Mar 2023 – Present',
    current:  true,
    bullets: [
      'Led the front-end work from the project inception.',
      'Maintained a browser extension, widget and web application as a monorepo.',
      'Architected a highly complex real-estate map service.',
      'Implemented a sophisticated data grid of property comparables.',
    ],
  },
  {
    title:    'Senior Front-end Engineer',
    company:  'LolaDB',
    flag:     '🇺🇸',
    location: 'United States',
    type:     'Contract',
    period:   'Jun 2022 – Feb 2023',
    current:  false,
    bullets: [
      'Was solving complex problems using the latest Web Standards.',
      'Architected the product\'s front-end structure.',
      'Accomplished the development of sophisticated UI components.',
      'Developed the open-source component library.',
      'Crafted responsive marketing landing pages.',
    ],
  },
  {
    title:    'Senior Front-end Engineer',
    company:  'Casago',
    flag:     '🇺🇸',
    location: 'United States',
    type:     'Full-Time',
    period:   'Oct 2021 – Apr 2022',
    current:  false,
    bullets: [
      'Joined the new company after Nokori\'s acquisition.',
      'Helped to adapt and embed the new assets into the franchise ecosystem.',
      'Developed the ground for the new property analytics project.',
    ],
  },
  {
    title:    'Middle Front-end Engineer',
    company:  'Nokori',
    flag:     '🇺🇸',
    location: 'United States',
    type:     'Full-Time',
    period:   'Jul 2020 – Oct 2021',
    current:  false,
    bullets: [
      'Acted as a primary and sole front-end developer of the team.',
      'Was responsible for the development of the single-page application.',
      'Worked on responsive static marketing pages.',
      'Managed the migration from Vue 2 codebase to Vue 3 and Composition API.',
    ],
  },
  {
    title:    'Front-end Developer',
    company:  'Freelance Platforms',
    flag:     '🌐',
    location: 'Worldwide',
    type:     'Freelance',
    period:   'Jan 2015 – Jul 2020',
    current:  false,
    bullets: [
      'Kick-started my developing career as a PSD-to-HTML developer.',
      'Helped dozens of clients around the world to build and deploy their websites.',
      'Worked hard to meet client deadlines.',
      'Matured as a self-taught front-end engineer.',
    ],
  },
]

interface Props { standalone?: boolean }

export function About({ standalone }: Props) {
  return (
    <>
      {/* ── Bio + Stats block ──────────────────────────────────────────── */}
      <section
        id="about"
        className="section"
        style={{ background: standalone ? 'var(--clr-black)' : 'transparent' }}
      >
        <div className="container-wide">
          <SectionReveal>
            <p className="text-label mb-12">About me</p>
          </SectionReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(3rem, 6vw, 6rem)',
              alignItems: 'center',
            }}
          >
            {/* Left — bio text */}
            <SectionReveal>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.h2
                  variants={fadeUp}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem,5vw,3.5rem)',
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: '-0.04em',
                    color: 'var(--clr-text)',
                    marginBottom: '1.5rem',
                  }}
                >
                  I design &amp; build{' '}
                  <span style={{ color: 'var(--clr-yellow)' }}>digital experiences</span>{' '}
                  that live at the intersection of code and craft.
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  style={{ color: 'var(--clr-text-muted)', lineHeight: 1.85, marginBottom: '1.25rem' }}
                >
                  I'm a full-stack developer with a deep love for creative technology. I've spent
                  the last 5 years working across product startups and design studios, shipping
                  everything from high-traffic SaaS platforms to interactive WebGL experiences.
                </motion.p>

                <motion.p
                  variants={fadeUp}
                  style={{ color: 'var(--clr-text-muted)', lineHeight: 1.85, marginBottom: '2rem' }}
                >
                  When I'm not coding, I'm exploring generative art, contributing to open-source,
                  or tinkering with 3D tools. I believe great software should feel as good as it looks.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
                >
                  {['React', 'Three.js', 'Node.js', 'TypeScript', 'Figma'].map(skill => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </motion.div>
              </motion.div>
            </SectionReveal>

            {/* Right — stats grid */}
            <SectionReveal delay={0.2}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ borderColor: 'var(--clr-yellow)' }}
                    style={{
                      padding: '1.5rem',
                      border: '1px solid var(--clr-grey-800)',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--clr-grey-900)',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2rem,4vw,3rem)',
                      fontWeight: 800,
                      color: 'var(--clr-yellow)',
                      lineHeight: 1,
                      marginBottom: '0.5rem',
                    }}>
                      {stat.value}
                    </p>
                    <p style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--text-sm)' }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Download CV */}
              <a
                href="/cv.pdf"
                download
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '2rem',
                  padding: '0.75rem 1.5rem',
                  border: '1px solid var(--clr-grey-700)',
                  borderRadius: '9999px',
                  color: 'var(--clr-text-muted)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-yellow)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--clr-yellow)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-grey-700)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--clr-text-muted)'
                }}
              >
                ↓ Download CV
              </a>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Experience / Work History ───────────────────────────────────── */}
      <section id="experience" className="section" style={{ paddingTop: 0 }}>
        <div className="container-wide">
          {/* Header */}
          <SectionReveal>
            <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <p className="text-label mb-3">Career</p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem,5vw,4rem)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.04em',
                  color: 'var(--clr-text)',
                  marginBottom: '0.75rem',
                }}
              >
                Experience
              </h2>
              <p style={{ color: 'var(--clr-text-muted)', maxWidth: 520, lineHeight: 1.75 }}>
                Below you will find a summary of my past employment experience.
                Additionally, if you require, you can{' '}
                <a
                  href="/cv.pdf"
                  download
                  style={{
                    color: 'var(--clr-yellow)',
                    textDecoration: 'underline',
                    textUnderlineOffset: 4,
                    textDecorationColor: 'rgba(250,204,21,0.4)',
                    fontWeight: 500,
                  }}
                >
                  download my resume
                </a>
                .
              </p>
            </div>
          </SectionReveal>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                top: 8,
                bottom: 8,
                left: 11,
                width: 1,
                background: 'linear-gradient(to bottom, var(--clr-yellow), var(--clr-grey-800) 80%, transparent)',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {EXPERIENCE.map((job, index) => (
                <SectionReveal key={job.company + job.period} delay={index * 0.08}>
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.07, ease: [0, 0, 0.2, 1] }}
                    style={{ display: 'flex', gap: '1.75rem', paddingLeft: 4 }}
                  >
                    {/* Timeline dot */}
                    <div style={{ flexShrink: 0, paddingTop: 4 }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.07 + 0.15, type: 'spring', stiffness: 300 }}
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: job.current ? 'var(--clr-yellow)' : 'var(--clr-grey-900)',
                          border: `2px solid ${job.current ? 'var(--clr-yellow)' : 'var(--clr-grey-700)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: job.current ? '0 0 14px rgba(250,204,21,0.45)' : 'none',
                        }}
                      >
                        {job.current && (
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--clr-black)' }} />
                        )}
                      </motion.div>
                    </div>

                    {/* Content card */}
                    <motion.div
                      whileHover={{ borderColor: job.current ? 'var(--clr-yellow)' : 'var(--clr-grey-700)' }}
                      style={{
                        flex: 1,
                        background: 'var(--clr-grey-900)',
                        border: `1px solid ${job.current ? 'rgba(250,204,21,0.25)' : 'var(--clr-grey-800)'}`,
                        borderRadius: 'var(--radius-lg)',
                        padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                        transition: 'border-color 0.3s',
                      }}
                    >
                      {/* Job title */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-xl)',
                            fontWeight: 700,
                            color: 'var(--clr-text)',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {job.title}
                        </h3>
                        {job.current && (
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 'var(--text-xs)',
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              background: 'rgba(250,204,21,0.12)',
                              color: 'var(--clr-yellow)',
                              border: '1px solid rgba(250,204,21,0.3)',
                              borderRadius: '9999px',
                              padding: '0.2em 0.75em',
                              flexShrink: 0,
                            }}
                          >
                            Current
                          </span>
                        )}
                      </div>

                      {/* Company + meta row */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          flexWrap: 'wrap',
                          marginBottom: '0.375rem',
                        }}
                      >
                        <span
                          style={{
                            color: 'var(--clr-yellow)',
                            fontWeight: 500,
                            fontSize: 'var(--text-sm)',
                            borderBottom: '1px solid rgba(250,204,21,0.35)',
                            paddingBottom: 1,
                          }}
                        >
                          {job.company}
                        </span>
                        <Dot />
                        <span style={{ fontSize: 'var(--text-sm)' }}>{job.flag}</span>
                        <span style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--text-sm)' }}>
                          {job.location}
                        </span>
                        <Dot />
                        <span style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--text-sm)' }}>
                          {job.type}
                        </span>
                      </div>

                      {/* Period */}
                      <p
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--clr-grey-500)',
                          letterSpacing: '0.04em',
                          marginBottom: '1.1rem',
                        }}
                      >
                        {job.period}
                      </p>

                      {/* Divider */}
                      <div
                        style={{
                          height: 1,
                          background: 'var(--clr-grey-800)',
                          marginBottom: '1rem',
                        }}
                      />

                      {/* Bullet points */}
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {job.bullets.map((bullet, bi) => (
                          <motion.li
                            key={bi}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.07 + bi * 0.04 + 0.25, duration: 0.4 }}
                            style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}
                          >
                            <span
                              style={{
                                flexShrink: 0,
                                marginTop: '0.45em',
                                width: 5,
                                height: 5,
                                borderRadius: '50%',
                                background: job.current ? 'var(--clr-yellow)' : 'var(--clr-grey-600)',
                              }}
                            />
                            <span style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                              {bullet}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Small separator dot
function Dot() {
  return (
    <span
      style={{
        width: 3,
        height: 3,
        borderRadius: '50%',
        background: 'var(--clr-grey-600)',
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  )
}