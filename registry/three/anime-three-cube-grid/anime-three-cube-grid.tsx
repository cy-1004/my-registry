"use client"

import * as React from "react"
import { animate, createTimer, stagger, utils } from "animejs"
import { getInstances } from "animejs/adapters/three"
import * as THREE from "three"

import { cn } from "@/lib/utils"

interface AnimeThreeCubeGridProps {
  className?: string
  /** Cubes per axis; the grid holds this number cubed. */
  gridSize?: number
  color?: string
}

export function AnimeThreeCubeGrid({
  className,
  gridSize = 4,
  color = "#7dd3fc",
}: AnimeThreeCubeGridProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight
    if (width === 0 || height === 0) return

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.shadowMap.enabled = true
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.z = 6
    scene.add(camera)

    scene.add(new THREE.AmbientLight(0xffffff, 0.25))

    const pointLight = new THREE.PointLight(0xffffff, 8, 20, 0.4)
    pointLight.castShadow = true
    scene.add(pointLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 2)
    dirLight.position.set(2, 3, 4)
    scene.add(dirLight)

    const cellSize = 2 / gridSize
    const spread = (((gridSize - 1) / 2) * cellSize)
    const geometry = new THREE.BoxGeometry(cellSize, cellSize, cellSize)
    const material = new THREE.MeshLambertMaterial({ color })
    const mesh = new THREE.InstancedMesh(
      geometry,
      material,
      gridSize * gridSize * gridSize
    )
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)

    const instances = getInstances(mesh)
    const grid: [number, number, number] = [gridSize, gridSize, gridSize]

    utils.set(instances, {
      x: stagger([-spread, spread], { grid, axis: "x" }),
      y: stagger([-spread, spread], { grid, axis: "y" }),
      z: stagger([-spread, spread], { grid, axis: "z" }),
    })

    const animations = [
      animate(mesh, {
        rotateY: { to: 360, duration: 9000 },
        rotateX: { to: 360, duration: 12000 },
        loop: true,
        ease: "inOutQuad",
      }),
      animate(pointLight, {
        intensity: [30, 0],
        duration: 2500,
        loop: true,
        loopDelay: 500,
        alternate: true,
        ease: "out(3)",
      }),
      animate(instances, {
        // anime.js hands function values the target instance; its published
        // types only describe the `(self) => …` form.
        x: (target: unknown) => (target as { x: number }).x * 10,
        y: (target: unknown) => (target as { y: number }).y * 10,
        z: (target: unknown) => (target as { z: number }).z * 10,
        duration: 2000,
        delay: stagger([0, 500], {
          grid: true,
          from: "center",
          reversed: true,
          ease: "in(3)",
        }),
        loop: true,
        loopDelay: 500,
        alternate: true,
        ease: "inOutExpo",
      }),
    ]

    const timer = createTimer({
      onUpdate: () => renderer.render(scene, camera),
    })

    const handleResize = () => {
      const nextWidth = container.clientWidth
      const nextHeight = container.clientHeight
      if (nextWidth === 0 || nextHeight === 0) return
      camera.aspect = nextWidth / nextHeight
      camera.updateProjectionMatrix()
      renderer.setSize(nextWidth, nextHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      timer.revert()
      animations.forEach((animation) => animation.revert())
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [gridSize, color])

  return <div ref={containerRef} className={cn("h-80 w-full", className)} />
}
