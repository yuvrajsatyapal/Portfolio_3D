'use client'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

/**
 * Post-processing stack:
 *   Bloom         → yellow glows pop
 *   Vignette      → darken edges for depth
 *   Chromatic Aberration → subtle RGB split for tech feel
 *
 * Requires: @react-three/postprocessing postprocessing
 */
export function PostProcessing() {
  return (
    <EffectComposer multisampling={4}>
      {/* Bloom — only affects bright pixels (luminanceThreshold 0.6) */}
      <Bloom
        luminanceThreshold={0.6}
        luminanceSmoothing={0.4}
        intensity={0.8}
        mipmapBlur
      />

      {/* Slight vignette */}
      <Vignette
        offset={0.3}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />

      {/* Very subtle chromatic aberration */}
      <ChromaticAberration
        offset={new THREE.Vector2(0.0005, 0.0005)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0}
      />
    </EffectComposer>
  )
}