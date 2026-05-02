'use client'
import { useRef, useMemo } from 'react'
import { useFrame }        from '@react-three/fiber'
import * as THREE          from 'three'

interface Props {
  count?:  number
  speed?:  number   // 0 = static stars, 1 = full hyperspace streaks
  radius?: number
}

/**
 * Two-layer star field:
 *  1. Static distant stars  (small dots, slowly drifting)
 *  2. Hyperspace streaks    (elongated lines flying past the camera)
 *
 * Set speed > 0.3 to trigger the hyperspace look.
 */
export function HyperStars({ count = 1400, speed = 0.18, radius = 80 }: Props) {
  return (
    <>
      <StaticStars  count={count} radius={radius} />
      <StreakStars   count={Math.floor(count * 0.25)} speed={speed} />
    </>
  )
}

/* ── Static star field ────────────────────────────────────── */
function StaticStars({ count, radius }: { count: number; radius: number }) {
  const ref = useRef<THREE.Points>(null)

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)
    const sizes     = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Distribute on sphere surface
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = radius * (0.4 + Math.random() * 0.6)

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      sizes[i] = Math.random()

      const isYellow = Math.random() > 0.92
      if (isYellow) {
        colors[i * 3] = 0.98; colors[i * 3 + 1] = 0.80; colors[i * 3 + 2] = 0.08
      } else {
        const b = 0.5 + Math.random() * 0.5
        colors[i * 3] = b; colors[i * 3 + 1] = b; colors[i * 3 + 2] = b + 0.1
      }
    }

    return { positions, colors, sizes }
  }, [count, radius])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.006
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.003) * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.22}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  )
}

/* ── Hyperspace streak lines ──────────────────────────────── */
function StreakStars({ count, speed }: { count: number; speed: number }) {
  const ref = useRef<THREE.LineSegments>(null)

  // Each streak = 2 vertices (start, end) along Z axis
  const { positions, velocities } = useMemo(() => {
    const positions  = new Float32Array(count * 6) // 2 pts × 3 floats
    const velocities = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      resetStreak(positions, i, true)
      velocities[i] = 0.4 + Math.random() * 0.8
    }

    return { positions, velocities }
  }, [count])

  useFrame((_, delta) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array
    const moveAmount = delta * speed * 60

    for (let i = 0; i < count; i++) {
      const base = i * 6
      // Move both endpoints toward camera (−z direction → toward viewer)
      arr[base + 2] += velocities[i] * moveAmount
      arr[base + 5] += velocities[i] * moveAmount

      // Recycle star that has passed camera
      if (arr[base + 5] > 6) {
        resetStreak(arr, i, false)
      }
    }

    pos.needsUpdate = true
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial
        color="#FACC15"
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </lineSegments>
  )
}

function resetStreak(arr: Float32Array, i: number, randomZ = false) {
  const base   = i * 6
  const spread = 30
  const x      = (Math.random() - 0.5) * spread
  const y      = (Math.random() - 0.5) * spread
  const zStart = randomZ ? -60 + Math.random() * 66 : -60
  const length = 0.08 + Math.random() * 0.35          // streak length

  // Start point
  arr[base]     = x
  arr[base + 1] = y
  arr[base + 2] = zStart
  // End point (slightly ahead = shorter streak when far, longer when close)
  arr[base + 3] = x
  arr[base + 4] = y
  arr[base + 5] = zStart + length
}