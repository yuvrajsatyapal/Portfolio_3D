'use client'
import { useRef, useMemo } from 'react'
import { useFrame }        from '@react-three/fiber'
import { MeshDistortMaterial, Torus, Octahedron, Box } from '@react-three/drei'
import * as THREE          from 'three'
import { randomBetween }   from '@/lib/rf3-utils'

interface ShapeConfig {
  id: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speedX: number
  speedY: number
  speedZ: number
  color: string
}

const YELLOW = '#FACC15'
const GREY_LIGHT = '#737373'
const GREY_DARK  = '#262626'

export function FloatingGeometry() {
  const shapes: ShapeConfig[] = useMemo(() => [
    {
      id: 'torus-1',
      position: [2.2, 0.8, -1],
      rotation: [0.4, 0.2, 0],
      scale: 0.7,
      speedX: 0.003, speedY: 0.004, speedZ: 0.002,
      color: YELLOW,
    },
    {
      id: 'octa-1',
      position: [-2.5, -0.5, -0.5],
      rotation: [0, 0, 0.3],
      scale: 0.5,
      speedX: 0.005, speedY: 0.003, speedZ: 0.004,
      color: GREY_LIGHT,
    },
    {
      id: 'box-1',
      position: [0.8, -1.8, -1.2],
      rotation: [0.3, 0.5, 0.1],
      scale: 0.4,
      speedX: 0.004, speedY: 0.006, speedZ: 0.002,
      color: GREY_DARK,
    },
    {
      id: 'torus-2',
      position: [-1.8, 1.5, -2],
      rotation: [1.2, 0.3, 0],
      scale: 0.45,
      speedX: 0.002, speedY: 0.005, speedZ: 0.003,
      color: GREY_LIGHT,
    },
    {
      id: 'octa-2',
      position: [1.5, -1.2, 0.5],
      rotation: [0.5, 0.1, 0.8],
      scale: 0.3,
      speedX: 0.006, speedY: 0.002, speedZ: 0.005,
      color: YELLOW,
    },
  ], [])

  return (
    <group>
      {shapes.map(shape => (
        <FloatingShape key={shape.id} config={shape} />
      ))}
    </group>
  )
}

function FloatingShape({ config }: { config: ShapeConfig }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { position, rotation, scale, speedX, speedY, speedZ, color } = config

  // Unique per-shape float offset
  const offset = useMemo(() => randomBetween(0, Math.PI * 2), [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime + offset
    meshRef.current.rotation.x += speedX
    meshRef.current.rotation.y += speedY
    meshRef.current.rotation.z += speedZ
    // Gentle floating
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15
    meshRef.current.position.x = position[0] + Math.sin(t * 0.6) * 0.08
  })

  const isYellow = color === YELLOW

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} castShadow>
      {/* Alternate geometry based on id pattern */}
      {config.id.startsWith('torus') ? (
        <torusGeometry args={[1, 0.35, 32, 64]} />
      ) : config.id.startsWith('octa') ? (
        <octahedronGeometry args={[1, 0]} />
      ) : (
        <boxGeometry args={[1.4, 1.4, 1.4]} />
      )}

      {isYellow ? (
        // Yellow shapes get a distort material for organic feel
        <MeshDistortMaterial
          color={color}
          speed={1.5}
          distort={0.15}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      ) : (
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.7}
          envMapIntensity={0.8}
          transparent
          opacity={0.8}
        />
      )}
    </mesh>
  )
}