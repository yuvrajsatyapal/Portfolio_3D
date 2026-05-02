'use client'
import { Canvas }            from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { Spaceship }         from './Spaceship'
import { HyperStars }        from './HyperStars'
import { SpaceDebris }       from './SpaceDebris'
import { SpaceEnvironment }  from './SpaceEnvironment'
import { CameraRig }         from './CameraRig'
import { PostProcessing }    from './PostProcessing'

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [0, 0.6, 5.5], fov: 58, near: 0.1, far: 200 }}
      gl={{
        antialias:       true,
        alpha:           true,
        powerPreference: 'high-performance',
        stencil:         false,
        depth:           true,
      }}
      style={{
        position: 'absolute',
        inset:    0,
        width:    '100%',
        height:   '100%',
        background: 'transparent',
      }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Deep-space lighting */}
      <SpaceEnvironment />

      {/* Star field + hyperspace streaks */}
      <HyperStars count={1600} speed={0.18} radius={90} />

      {/* Floating asteroids / debris */}
      <SpaceDebris />

      {/* The cruiser */}
      <Spaceship />

      {/* Subtle mouse-tracking camera tilt */}
      <CameraRig />

      {/* Bloom (makes engine glow pop) + vignette */}
      <PostProcessing />
    </Canvas>
  )
}