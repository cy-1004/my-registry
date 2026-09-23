"use client"

import * as React from "react"
import gsap from "gsap"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"

import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(MorphSVGPlugin)
}

interface GsapMorphSvgProps {
  /** Path data to cycle through. The first entry is the resting shape. */
  paths: string[]
  viewBox?: string
  duration?: number
  ease?: string
  gradientFrom?: string
  gradientTo?: string
  className?: string
}

export function GsapMorphSvg({
  paths,
  viewBox = "0 0 100 100",
  duration = 2,
  ease = "expo.inOut",
  gradientFrom = "rgb(255, 135, 9)",
  gradientTo = "rgb(247, 189, 248)",
  className,
}: GsapMorphSvgProps) {
  const pathRef = React.useRef<SVGPathElement>(null)
  // Scoped so several instances on one page do not share a gradient id.
  const gradientId = React.useId().replace(/:/g, "")

  // Compared by content so an inline `paths` array does not restart the
  // animation on every render of the parent.
  const pathsKey = JSON.stringify(paths)

  React.useEffect(() => {
    const path = pathRef.current
    if (!path || paths.length < 2) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration, ease },
        repeat: -1,
      })

      paths.slice(1).forEach((shape) => {
        tl.to(path, { morphSVG: shape })
      })

      tl.to(path, { morphSVG: paths[0] })
    })

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathsKey, duration, ease])

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("overflow-visible", className)}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="99"
          y2="99"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.2" stopColor={gradientFrom} />
          <stop offset="0.7" stopColor={gradientTo} />
        </linearGradient>
      </defs>
      <path ref={pathRef} fill={`url(#${gradientId})`} d={paths[0]} />
    </svg>
  )
}
