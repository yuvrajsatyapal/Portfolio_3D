'use client'
import dynamic    from 'next/dynamic'
import { Suspense } from 'react'
import { Loader }   from '@/components/ui/Loader'

/**
 * SSR-safe wrapper — Three.js needs browser globals so we must
 * never let it run on the server.
 *
 * The trick: point dynamic() at a file whose DEFAULT export is the
 * component. We use a tiny re-export shim (_HeroSceneExport.tsx)
 * so the named export HeroScene is never touched server-side.
 */
const HeroSceneClient = dynamic(
  () => import('./_HeroSceneExport'),
  { ssr: false, loading: () => <Loader /> },
)

export function CanvasWrapper() {
  return (
    <Suspense fallback={<Loader />}>
      <HeroSceneClient />
    </Suspense>
  )
}