"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"

import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrambleTextPlugin)
}

export type ScrambleSegment = {
  text: string
  /** A character set, or the keywords "lowerCase" / "upperCase". */
  chars?: string
  speed?: number
  duration?: number
}

interface GsapScrambleTextProps {
  segments: ScrambleSegment[]
  className?: string
  showCursor?: boolean
  replayOnClick?: boolean
}

export function GsapScrambleText({
  segments,
  className,
  showCursor = true,
  replayOnClick = true,
}: GsapScrambleTextProps) {
  const containerRef = React.useRef<HTMLParagraphElement>(null)
  const spanRefs = React.useRef<(HTMLSpanElement | null)[]>([])
  const cursorRef = React.useRef<HTMLSpanElement>(null)
  const timelineRef = React.useRef<gsap.core.Timeline | null>(null)

  // Compared by content so an inline `segments` array does not restart the
  // animation on every render of the parent.
  const segmentsKey = JSON.stringify(segments)

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "none" } })

      segments.forEach((segment, index) => {
        const element = spanRefs.current[index]
        if (!element) return

        tl.to(element, {
          scrambleText: {
            text: segment.text,
            chars: segment.chars ?? "lowerCase",
            speed: segment.speed,
          },
          duration: segment.duration ?? 2,
        })
      })

      if (cursorRef.current) {
        const cursorTl = gsap.timeline({ repeat: -1 })
        cursorTl
          .to(cursorRef.current, { opacity: 0, duration: 0.5, delay: 0.2 })
          .to(cursorRef.current, { opacity: 1, duration: 0.5, delay: 0.2 })
        tl.add(cursorTl)
      }

      timelineRef.current = tl
    }, containerRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segmentsKey])

  return (
    <p
      ref={containerRef}
      className={cn(className, replayOnClick && "cursor-pointer")}
      onClick={
        replayOnClick ? () => timelineRef.current?.play(0) : undefined
      }
    >
      <span className="sr-only">
        {segments.map((segment) => segment.text).join(" ")}
      </span>
      <span aria-hidden="true">
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            {/* JSX renders adjacent elements with no whitespace, so the gap
                between segments has to be explicit. */}
            {index > 0 ? " " : null}
            <span
              ref={(node) => {
                spanRefs.current[index] = node
              }}
            />
          </React.Fragment>
        ))}
        {showCursor && (
          <span ref={cursorRef} className="ml-0.5 inline-block">
            ▍
          </span>
        )}
      </span>
    </p>
  )
}
