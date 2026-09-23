"use client"

import * as React from "react"
import { animate } from "animejs"

import { cn } from "@/lib/utils"

const STAR =
  "64,4 78.1,44.6 121.1,45.5 86.8,71.4 99.3,112.5 64,88 28.7,112.5 41.2,71.4 6.9,45.5 49.9,44.6"
const STAR_COLLAPSED =
  "64,24 78.1,44.6 102,51.6 86.8,71.4 87.5,96.4 64,88 40.5,96.4 41.2,71.4 26,51.6 49.9,44.6"

interface AnimeSvgDistortProps {
  className?: string
  fill?: string
}

export function AnimeSvgDistort({
  className,
  fill = "currentColor",
}: AnimeSvgDistortProps) {
  const svgRef = React.useRef<SVGSVGElement>(null)
  // Scoped so several instances on one page do not share a filter id.
  const filterId = React.useId().replace(/:/g, "")

  React.useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const turbulence = svg.querySelectorAll("feTurbulence, feDisplacementMap")
    const polygon = svg.querySelector("polygon")
    if (!polygon) return

    const distortion = animate(turbulence, {
      baseFrequency: 0.05,
      scale: 15,
      alternate: true,
      loop: true,
    })

    const morph = animate(polygon, {
      points: STAR_COLLAPSED,
      alternate: true,
      loop: true,
    })

    return () => {
      distortion.revert()
      morph.revert()
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 128 128"
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" />
        </filter>
      </defs>
      <polygon
        points={STAR}
        fill={fill}
        filter={`url(#${filterId})`}
      />
    </svg>
  )
}
