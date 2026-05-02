'use client'
import { useRef }   from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE   from 'three'

/**
 * Deep-space lighting that makes the ship look cinematic:
 *  – Hard blue-white key light from above-left (like a distant sun)
 *  – Soft yellow fill from the engine side (simulating own engine glow)
 *  – A dim blue-purple backlight for silhouette separation
 *  – Near-zero ambient so shadows are pitch black
 *
 * Replace SceneEnvironment with SpaceEnvironment in HeroScene.
 */
export function SpaceEnvironment() {
  const yellowRef = useRef<THREE.PointLight>(null)

  // Very subtle engine glow flicker
  useFrame(({ clock }) => {
    if (!yellowRef.current) return
    yellowRef.current.intensity = 1.4 + Math.sin(clock.elapsedTime * 3.1) * 0.15
  })

  return (
    <>
      {/* Almost no ambient — space is dark */}
      <ambientLight intensity={0.04} />

      {/* Distant sun — hard, blue-white, from top-left */}
      <directionalLight
        position={[-6, 8, 4]}
        intensity={4.5}
        color="#d0e8ff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={40}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Engine glow fill — yellow, from behind-right */}
      <pointLight
        ref={yellowRef}
        position={[-3.5, 0, 0]}
        intensity={1.4}
        color="#FACC15"
        distance={10}
        decay={2}
      />

      {/* Rim / backlight — cold blue-purple */}
      <directionalLight
        position={[5, -2, -6]}
        intensity={0.9}
        color="#6b8cff"
      />

      {/* Subtle fill from below — prevents total black on underside */}
      <pointLight
        position={[0, -5, 3]}
        intensity={0.3}
        color="#223366"
        distance={12}
      />

      {/* Space nebula colour wash — very subtle */}
      <hemisphereLight
        args={['#08052b', '#000000', 0.15]}
      />
    </>
  )
}