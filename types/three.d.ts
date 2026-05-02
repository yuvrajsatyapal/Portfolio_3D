import { ThreeElements } from '@react-three/fiber'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

declare module '*.glb' { const src: string; export default src }
declare module '*.gltf' { const src: string; export default src }
declare module '*.hdr' { const src: string; export default src }