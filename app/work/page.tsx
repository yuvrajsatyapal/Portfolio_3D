import type { Metadata } from 'next'
import { Work } from '@/components/sections/Work'

export const metadata: Metadata = {
  title: 'Work',
  description: 'A selection of projects I have built — apps, tools, and experiments.',
}

export default function WorkPage() {
  return (
    <div className="pt-24">
      <Work showAll />
    </div>
  )
}