"use client"

import * as React from "react"
import { createTimeline, splitText, stagger } from "animejs"

import { cn } from "@/lib/utils"

interface AnimeCharFlipProps {
  children: string
  className?: string
  duration?: number
  staggerBy?: number
}

const CHAR_TEMPLATE = `<span class="char-3d">
  <em class="face face-top">{value}</em>
  <em class="face face-front">{value}</em>
  <em class="face face-bottom">{value}</em>
</span>`

export function AnimeCharFlip({
  children,
  className,
  duration = 750,
  staggerBy = 100,
}: AnimeCharFlipProps) {
  const ref = React.useRef<HTMLParagraphElement>(null)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const split = splitText(element, { chars: CHAR_TEMPLATE })
    const charsStagger = stagger(staggerBy, { start: 0 })

    const timeline = createTimeline({
      defaults: { ease: "linear", loop: true, duration },
    })
      .add(".char-3d", { rotateX: -90 }, charsStagger)
      .add(".char-3d .face-top", { opacity: [0.5, 0] }, charsStagger)
      .add(".char-3d .face-front", { opacity: [1, 0.5] }, charsStagger)
      .add(".char-3d .face-bottom", { opacity: [0.5, 1] }, charsStagger)

    return () => {
      timeline.revert()
      split.revert()
    }
  }, [children, duration, staggerBy])

  return (
    <p
      ref={ref}
      className={cn(
        "[perspective:1000px]",
        // Each character becomes a three-faced box rotating around its centre.
        "[&_.char-3d]:relative [&_.char-3d]:inline-block [&_.char-3d]:[transform-style:preserve-3d]",
        "[&_.face]:absolute [&_.face]:top-0 [&_.face]:left-0 [&_.face]:not-italic",
        "[&_.face-top]:[transform:rotateX(90deg)_translateZ(0.5em)]",
        "[&_.face-front]:[transform:translateZ(0.5em)]",
        "[&_.face-bottom]:[transform:rotateX(-90deg)_translateZ(0.5em)]",
        "[&_.face-front]:relative [&_.face-front]:not-italic",
        className
      )}
    >
      {children}
    </p>
  )
}
