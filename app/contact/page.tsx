import type { Metadata } from 'next'
import { Contact } from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch — I am open to freelance, full-time, and collaboration.',
}

export default function ContactPage() {
  return (
    <div className="pt-24">
      <Contact standalone />
    </div>
  )
}