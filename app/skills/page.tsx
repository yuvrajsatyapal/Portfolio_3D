import type { Metadata } from 'next'
import { Skills } from '@/components/sections/Skills'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Technologies and tools I work with every day.',
}

export default function SkillsPage() {
  return (
    <div className="pt-24">
      <Skills standalone />
    </div>
  )
}