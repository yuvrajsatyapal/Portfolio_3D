'use client'
import { useRef }            from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useMousePosition }  from '@/hooks/useMousePosition'
import { damp }              from '@/lib/rf3-utils'

/**
 * Subtly tilts the camera toward the mouse position.
 * Must be placed inside an R3F <Canvas>.
 */
export function CameraRig() {
  const { camera } = useThree()
  const mouse      = useMousePosition()
  const rotX       = useRef(0)
  const rotY       = useRef(0)

  useFrame((_, delta) => {
    const lambda = 3   // spring stiffness — higher = faster response
    rotX.current = damp(rotX.current, -mouse.current.y * 0.15, lambda, delta)
    rotY.current = damp(rotY.current,  mouse.current.x * 0.25, lambda, delta)

    camera.rotation.x = rotX.current
    camera.rotation.y = rotY.current
  })

  return null
}