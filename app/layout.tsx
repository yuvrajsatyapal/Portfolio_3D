import type { Metadata } from 'next'
import './globals.css'
import { Navbar }         from '@/components/ui/Navbar'
import { CustomCursor }   from '@/components/ui/CustomCursor'
import { TransitionWrapper } from '@/components/ui/TransitionWrapper'

export const metadata: Metadata = {
  // Replace with your actual production URL to silence the warning
  // and make OG/Twitter image URLs resolve correctly in production.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  title:       { default: 'Portfolio', template: '%s | Portfolio' },
  description: 'Full-stack developer & creative technologist crafting digital experiences.',
  keywords:    ['developer', 'portfolio', '3D', 'Three.js', 'React'],
  openGraph: {
    type:  'website',
    title: 'Portfolio',
    description: 'Full-stack developer & creative technologist.',
    images: [{ url: '/images/og-image.png' }],
  },
  twitter: {
    card:  'summary_large_image',
    title: 'Portfolio',
    description: 'Full-stack developer & creative technologist.',
    images: ['/images/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Custom yellow-dot cursor */}
        <CustomCursor />

        {/* Sticky navigation */}
        <Navbar />

        {/* Page transitions wrapper */}
        <TransitionWrapper>
          <main>{children}</main>
        </TransitionWrapper>
      </body>
    </html>
  )
}