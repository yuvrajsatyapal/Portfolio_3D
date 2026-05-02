import { Skill } from '@/types/project'

export const skills: Skill[] = [
  // Frontend
  { name: 'React',       level: 95, category: 'frontend', color: '#61DAFB' },
  { name: 'TypeScript',  level: 90, category: 'frontend', color: '#3178C6' },
  { name: 'Next.js',     level: 90, category: 'frontend', color: '#FACC15' },
  { name: 'Three.js',    level: 82, category: 'frontend', color: '#ffffff' },
  { name: 'CSS / Sass',  level: 88, category: 'frontend', color: '#CC6699' },
  { name: 'WebGL / GLSL',level: 70, category: 'frontend', color: '#990000' },
  // Backend
  { name: 'Node.js',     level: 85, category: 'backend',  color: '#83CD29' },
  { name: 'Python',      level: 78, category: 'backend',  color: '#FFD845' },
  { name: 'PostgreSQL',  level: 75, category: 'backend',  color: '#336791' },
  { name: 'GraphQL',     level: 80, category: 'backend',  color: '#E535AB' },
  { name: 'Redis',       level: 65, category: 'backend',  color: '#D82C20' },
  // Design
  { name: 'Figma',       level: 85, category: 'design',   color: '#F24E1E' },
  { name: 'Framer',      level: 72, category: 'design',   color: '#0055FF' },
  { name: 'Motion Design',level: 68,category: 'design',   color: '#FF6B35' },
  // Tools
  { name: 'Docker',      level: 72, category: 'tools',    color: '#2496ED' },
  { name: 'Git',         level: 90, category: 'tools',    color: '#F1502F' },
  { name: 'AWS',         level: 65, category: 'tools',    color: '#FF9900' },
  { name: 'Vercel',      level: 88, category: 'tools',    color: '#ffffff' },
]

export const skillsByCategory = {
  frontend: skills.filter(s => s.category === 'frontend'),
  backend:  skills.filter(s => s.category === 'backend'),
  design:   skills.filter(s => s.category === 'design'),
  tools:    skills.filter(s => s.category === 'tools'),
}