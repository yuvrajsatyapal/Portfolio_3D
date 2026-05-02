'use client'
import { Suspense, ReactNode } from 'react'
import { Html, useProgress } from '@react-three/drei'

/** Shown while a 3D model / texture loads inside the Canvas */
function CanvasLoader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ textAlign: 'center', color: '#FACC15', fontFamily: 'monospace', fontSize: 14 }}>
        <div style={{
          width: 160, height: 2, background: '#262626',
          borderRadius: 1, overflow: 'hidden', marginBottom: 8,
        }}>
          <div style={{
            width: `${progress}%`, height: '100%',
            background: '#FACC15', borderRadius: 1,
            transition: 'width 0.2s ease',
          }} />
        </div>
        {Math.round(progress)}%
      </div>
    </Html>
  )
}

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

/** Drop this around any R3F component that async-loads assets */
export function Suspense3D({ children, fallback }: Props) {
  return (
    <Suspense fallback={fallback ?? <CanvasLoader />}>
      {children}
    </Suspense>
  )
}