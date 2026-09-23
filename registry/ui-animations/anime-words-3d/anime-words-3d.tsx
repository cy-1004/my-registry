"use client"

import * as React from "react"
import { animate, splitText, stagger } from "animejs"
import type { TextSplitter } from "animejs"

import { cn } from "@/lib/utils"

interface AnimeWords3DProps {
  children: string
  /** Drives the effect: true pushes the words out, false returns them. */
  expanded: boolean
  className?: string
  /** How far each word travels toward the viewer. */
  distance?: string
  /** Tilt applied to the whole block while expanded. */
  rotateY?: number
  rotateX?: number
  /** Opacity of the words while expanded. */
  opacity?: number
  duration?: number
  /** Gap between each word's start, in ms. */
  staggerBy?: number
  /** Order the stagger walks through the words. */
  from?: "first" | "last" | "center" | "random"
  perspective?: string
}

export function AnimeWords3D({
  children,
  expanded,
  className,
  distance = "6rem",
  rotateY = 60,
  rotateX = 0,
  opacity = 0.75,
  duration = 750,
  staggerBy = 40,
  from = "random",
  perspective = "1000px",
}: AnimeWords3DProps) {
  const containerRef = React.useRef<HTMLParagraphElement>(null)
  const splitRef = React.useRef<TextSplitter | null>(null)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    const element = containerRef.current
    if (!element) return

    // Kept whole: revert() is a method on the splitter and needs its `this`.
    const split = splitText(element, { words: true, chars: false })
    splitRef.current = split
    setReady(true)

    return () => {
      split.revert()
      splitRef.current = null
    }
  }, [children])

  React.useEffect(() => {
    const element = containerRef.current
    const split = splitRef.current
    if (!element || !split || !ready) return

    const blockAnimation = animate(element, {
      rotateY: expanded ? rotateY : 0,
      rotateX: expanded ? rotateX : 0,
      duration,
      ease: "inOutQuad",
    })

    const wordAnimation = animate(split.words, {
      z: expanded ? distance : "0rem",
      opacity: expanded ? opacity : 1,
      duration,
      ease: "inOutQuad",
      delay: stagger(staggerBy, { from }),
    })

    return () => {
      blockAnimation.revert()
      wordAnimation.revert()
    }
  }, [
    ready,
    expanded,
    distance,
    rotateY,
    rotateX,
    opacity,
    duration,
    staggerBy,
    from,
  ])

  return (
    <p
      ref={containerRef}
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ perspective }}
    >
      {children}
    </p>
  )
}
