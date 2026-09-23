"use client"

import * as React from "react"
import { animate, stagger, svg } from "animejs"

import { cn } from "@/lib/utils"

interface AnimeLineDrawProps {
  /** Path data for each stroke, drawn in order. */
  paths: string[]
  viewBox?: string
  className?: string
  strokeWidth?: number
  duration?: number
  staggerBy?: number
  loop?: boolean
}

export function AnimeLineDraw({
  paths,
  viewBox = "0 0 128 128",
  className,
  strokeWidth = 2,
  duration = 2000,
  staggerBy = 100,
  loop = true,
}: AnimeLineDrawProps) {
  const svgRef = React.useRef<SVGSVGElement>(null)

  // Compared by content so an inline `paths` array does not restart the
  // animation on every render of the parent.
  const pathsKey = JSON.stringify(paths)

  React.useEffect(() => {
    const element = svgRef.current
    if (!element) return

    const lines = element.querySelectorAll("path")
    if (lines.length === 0) return

    const animation = animate(svg.createDrawable(lines), {
      draw: ["0 0", "0 1", "1 1"],
      ease: "inOutQuad",
      duration,
      delay: stagger(staggerBy),
      loop,
    })

    return () => {
      animation.revert()
    }
  }, [pathsKey, duration, staggerBy, loop])

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      {paths.map((d, index) => (
        <path
          key={index}
          d={d}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}
