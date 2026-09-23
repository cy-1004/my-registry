"use client"

import * as React from "react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"

import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText)
}

export type SplitMode = "chars" | "words" | "lines"

export type GsapSplitTextHandle = {
  play: (mode: SplitMode) => void
}

interface GsapSplitTextProps {
  children: string
  className?: string
  /** Runs once on mount; omit to only animate on demand via the ref. */
  initialMode?: SplitMode
}

const PRESETS: Record<SplitMode, gsap.TweenVars> = {
  chars: {
    x: 150,
    opacity: 0,
    duration: 0.7,
    ease: "power4",
    stagger: 0.04,
  },
  words: {
    y: -100,
    opacity: 0,
    rotation: "random(-80, 80)",
    duration: 0.7,
    ease: "back",
    stagger: 0.15,
  },
  lines: {
    rotationX: -100,
    transformOrigin: "50% 50% -160px",
    opacity: 0,
    duration: 0.8,
    ease: "power3",
    stagger: 0.25,
  },
}

export const GsapSplitText = React.forwardRef<
  GsapSplitTextHandle,
  GsapSplitTextProps
>(function GsapSplitText({ children, className, initialMode }, ref) {
  const textRef = React.useRef<HTMLDivElement>(null)
  const splitRef = React.useRef<SplitText | null>(null)
  const animationRef = React.useRef<gsap.core.Tween | null>(null)

  const play = React.useCallback((mode: SplitMode) => {
    const split = splitRef.current
    if (!split) return

    animationRef.current?.revert()
    animationRef.current = gsap.from(split[mode], PRESETS[mode])
  }, [])

  React.useImperativeHandle(ref, () => ({ play }), [play])

  React.useEffect(() => {
    const element = textRef.current
    if (!element) return

    const setup = () => {
      splitRef.current?.revert()
      animationRef.current?.revert()
      splitRef.current = SplitText.create(element, {
        type: "chars,words,lines",
      })
      if (initialMode) {
        play(initialMode)
      }
    }

    setup()
    window.addEventListener("resize", setup)

    return () => {
      window.removeEventListener("resize", setup)
      animationRef.current?.revert()
      splitRef.current?.revert()
    }
  }, [children, initialMode, play])

  return (
    <div
      ref={textRef}
      className={cn("[perspective:500px]", className)}
    >
      {children}
    </div>
  )
})
