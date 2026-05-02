'use client'
import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionReveal }  from '@/components/ui/SectionReveal'
import { Button }         from '@/components/ui/Button'
import { staggerContainer, fadeUp } from '@/lib/motion'

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com',   handle: '@yourhandle' },
  { label: 'LinkedIn', href: 'https://linkedin.com',  handle: 'Your Name' },
  { label: 'LeetCode', href: 'https://leetcode.com/yourhandle', handle: '@yourhandle' },
  { label: 'Email',    href: 'mailto:hello@you.dev',  handle: 'hello@you.dev' },
]

type Status = 'idle' | 'sending' | 'success' | 'error'

interface Props { standalone?: boolean }

export function Contact({ standalone }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Replace with your own form submission logic (Formspree, Resend, etc.)
    await new Promise(r => setTimeout(r, 1200))
    setStatus('success')
  }

  return (
    <section id="contact" className="section">
      <div className="container-wide">
        <SectionReveal>
          <p className="text-label mb-3">Let's talk</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,6vw,5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.04em', color: 'var(--clr-text)', marginBottom: '0.5rem' }}>
            Start a <span style={{ color: 'var(--clr-yellow)' }}>project</span>
          </h2>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,6vw,5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.04em', color: 'var(--clr-text)', marginBottom: 'clamp(2rem,5vw,4rem)' }}>
            together.
          </h2>
        </SectionReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          {/* Form */}
          <SectionReveal>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ padding: '3rem', border: '1px solid var(--clr-yellow)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}
                >
                  <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--clr-yellow)', marginBottom: '0.5rem' }}>Sent!</h3>
                  <p style={{ color: 'var(--clr-text-muted)' }}>I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                >
                  {(['name', 'email', 'message'] as const).map(field => (
                    <div key={field}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--clr-text-muted)', marginBottom: '0.5rem' }}>
                        {field}
                      </label>
                      {field === 'message' ? (
                        <textarea
                          rows={5}
                          required
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          style={inputStyle}
                          placeholder="Tell me about your project…"
                        />
                      ) : (
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          required
                          value={form[field]}
                          onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                          style={inputStyle}
                          placeholder={field === 'email' ? 'you@example.com' : 'Your name'}
                        />
                      )}
                    </div>
                  ))}

                  <Button type="submit" loading={status === 'sending'} fullWidth>
                    {status === 'sending' ? 'Sending…' : 'Send Message →'}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </SectionReveal>

          {/* Socials */}
          <SectionReveal delay={0.2}>
            <p style={{ color: 'var(--clr-text-muted)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Prefer a direct line? Reach out on any of these platforms — I'm always up for interesting conversations about technology, design, or new projects.
            </p>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {SOCIALS.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.25rem 0',
                    borderBottom: '1px solid var(--clr-grey-800)',
                    textDecoration: 'none',
                    color: 'var(--clr-text)',
                    transition: 'color 0.2s',
                  }}
                  whileHover={{ x: 4 }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--clr-yellow)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--clr-text)')}
                >
                  <span style={{ fontWeight: 500 }}>{s.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'inherit', opacity: 0.7 }}>{s.handle} ↗</span>
                </motion.a>
              ))}
            </motion.div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--clr-grey-900)',
  border: '1px solid var(--clr-grey-800)',
  borderRadius: 'var(--radius-md)',
  padding: '0.875rem 1rem',
  color: 'var(--clr-text)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-base)',
  outline: 'none',
  resize: 'vertical',
  transition: 'border-color 0.2s',
}