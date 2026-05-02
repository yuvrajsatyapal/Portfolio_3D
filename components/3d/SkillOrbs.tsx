'use client'
import { useRef, useState, useMemo } from 'react'
import { useFrame, ThreeEvent }       from '@react-three/fiber'
import { Html, Sphere }               from '@react-three/drei'
import * as THREE                     from 'three'
import { skills }                     from '@/lib/skills'
import { lerp }                       from '@/lib/rf3-utils'

// Lay orbs out on a sphere surface using Fibonacci spiral
function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const points: [number, number, number][] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    points.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius])
  }
  return points
}

export function SkillOrbs() {
  const groupRef  = useRef<THREE.Group>(null)
  const positions = useMemo(() => fibonacciSphere(skills.length, 2.6), [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.elapsedTime * 0.08
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillOrb
          key={skill.name}
          skill={skill}
          position={positions[i]}
        />
      ))}
    </group>
  )
}

interface OrbProps {
  skill: typeof skills[0]
  position: [number, number, number]
}

function SkillOrb({ skill, position }: OrbProps) {
  const meshRef   = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const targetScale = useRef(1)

  const color = useMemo(() => new THREE.Color(skill.color), [skill.color])

  useFrame(() => {
    if (!meshRef.current) return
    const target = hovered ? 1.4 : 1
    targetScale.current = lerp(targetScale.current, target, 0.1)
    meshRef.current.scale.setScalar(targetScale.current * (0.15 + (skill.level / 100) * 0.15))
  })

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[1, 32, 32]}
        onPointerEnter={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHovered(true);  document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'none' }}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.15}
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={1.5}
        />
      </Sphere>

      {/* Label shown on hover */}
      {hovered && (
        <Html center distanceFactor={6} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(10,10,10,0.9)',
            border: '1px solid #FACC15',
            color: '#FACC15',
            padding: '4px 10px',
            borderRadius: 4,
            fontFamily: 'monospace',
            fontSize: 11,
            whiteSpace: 'nowrap',
            letterSpacing: '0.08em',
          }}>
            {skill.name} — {skill.level}%
          </div>
        </Html>
      )}
    </group>
  )
}