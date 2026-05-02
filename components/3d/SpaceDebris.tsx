'use client'
import { useRef, useMemo }  from 'react'
import { useFrame }         from '@react-three/fiber'
import * as THREE           from 'three'
import { randomBetween }    from '@/lib/rf3-utils'

interface DebrisConfig {
  id:       string
  position: [number, number, number]
  rotation: [number, number, number]
  scale:    number
  speedX:   number
  speedY:   number
  speedZ:   number
  floatAmp: number
  floatFreq:number
  offset:   number
  shape:    'rock' | 'shard' | 'chunk'
}

const NUM_DEBRIS = 10

export function SpaceDebris() {
  const debris: DebrisConfig[] = useMemo(() => {
    return Array.from({ length: NUM_DEBRIS }, (_, i) => ({
      id:        `debris-${i}`,
      position:  [
        randomBetween(-7, 7),
        randomBetween(-4, 4),
        randomBetween(-4, 1),
      ] as [number, number, number],
      rotation:  [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale:     randomBetween(0.05, 0.28),
      speedX:    (Math.random() - 0.5) * 0.006,
      speedY:    (Math.random() - 0.5) * 0.004,
      speedZ:    (Math.random() - 0.5) * 0.005,
      floatAmp:  randomBetween(0.03, 0.12),
      floatFreq: randomBetween(0.3, 0.9),
      offset:    Math.random() * Math.PI * 2,
      shape:     (['rock', 'shard', 'chunk'] as const)[i % 3],
    }))
  }, [])

  return (
    <group>
      {debris.map(d => <DebrisPiece key={d.id} config={d} />)}
    </group>
  )
}

function DebrisPiece({ config }: { config: DebrisConfig }) {
  const ref = useRef<THREE.Mesh>(null)

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color:           '#1c1c1c',
    roughness:       0.9,
    metalness:       0.2,
    envMapIntensity: 1.0,
  }), [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime + config.offset
    ref.current.rotation.x += config.speedX
    ref.current.rotation.y += config.speedY
    ref.current.rotation.z += config.speedZ
    ref.current.position.y =
      config.position[1] + Math.sin(t * config.floatFreq) * config.floatAmp
    ref.current.position.x =
      config.position[0] + Math.cos(t * config.floatFreq * 0.7) * config.floatAmp * 0.5
  })

  // Rock-like geometry with subdivision noise
  const geometry = useMemo(() => {
    let geo: THREE.BufferGeometry

    if (config.shape === 'rock') {
      geo = new THREE.IcosahedronGeometry(1, 1)
    } else if (config.shape === 'shard') {
      geo = new THREE.OctahedronGeometry(1, 0)
    } else {
      geo = new THREE.DodecahedronGeometry(1, 0)
    }

    // Jitter vertices for rocky look
    const pos = geo.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(
        i,
        pos.getX(i) + (Math.random() - 0.5) * 0.35,
        pos.getY(i) + (Math.random() - 0.5) * 0.35,
        pos.getZ(i) + (Math.random() - 0.5) * 0.35,
      )
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [config.shape])

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      material={material}
      position={config.position}
      rotation={config.rotation}
      scale={config.scale}
      castShadow
    />
  )
}