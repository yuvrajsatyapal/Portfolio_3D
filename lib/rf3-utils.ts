import * as THREE from 'three'

// ─── Math helpers ─────────────────────────────────────────────────────────────
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val))
export const map = (val: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin)
export const damp = (a: number, b: number, lambda: number, dt: number) =>
  lerp(a, b, 1 - Math.exp(-lambda * dt))

// ─── Random helpers ───────────────────────────────────────────────────────────
export const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min
export const randomSign = () => (Math.random() > 0.5 ? 1 : -1)

// ─── Colour helpers ───────────────────────────────────────────────────────────
export const hexToThreeColor = (hex: string) => new THREE.Color(hex)

export const YELLOW  = new THREE.Color('#FACC15')
export const WHITE   = new THREE.Color('#ffffff')
export const DARK    = new THREE.Color('#0a0a0a')
export const GREY    = new THREE.Color('#404040')

// ─── Geometry helpers ─────────────────────────────────────────────────────────
/**
 * Scatter N positions randomly inside a sphere of given radius.
 */
export function randomSpherePositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi   = Math.acos(2 * Math.random() - 1)
    const r     = Math.cbrt(Math.random()) * radius
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }
  return positions
}

/**
 * Smooth step interpolation
 */
export const smoothstep = (min: number, max: number, value: number) => {
  const x = clamp((value - min) / (max - min), 0, 1)
  return x * x * (3 - 2 * x)
}

// ─── Viewport helpers ────────────────────────────────────────────────────────
export function visibleSizeAtZ(z: number, camera: THREE.PerspectiveCamera) {
  const fovRad = (camera.fov * Math.PI) / 180
  const height  = 2 * Math.tan(fovRad / 2) * Math.abs(z)
  return { width: height * camera.aspect, height }
}