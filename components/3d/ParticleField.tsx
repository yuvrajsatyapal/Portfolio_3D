'use client'
import { useRef, useMemo }    from 'react'
import { useFrame }           from '@react-three/fiber'
import * as THREE             from 'three'
import { randomSpherePositions } from '@/lib/rf3-utils'

interface Props {
  count?: number
  radius?: number
}

export function ParticleField({ count = 1200, radius = 6 }: Props) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = randomSpherePositions(count, radius)
    const colors    = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const isYellow = Math.random() > 0.85  // 15% yellow, rest grey
      if (isYellow) {
        // Yellow
        colors[i * 3]     = 0.98
        colors[i * 3 + 1] = 0.80
        colors[i * 3 + 2] = 0.08
      } else {
        // Grey – varying brightness
        const grey = 0.15 + Math.random() * 0.25
        colors[i * 3]     = grey
        colors[i * 3 + 1] = grey
        colors[i * 3 + 2] = grey
      }
    }

    return { positions, colors }
  }, [count, radius])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    // Slow drift rotation
    pointsRef.current.rotation.y = clock.elapsedTime * 0.04
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.02) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  )
}