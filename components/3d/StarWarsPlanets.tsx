'use client'
import { useRef, useState, useMemo } from 'react'
import { useFrame, ThreeEvent }       from '@react-three/fiber'
import { Html }                       from '@react-three/drei'
import * as THREE                     from 'three'
import { lerp }                       from '@/lib/rf3-utils'
import { skills }                     from '@/lib/skills'

// ── Each category sits on its own orbital ring ────────────────────────────────
// orbitR = distance from centre, y = height of the ring plane
const ORBITS: Record<string, { orbitR: number; y: number; label: string }> = {
  frontend: { orbitR: 4.2, y:  1.0, label: 'Frontend' },
  backend:  { orbitR: 2.8, y:  0.0, label: 'Backend'  },
  design:   { orbitR: 1.6, y: -1.1, label: 'Design'   },
  tools:    { orbitR: 3.4, y: -0.4, label: 'Tools'     },
}

// ── Special surface treatments ────────────────────────────────────────────────
const SPECIAL: Record<string, {
  hasDish?: boolean; hasGrid?: boolean
  hasRing?: boolean; hasBands?: boolean
}> = {
  'Three.js':      { hasDish: true  },
  'Next.js':       { hasGrid: true  },
  'Docker':        { hasRing: true  },
  'React':         { hasBands: true },
  'TypeScript':    { hasBands: true },
  'Node.js':       { hasBands: true },
  'Python':        { hasBands: true },
  'PostgreSQL':    { hasBands: true },
  'GraphQL':       { hasBands: true },
  'Redis':         { hasBands: true },
  'CSS / Sass':    { hasBands: true },
  'WebGL / GLSL':  { hasBands: true },
  'Figma':         { hasBands: true },
  'Framer':        { hasBands: true },
  'Motion Design': { hasBands: true },
  'Git':           { hasBands: true },
  'AWS':           { hasBands: true },
  'Vercel':        { hasBands: true },
}

// ── Build planet configs ──────────────────────────────────────────────────────
type PlanetConfig = {
  skill: string; level: number; category: string; color: string
  radius: number
  position: [number, number, number]
  floatAmp: number; floatFreq: number; floatOffset: number; rotSpeed: number
  hasDish: boolean; hasGrid: boolean; hasRing: boolean; hasBands: boolean
}

function buildPlanets(): PlanetConfig[] {
  const byCategory: Record<string, typeof skills> = {
    frontend: skills.filter(s => s.category === 'frontend'),
    backend:  skills.filter(s => s.category === 'backend'),
    design:   skills.filter(s => s.category === 'design'),
    tools:    skills.filter(s => s.category === 'tools'),
  }

  const planets: PlanetConfig[] = []
  let globalIdx = 0

  Object.entries(byCategory).forEach(([cat, catSkills]) => {
    const orbit = ORBITS[cat]
    const count = catSkills.length
    // Spread evenly around the ring with a small rotation offset per category
    const startAngle = (globalIdx * 0.4)

    catSkills.forEach((skill, i) => {
      const angle = startAngle + (i / count) * Math.PI * 2
      // Add a gentle alternating y-jitter so planets on the same ring aren't flat
      const yJitter = (i % 2 === 0 ? 1 : -1) * 0.35
      const x = Math.cos(angle) * orbit.orbitR
      const z = Math.sin(angle) * orbit.orbitR
      const y = orbit.y + yJitter

      const special = SPECIAL[skill.name] ?? {}
      planets.push({
        skill: skill.name,
        level: skill.level,
        category: orbit.label,
        color: skill.color,
        radius: 0.25 + (skill.level / 100) * 0.24, // 0.25–0.49
        position: [x, y, z],
        floatAmp:    0.08 + (globalIdx % 4) * 0.03,
        floatFreq:   0.25 + (globalIdx % 5) * 0.07,
        floatOffset: globalIdx * 1.1,
        rotSpeed:    0.002 + (globalIdx % 4) * 0.002,
        hasDish:  special.hasDish  ?? false,
        hasGrid:  special.hasGrid  ?? false,
        hasRing:  special.hasRing  ?? false,
        hasBands: special.hasBands ?? false,
      })
      globalIdx++
    })
  })

  return planets
}

const PLANETS = buildPlanets()

// ── Scene root ────────────────────────────────────────────────────────────────
export function StarWarsPlanets() {
  return (
    <group>
      {/* Faint orbit guide rings */}
      {Object.values(ORBITS).map((o, i) => (
        <mesh key={i} position={[0, o.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[o.orbitR - 0.015, o.orbitR + 0.015, 96]} />
          <meshBasicMaterial
            color="#FACC15"
            transparent
            opacity={0.06}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Category labels floating in space */}
      {Object.entries(ORBITS).map(([cat, o]) => (
        <Html
          key={cat}
          position={[o.orbitR + 0.5, o.y, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <p style={{
            fontFamily:    'monospace',
            fontSize:      9,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'rgba(250,204,21,0.35)',
            margin:        0,
            whiteSpace:    'nowrap',
          }}>
            {o.label}
          </p>
        </Html>
      ))}

      {/* All planets */}
      {PLANETS.map(p => <Planet key={p.skill} config={p} />)}
    </group>
  )
}

// ── Single planet ─────────────────────────────────────────────────────────────
function Planet({ config }: { config: PlanetConfig }) {
  const groupRef  = useRef<THREE.Group>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const scaleRef  = useRef(1)

  const darkColor = useMemo(() => {
    const c = new THREE.Color(config.color)
    // Three.js skill is white — force dark grey for Death Star look
    if (config.hasDish) return new THREE.Color('#1e1e1e')
    c.multiplyScalar(0.32)
    return c
  }, [config.color, config.hasDish])

  const emissiveColor = useMemo(() => new THREE.Color(config.color), [config.color])

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color:             darkColor,
    roughness:         0.80,
    metalness:         0.12,
    envMapIntensity:   1.4,
    emissive:          emissiveColor,
    emissiveIntensity: 0.06,
  }), [darkColor, emissiveColor])

  const glowMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:             config.color,
    emissive:          emissiveColor,
    emissiveIntensity: 0.3,
    transparent:       true,
    opacity:           0.0,
    roughness:         1,
    metalness:         0,
    depthWrite:        false,
    side:              THREE.BackSide,
  }), [config.color, emissiveColor])

  const baseY = config.position[1]
  const baseX = config.position[0]

  useFrame(({ clock }) => {
    if (!groupRef.current || !sphereRef.current) return
    const t = clock.elapsedTime + config.floatOffset

    groupRef.current.position.y = baseY + Math.sin(t * config.floatFreq) * config.floatAmp
    groupRef.current.position.x = baseX + Math.cos(t * config.floatFreq * 0.6) * config.floatAmp * 0.4

    sphereRef.current.rotation.y += config.rotSpeed

    scaleRef.current = lerp(scaleRef.current, hovered ? 1.22 : 1, 0.09)
    groupRef.current.scale.setScalar(scaleRef.current)

    glowMat.opacity           = lerp(glowMat.opacity,           hovered ? 0.18 : 0.0,  0.08)
    glowMat.emissiveIntensity = lerp(glowMat.emissiveIntensity, hovered ? 1.4  : 0.3,  0.08)
    mat.emissiveIntensity     = lerp(mat.emissiveIntensity,     hovered ? 0.20 : 0.06, 0.07)
  })

  return (
    <group
      ref={groupRef}
      position={config.position}
      onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerLeave={() => {
        setHovered(false)
        document.body.style.cursor = 'none'
      }}
    >
      {/* Atmosphere */}
      <mesh scale={1.22} material={glowMat}>
        <sphereGeometry args={[config.radius, 22, 22]} />
      </mesh>

      {/* Main sphere */}
      <mesh ref={sphereRef} material={mat} castShadow receiveShadow>
        <sphereGeometry args={[config.radius, 48, 48]} />
      </mesh>

      {config.hasBands  && <SurfaceBands    radius={config.radius} color={config.color} />}
      {config.hasDish   && <DeathStarDetail radius={config.radius} />}
      {config.hasGrid   && <CityLights      radius={config.radius} glowColor={config.color} />}
      {config.hasRing   && (
        <mesh rotation={[Math.PI / 2.6, 0.15, 0]}>
          <ringGeometry args={[config.radius * 1.4, config.radius * 1.9, 64]} />
          <meshStandardMaterial
            color={config.color}
            transparent opacity={0.35}
            roughness={0.9}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Emissive point light on glowing planets */}
      {config.level >= 82 && (
        <pointLight
          color={config.color}
          intensity={hovered ? 1.2 : 0.3}
          distance={2}
          decay={2}
        />
      )}

      {/* Hover tooltip */}
      {hovered && (
        <Html
          center
          distanceFactor={6}
          position={[0, config.radius + 0.5, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            background:     'rgba(6,6,6,0.96)',
            border:         `1px solid ${config.color}55`,
            borderRadius:   8,
            padding:        '8px 16px',
            textAlign:      'center',
            whiteSpace:     'nowrap',
            backdropFilter: 'blur(12px)',
            boxShadow:      `0 0 22px ${config.color}20`,
            minWidth:       110,
          }}>
            <p style={{
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: 13, fontWeight: 800,
              color: config.color, margin: 0, letterSpacing: '-0.02em',
            }}>
              {config.skill}
            </p>
            <p style={{
              fontFamily: 'monospace', fontSize: 9,
              color: 'rgba(255,255,255,0.38)', margin: '2px 0 6px',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              {config.category}
            </p>
            <div style={{
              width: 100, height: 2,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 1, overflow: 'hidden', margin: '0 auto 4px',
            }}>
              <div style={{
                width: `${config.level}%`, height: '100%',
                background: config.color, borderRadius: 1,
                boxShadow: `0 0 5px ${config.color}`,
              }} />
            </div>
            <p style={{
              fontFamily: 'monospace', fontSize: 10,
              color: config.color, margin: 0,
            }}>
              {config.level}%
            </p>
          </div>
        </Html>
      )}
    </group>
  )
}

// ── Surface bands ─────────────────────────────────────────────────────────────
function SurfaceBands({ radius, color }: { radius: number; color: string }) {
  const c = useMemo(() => {
    const col = new THREE.Color(color); col.multiplyScalar(0.55); return col
  }, [color])

  return (
    <>
      {[
        { phi: 0.4,  width: 0.09, alpha: 0.22 },
        { phi: 0.9,  width: 0.06, alpha: 0.16 },
        { phi: 1.3,  width: 0.11, alpha: 0.20 },
        { phi: 1.75, width: 0.05, alpha: 0.14 },
      ].map((b, i) => (
        <mesh key={i} scale={[1.003, 1.003, 1.003]}>
          <sphereGeometry args={[radius, 30, 5, 0, Math.PI * 2, b.phi, b.width]} />
          <meshStandardMaterial
            color={c} transparent opacity={b.alpha}
            roughness={1} depthWrite={false} side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  )
}

// ── Death Star ────────────────────────────────────────────────────────────────
function DeathStarDetail({ radius }: { radius: number }) {
  // Dish sits on the upper-right quadrant of the sphere.
  // Direction vector normalised to magnitude 1 → position is exactly on surface.
  // Raw dir: [0.46, 0.54, 0.56] → magnitude ≈ 0.904 (was wrong — dish was inside sphere)
  // Normalised: [0.509, 0.597, 0.619]
  const dx = 0.509, dy = 0.597, dz = 0.619
  const px = radius * dx
  const py = radius * dy
  const pz = radius * dz

  // Rotation: align local Y-axis with the outward normal [dx, dy, dz]
  // We use a quaternion to rotate from world-up (0,1,0) → surface normal
  const normal    = useMemo(() => new THREE.Vector3(dx, dy, dz).normalize(), [])
  const up        = useMemo(() => new THREE.Vector3(0, 1, 0), [])
  const quaternion = useMemo(() => new THREE.Quaternion().setFromUnitVectors(up, normal), [normal, up])
  const euler      = useMemo(() => new THREE.Euler().setFromQuaternion(quaternion), [quaternion])

  return (
    <>
      {/* Equatorial trench */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.001, radius * 0.028, 6, 80]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Horizontal panel seam lines */}
      {[0.6, 1.1, 1.6].map((phi, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + phi * 0.3, i * 0.5, 0]}>
          <torusGeometry args={[radius * 0.998, radius * 0.012, 4, 64]} />
          <meshStandardMaterial color="#181818" roughness={0.4} metalness={0.8} />
        </mesh>
      ))}

      {/* Dish group — correctly placed ON surface, facing outward */}
      <group position={[px, py, pz]} rotation={euler}>
        {/* Raised outer rim ring */}
        <mesh>
          <cylinderGeometry args={[radius * 0.36, radius * 0.38, radius * 0.045, 32]} />
          <meshStandardMaterial color="#1e1e1e" roughness={0.25} metalness={0.95} />
        </mesh>

        {/* Concave bowl — open end faces outward (away from sphere centre) */}
        <mesh position={[0, radius * 0.04, 0]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[radius * 0.34, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
          <meshStandardMaterial
            color="#090909"
            roughness={0.15}
            metalness={1.0}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Inner concentric rings inside the bowl */}
        {[0.22, 0.12].map((r, i) => (
          <mesh key={i} position={[0, radius * 0.045, 0]}>
            <torusGeometry args={[radius * r, radius * 0.012, 6, 40]} />
            <meshStandardMaterial color="#202020" roughness={0.2} metalness={0.95} />
          </mesh>
        ))}

        {/* Emitter stalk */}
        <mesh position={[0, radius * 0.09, 0]}>
          <cylinderGeometry args={[radius * 0.022, radius * 0.022, radius * 0.1, 8]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.9} />
        </mesh>

        {/* Superlaser crystal */}
        <mesh position={[0, radius * 0.15, 0]}>
          <sphereGeometry args={[radius * 0.052, 16, 16]} />
          <meshStandardMaterial
            color="#aad4ff"
            emissive={new THREE.Color('#2244ff')}
            emissiveIntensity={6}
            roughness={0}
            metalness={0}
          />
        </mesh>

        {/* Blue glow from emitter */}
        <pointLight
          position={[0, radius * 0.15, 0]}
          color="#2244ff"
          intensity={1.0}
          distance={radius * 3}
          decay={2}
        />
      </group>
    </>
  )
}

// ── City lights ───────────────────────────────────────────────────────────────
function CityLights({ radius, glowColor }: { radius: number; glowColor: string }) {
  const positions = useMemo(() => {
    const count = 140, pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = radius * 1.007
      pos[i*3]=r*Math.sin(phi)*Math.cos(theta)
      pos[i*3+1]=r*Math.sin(phi)*Math.sin(theta)
      pos[i*3+2]=r*Math.cos(phi)
    }
    return pos
  }, [radius])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={glowColor} size={0.015} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
    </points>
  )
}