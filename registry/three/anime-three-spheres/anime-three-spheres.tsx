"use client"

import * as React from "react"
import { animate, createTimer, utils } from "animejs"
import "animejs/adapters/three"
import * as THREE from "three"

import { cn } from "@/lib/utils"

type WaveUniforms = {
  uTime: { value: number }
  uAmplitude: { value: number }
  uFrequency: { value: THREE.Vector3 }
  uRim?: { value: number }
}

type WaveMaterial = THREE.Material & { uniforms: WaveUniforms }

/** Adds a vertex wave along the normal, plus an optional rim light. */
function applyWave<T extends THREE.Material>(
  material: T,
  { rim = false }: { rim?: boolean } = {}
): T & WaveMaterial {
  const waveMaterial = material as T & WaveMaterial

  waveMaterial.uniforms = {
    uTime: { value: 0 },
    uAmplitude: { value: 0.04 },
    uFrequency: { value: new THREE.Vector3(3, 3, 3) },
  }
  if (rim) {
    waveMaterial.uniforms.uRim = { value: 0 }
  }

  waveMaterial.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, waveMaterial.uniforms)
    shader.vertexShader =
      `
      uniform float uTime;
      uniform float uAmplitude;
      uniform vec3 uFrequency;
    ` +
      shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
      #include <begin_vertex>
      float w = sin(uTime + position.x * uFrequency.x)
             + sin(uTime + position.y * uFrequency.y)
             + sin(uTime + position.z * uFrequency.z);
      transformed += normal * w * uAmplitude;
    `
      )

    if (rim) {
      shader.fragmentShader =
        `
        uniform float uRim;
      ` +
        shader.fragmentShader.replace(
          "#include <dithering_fragment>",
          `
        #include <dithering_fragment>
        gl_FragColor.rgb += pow(1.0 - max(vNormal.z, 0.0), 3.0) * uRim;
      `
        )
    }
  }

  return waveMaterial
}

interface AnimeThreeSpheresProps {
  className?: string
  colors?: [string, string, string]
}

export function AnimeThreeSpheres({
  className,
  colors = ["#5ee9a0", "#7dd3fc", "#fbbf24"],
}: AnimeThreeSpheresProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const colorsKey = colors.join(",")

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight
    if (width === 0 || height === 0) return

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100)
    camera.position.set(0, 0, 8)
    scene.add(camera)

    scene.add(new THREE.AmbientLight(0xffffff, 0.15))
    const dirLight = new THREE.DirectionalLight(0xffffff, 5)
    dirLight.position.set(3, 2, 3)
    const lightRig = new THREE.Group().add(dirLight)
    scene.add(lightRig)

    const sphereGeometry = new THREE.SphereGeometry(0.8, 64, 64)

    const standardMaterial = new THREE.MeshStandardMaterial()
    const standard = new THREE.Mesh(sphereGeometry, standardMaterial)
    standard.position.set(-2.5, -0.25, 0)
    scene.add(standard)

    const waveMaterial = applyWave(
      new THREE.MeshStandardMaterial({ metalness: 0.4, roughness: 0.3 }),
      { rim: true }
    )
    const waveSphere = new THREE.Mesh(sphereGeometry, waveMaterial)
    waveSphere.position.set(0, -0.25, 0)
    scene.add(waveSphere)

    // A hard two-band ramp gives the toon sphere its dark terminator.
    const toonRamp = new THREE.DataTexture(
      new Uint8Array([17, 17, 17, 255, 255, 255, 255, 255]),
      2,
      1
    )
    toonRamp.magFilter = THREE.NearestFilter
    toonRamp.minFilter = THREE.NearestFilter
    toonRamp.needsUpdate = true

    const toonMaterial = applyWave(
      new THREE.MeshToonMaterial({ gradientMap: toonRamp })
    )
    const toon = new THREE.Mesh(sphereGeometry, toonMaterial)
    toon.position.set(2.5, -0.25, 0)
    scene.add(toon)

    const animations = [
      animate(lightRig, {
        rotateY: 360,
        duration: 6000,
        loop: true,
        ease: "linear",
      }),
      animate(standard, {
        roughness: [1, 0.3, 1],
        metalness: [0, 0.5, 0],
        duration: 4000,
        loop: true,
      }),
      animate(waveSphere, {
        uTime: { to: Math.PI * 2, ease: "linear" },
        uFrequencyX: () => utils.random(3, 10, 1),
        uFrequencyZ: () => utils.random(3, 10, 1),
        uAmplitude: () => utils.random(0.02, 0.08, 2),
        uRim: [0, 0.5, 0],
        duration: 4000,
        loop: true,
        onLoop: (self: { refresh: () => void }) => self.refresh(),
      }),
      animate(toon, {
        uTime: { to: Math.PI * 2, ease: "linear" },
        uFrequencyX: () => utils.random(50, 100),
        uFrequencyZ: () => utils.random(50, 100),
        uAmplitude: () => utils.random(0.05, 0.1, 2),
        duration: 3000,
        loop: true,
        onLoop: (self: { refresh: () => void }) => self.refresh(),
      }),
      animate([standard, waveSphere, toon], {
        color: [...colors, colors[0]],
        duration: 6000,
        loop: true,
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
      sphereGeometry.dispose()
      standardMaterial.dispose()
      waveMaterial.dispose()
      toonMaterial.dispose()
      toonRamp.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorsKey])

  return <div ref={containerRef} className={cn("h-80 w-full", className)} />
}
