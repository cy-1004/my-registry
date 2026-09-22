"use client"

import * as React from "react"
import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls } from "@react-three/drei"

import { cn } from "@/lib/utils"

function RotatingKnot() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh>
        <torusKnotGeometry args={[1, 0.32, 200, 32]} />
        <meshStandardMaterial color="#6366f1" roughness={0.25} metalness={0.6} />
      </mesh>
    </Float>
  )
}

interface RotatingHeroSceneProps {
  className?: string
}

export function RotatingHeroScene({ className }: RotatingHeroSceneProps) {
  return (
    <div className={cn("h-80 w-full", className)}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={["#111827"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} />
        <pointLight position={[-3, -2, -3]} intensity={0.6} color="#818cf8" />
        <RotatingKnot />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  )
}
