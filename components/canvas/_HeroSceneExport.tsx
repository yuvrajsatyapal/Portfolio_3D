/**
 * Shim file — re-exports HeroScene as the DEFAULT export.
 *
 * next/dynamic only works reliably when the imported module has a
 * default export. Named-export re-wrapping (.then(m => ({ default: m.X })))
 * can silently resolve to undefined in some Next.js / webpack configs.
 * This shim is the safest pattern.
 */
export { HeroScene as default } from '@/components/3d/HeroScene'