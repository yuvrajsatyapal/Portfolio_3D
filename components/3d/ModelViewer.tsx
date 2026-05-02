'use client'
import { useRef }            from 'react'
import { useFrame }          from '@react-three/fiber'
import { useGLTF, Center }   from '@react-three/drei'
import { Suspense3D }        from '@/components/canvas/Suspense3D'
import * as THREE            from 'three'

interface Props {
  url:      string
  scale?:   number
  rotate?:  boolean
  position?: [number, number, number]
}

function Model({ url, scale = 1, rotate = true, position = [0, 0, 0] }: Props) {
  const { scene } = useGLTF(url)
  const groupRef  = useRef<THREE.Group>(null)

  // Apply yellow-accent metallic material to all meshes
  scene.traverse(child => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(m => {
          if (m instanceof THREE.MeshStandardMaterial) {
            m.envMapIntensity = 1.5
          }
        })
      } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.envMapIntensity = 1.5
      }
      mesh.castShadow    = true
      mesh.receiveShadow = true
    }
  })

  useFrame((_, delta) => {
    if (!groupRef.current || !rotate) return
    groupRef.current.rotation.y += delta * 0.4
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

export function ModelViewer(props: Props) {
  return (
    <Suspense3D>
      <Model {...props} />
    </Suspense3D>
  )
}