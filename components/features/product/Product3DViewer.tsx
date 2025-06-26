// components/features/product/Product3DViewer.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stage } from '@react-three/drei'
import { Suspense } from 'react'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

interface Product3DViewerProps {
  modelUrl: string
}

export function Product3DViewer({ modelUrl }: Product3DViewerProps) {
  return (
    <div className="relative aspect-square h-full w-full">
      <Canvas camera={{ fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls autoRotate enableZoom={false} />
      </Canvas>
    </div>
  )
}
