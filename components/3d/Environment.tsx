'use client'
import { Environment, Stars } from '@react-three/drei'

/**
 * Lighting setup for the hero scene.
 * Uses a preset studio environment for reflections + manual accent lights.
 */
export function SceneEnvironment() {
  return (
    <>
      {/* Environment map for reflections */}
      <Environment preset="night" />

      {/* Ambient — very dark so metals stand out */}
      <ambientLight intensity={0.15} />

      {/* Key light — warm yellow tone */}
      <pointLight
        position={[4, 4, 4]}
        intensity={2.5}
        color="#FACC15"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Fill light — cool blue counterlight */}
      <pointLight
        position={[-4, -2, -3]}
        intensity={0.8}
        color="#3b82f6"
      />

      {/* Rim light */}
      <directionalLight
        position={[0, 5, -5]}
        intensity={0.5}
        color="#ffffff"
      />

      {/* Background stars */}
      <Stars
        radius={60}
        depth={30}
        count={800}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />
    </>
  )
}