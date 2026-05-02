'use client'
import { useRef, useMemo } from 'react'
import { useFrame }        from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE          from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'
import { damp, lerp }      from '@/lib/rf3-utils'

/**
 * A sci-fi cruiser assembled from Three.js primitive geometries.
 * Loosely inspired by Star Wars capital ship silhouettes.
 *
 *  Structure:
 *   – Main hull (flattened box)
 *   – Forward wedge (cone)
 *   – Port + starboard wings
 *   – Engine nacelles (cylinders with emissive glow)
 *   – Turret bumps
 *   – Bridge tower
 *   – Engine glow discs (emissive yellow)
 */
export function Spaceship() {
  const groupRef   = useRef<THREE.Group>(null)
  const mouse      = useMousePosition()

  // Smooth mouse-follow refs
  const rotX = useRef(0)
  const rotY = useRef(0)
  const posY = useRef(0)

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime

    // Gentle float
    posY.current  = Math.sin(t * 0.4) * 0.12

    // Subtle mouse tilt
    rotX.current  = damp(rotX.current, mouse.current.y * -0.18, 3, delta)
    rotY.current  = damp(rotY.current, mouse.current.x *  0.25, 3, delta)

    groupRef.current.rotation.x = rotX.current + Math.sin(t * 0.3) * 0.015
    groupRef.current.rotation.y = rotY.current + Math.sin(t * 0.2) * 0.02
    groupRef.current.rotation.z = Math.sin(t * 0.25) * 0.01
    groupRef.current.position.y = posY.current
  })

  // Shared materials
  const hullMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:          '#1a1a1a',
    roughness:      0.4,
    metalness:      0.9,
    envMapIntensity: 2,
  }), [])

  const detailMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:          '#111111',
    roughness:      0.6,
    metalness:      0.7,
    envMapIntensity: 1.5,
  }), [])

  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:          '#2a2a2a',
    roughness:      0.3,
    metalness:      1.0,
    envMapIntensity: 2.5,
  }), [])

  const engineGlowMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:         '#FACC15',
    emissive:      new THREE.Color('#FACC15'),
    emissiveIntensity: 3,
    roughness:     0,
    metalness:     0,
    transparent:   true,
    opacity:       0.92,
  }), [])

  const engineCoreMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:         '#ffffff',
    emissive:      new THREE.Color('#fffbe0'),
    emissiveIntensity: 5,
    roughness:     0,
    metalness:     0,
  }), [])

  const windowMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:         '#FACC15',
    emissive:      new THREE.Color('#FACC15'),
    emissiveIntensity: 1.5,
    roughness:     0.1,
    metalness:     0.1,
    transparent:   true,
    opacity:       0.85,
  }), [])

  return (
    <group ref={groupRef} position={[1.0, -0.1, 0]} scale={0.72}>
      {/* ─── Main hull body ──────────────────────────────── */}
      <mesh material={hullMat} castShadow>
        <boxGeometry args={[3.6, 0.28, 1.4]} />
      </mesh>

      {/* Hull underside detail panel */}
      <mesh material={detailMat} position={[0, -0.16, 0]}>
        <boxGeometry args={[3.2, 0.05, 1.1]} />
      </mesh>

      {/* Hull top ridge */}
      <mesh material={accentMat} position={[0, 0.17, 0]}>
        <boxGeometry args={[2.8, 0.06, 0.5]} />
      </mesh>

      {/* ─── Forward wedge (nose) ────────────────────────── */}
      <mesh material={hullMat} position={[2.15, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
        <coneGeometry args={[0.7, 0.95, 4, 1]} />
      </mesh>

      {/* Nose tip accent */}
      <mesh material={accentMat} position={[2.6, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.18, 0.25, 4, 1]} />
      </mesh>

      {/* ─── Port wing ───────────────────────────────────── */}
      <mesh material={hullMat} position={[0.2, -0.05, -1.35]} rotation={[0, 0.15, -0.08]} castShadow>
        <boxGeometry args={[2.4, 0.12, 0.9]} />
      </mesh>
      {/* Wing tip fin */}
      <mesh material={accentMat} position={[-0.7, -0.04, -1.88]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.9, 0.08, 0.14]} />
      </mesh>
      {/* Wing stripe detail */}
      <mesh material={accentMat} position={[0.2, -0.115, -1.35]}>
        <boxGeometry args={[1.8, 0.01, 0.06]} />
      </mesh>

      {/* ─── Starboard wing ──────────────────────────────── */}
      <mesh material={hullMat} position={[0.2, -0.05, 1.35]} rotation={[0, -0.15, -0.08]} castShadow>
        <boxGeometry args={[2.4, 0.12, 0.9]} />
      </mesh>
      {/* Wing tip fin */}
      <mesh material={accentMat} position={[-0.7, -0.04, 1.88]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.9, 0.08, 0.14]} />
      </mesh>
      {/* Wing stripe detail */}
      <mesh material={accentMat} position={[0.2, -0.115, 1.35]}>
        <boxGeometry args={[1.8, 0.01, 0.06]} />
      </mesh>

      {/* ─── Engine nacelles ─────────────────────────────── */}
      {/* Port engine */}
      <mesh material={hullMat} position={[-1.55, 0, -0.85]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.28, 1.1, 12]} />
      </mesh>
      {/* Starboard engine */}
      <mesh material={hullMat} position={[-1.55, 0, 0.85]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.28, 1.1, 12]} />
      </mesh>

      {/* Engine exhaust rings */}
      {[-0.85, 0.85].map((z, i) => (
        <group key={i} position={[-2.12, 0, z]}>
          <mesh material={accentMat}>
            <torusGeometry args={[0.24, 0.04, 8, 24]} />
          </mesh>
          {/* Inner glow disc */}
          <mesh material={engineGlowMat} rotation={[0, 0, Math.PI / 2]}>
            <circleGeometry args={[0.20, 32]} />
          </mesh>
          {/* Core white dot */}
          <mesh material={engineCoreMat} rotation={[0, 0, Math.PI / 2]} position={[0.01, 0, 0]}>
            <circleGeometry args={[0.08, 16]} />
          </mesh>
        </group>
      ))}

      {/* Engine point lights (baked into engine positions) */}
      <pointLight position={[-2.12, 0, -0.85]} color="#FACC15" intensity={2.5} distance={3} />
      <pointLight position={[-2.12, 0,  0.85]} color="#FACC15" intensity={2.5} distance={3} />

      {/* ─── Bridge tower ────────────────────────────────── */}
      <mesh material={hullMat} position={[-0.3, 0.28, 0]}>
        <boxGeometry args={[0.85, 0.28, 0.58]} />
      </mesh>
      {/* Bridge top */}
      <mesh material={accentMat} position={[-0.3, 0.44, 0]}>
        <boxGeometry args={[0.6, 0.08, 0.4]} />
      </mesh>
      {/* Bridge windows */}
      {[-0.14, 0, 0.14].map((z, i) => (
        <mesh key={i} material={windowMat} position={[0.04, 0.28, z]}>
          <boxGeometry args={[0.06, 0.06, 0.06]} />
        </mesh>
      ))}

      {/* ─── Turret bumps ────────────────────────────────── */}
      {[
        [0.9,  0.17,  0.35],
        [0.9,  0.17, -0.35],
        [-0.2, 0.17,  0.35],
        [-0.2, 0.17, -0.35],
        [0.4,  0.17,  0],
      ].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh material={accentMat}>
            <sphereGeometry args={[0.07, 8, 8]} />
          </mesh>
          <mesh material={accentMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.018, 0.18, 6]} />
          </mesh>
        </group>
      ))}

      {/* ─── Hull panel seam lines ───────────────────────── */}
      {[-0.3, 0.4, 1.0].map((x, i) => (
        <mesh key={i} material={detailMat} position={[x, 0.14, 0]}>
          <boxGeometry args={[0.01, 0.01, 1.2]} />
        </mesh>
      ))}

      {/* ─── Underside greebles ──────────────────────────── */}
      {[
        [0.8, -0.18, 0.4],
        [0.8, -0.18, -0.4],
        [0.2, -0.18, 0],
        [-0.5,-0.18, 0.3],
        [-0.5,-0.18, -0.3],
      ].map(([x, y, z], i) => (
        <mesh key={i} material={detailMat} position={[x, y, z]}>
          <boxGeometry args={[0.18, 0.04, 0.12]} />
        </mesh>
      ))}

      {/* ─── Small status lights ─────────────────────────── */}
      <EngineFlicker position={[2.55, 0, 0]}  color="#ff4444" />
      <EngineFlicker position={[2.55, 0, 0.05]} color="#44ff88" />
    </group>
  )
}

/* Tiny blinking status light */
function EngineFlicker({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.intensity = 0.6 + Math.sin(clock.elapsedTime * 8 + Math.random()) * 0.4
  })
  return <pointLight ref={ref} position={position} color={color} intensity={0.6} distance={0.6} />
}