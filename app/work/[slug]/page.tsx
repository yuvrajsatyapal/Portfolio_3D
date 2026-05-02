import { notFound }    from 'next/navigation'
import type { Metadata } from 'next'
import Link              from 'next/link'
import { getProject, projects } from '@/lib/projects'
import { SectionReveal } from '@/components/ui/SectionReveal'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject(params.slug)
  if (!project) return {}
  return { title: project.title, description: project.subtitle }
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug)
  if (!project) notFound()

  return (
    <div className="pt-32 pb-24 container-wide">
      {/* Back link */}
      <SectionReveal>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-label mb-12 hover:text-yellow transition-colors"
          style={{ color: 'var(--clr-text-muted)' }}
        >
          <span>←</span> All Projects
        </Link>
      </SectionReveal>

      {/* Header */}
      <SectionReveal delay={0.1}>
        <div className="mb-2">
          <span className="text-label">{project.year}</span>
        </div>
        <h1
          style={{
            fontSize: 'clamp(2.5rem,8vw,6rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: project.color ?? 'var(--clr-yellow)',
            marginBottom: '1rem',
          }}
        >
          {project.title}
        </h1>
        <p style={{ fontSize: 'var(--text-xl)', color: 'var(--clr-text-muted)' }}>
          {project.subtitle}
        </p>
      </SectionReveal>

      <div className="divider my-12" />

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Description */}
        <SectionReveal delay={0.2} className="lg:col-span-2">
          <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, color: 'var(--clr-text-muted)' }}>
            {project.description}
          </p>

          {/* Links */}
          <div className="flex gap-4 mt-10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all"
                style={{ background: 'var(--clr-yellow)', color: 'var(--clr-black)' }}
              >
                Live Site ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm border transition-all hover:border-yellow-400"
                style={{ borderColor: 'var(--clr-grey-700)', color: 'var(--clr-text-muted)' }}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </SectionReveal>

        {/* Sidebar */}
        <SectionReveal delay={0.3}>
          <div style={{ background: 'var(--clr-grey-900)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--clr-text-muted)', marginBottom: '1rem' }}>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag.label} className="tag">{tag.label}</span>
              ))}
            </div>

            <div className="divider my-6" />

            <h3 style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--clr-text-muted)', marginBottom: '0.5rem' }}>
              Year
            </h3>
            <p style={{ color: 'var(--clr-text)' }}>{project.year}</p>
          </div>
        </SectionReveal>
      </div>
    </div>
  )
}