"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { cn } from "@/lib/utils"

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function Particles({ count = 800 }: { count?: number }) {
  const pointsRef = React.useRef<THREE.Points>(null)

  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 10
      arr[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 10
      arr[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 10
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05
      pointsRef.current.rotation.x += delta * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#a5b4fc"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}

interface ParticleFieldBackgroundProps {
  className?: string
  count?: number
}

export function ParticleFieldBackground({
  className,
  count = 800,
}: ParticleFieldBackgroundProps) {
  return (
    <div className={cn("h-80 w-full bg-black", className)}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Particles count={count} />
      </Canvas>
    </div>
  )
}
