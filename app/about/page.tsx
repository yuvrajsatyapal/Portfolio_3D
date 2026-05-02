import type { Metadata } from 'next'
import { About } from '@/components/sections/About'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me — my background, skills, and how I work.',
}

export default function AboutPage() {
  return (
    <div className="pt-24">
      <About standalone />
    </div>
  )
}