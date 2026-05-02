'use client'
import { Canvas }           from '@react-three/fiber'
import { OrbitControls }    from '@react-three/drei'
import { StarWarsPlanets }  from './StarWarsPlanets'
import { SpaceEnvironment } from './SpaceEnvironment'
import { HyperStars }       from './HyperStars'

export function SkillsScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 9], fov: 65 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <SpaceEnvironment />
      <HyperStars count={500} speed={0} radius={50} />
      <StarWarsPlanets />
      <OrbitControls
        enableZoom
        minDistance={5}
        maxDistance={14}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
        maxPolarAngle={Math.PI * 0.78}
        minPolarAngle={Math.PI * 0.22}
      />
    </Canvas>
  )
}