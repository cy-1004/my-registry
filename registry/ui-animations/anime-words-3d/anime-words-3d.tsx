"use client"

import * as React from "react"
import { animate, splitText, stagger } from "animejs"
import type { JSAnimation, TextSplitter } from "animejs"

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
  /** Applied to a wrapper so the block's own tilt is seen in perspective. */
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
  perspective = "600px",
}: AnimeWords3DProps) {
  const containerRef = React.useRef<HTMLParagraphElement>(null)
  const animationsRef = React.useRef<JSAnimation[]>([])
  const [split, setSplit] = React.useState<TextSplitter | null>(null)

  React.useEffect(() => {
    const element = containerRef.current
    if (!element) return

    // Kept whole: revert() is a method on the splitter and needs its `this`.
    const nextSplit = splitText(element, { words: true, chars: false })
    setSplit(nextSplit)

    return () => {
      // Only reset styles when the words themselves go away (new text or
      // unmount); toggling hands off from wherever the last animation paused.
      animationsRef.current.forEach((animation) => animation.revert())
      animationsRef.current = []
      nextSplit.revert()
    }
  }, [children])

  React.useEffect(() => {
    const element = containerRef.current
    if (!element || !split) return

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

    animationsRef.current = [blockAnimation, wordAnimation]

    return () => {
      // Pause instead of revert so the next animation starts from the
      // current values rather than snapping back to the initial state.
      blockAnimation.pause()
      wordAnimation.pause()
    }
  }, [
    split,
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
    <div style={{ perspective }}>
      <p
        ref={containerRef}
        className={cn("[transform-style:preserve-3d]", className)}
      >
        {children}
      </p>
    </div>
  )
}
