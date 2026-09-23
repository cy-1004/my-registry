"use client"

// Adapted from motion-primitives (MIT) — https://motion-primitives.com

import * as React from "react"
import { motion, useSpring, useTransform, type SpringOptions } from "motion/react"

import { cn } from "@/lib/utils"

export type SpotlightProps = {
  className?: string
  size?: number
  springOptions?: SpringOptions
}

export function Spotlight({
  className,
  size = 200,
  springOptions = { bounce: 0 },
}: SpotlightProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [parentElement, setParentElement] = React.useState<HTMLElement | null>(
    null
  )

  const mouseX = useSpring(0, springOptions)
  const mouseY = useSpring(0, springOptions)

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`)
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`)

  // A callback ref rather than an effect: the parent is only knowable once the
  // node is attached, and this keeps the parent's positioning set up in commit.
  const containerRef = React.useCallback((node: HTMLDivElement | null) => {
    const parent = node?.parentElement ?? null
    if (parent) {
      parent.style.position = "relative"
      parent.style.overflow = "hidden"
    }
    setParentElement(parent)
  }, [])

  React.useEffect(() => {
    if (!parentElement) return

    const abortController = new AbortController()
    const { signal } = abortController

    parentElement.addEventListener(
      "mousemove",
      (event: MouseEvent) => {
        const { left, top } = parentElement.getBoundingClientRect()
        mouseX.set(event.clientX - left)
        mouseY.set(event.clientY - top)
      },
      { signal }
    )
    parentElement.addEventListener("mouseenter", () => setIsHovered(true), {
      signal,
    })
    parentElement.addEventListener("mouseleave", () => setIsHovered(false), {
      signal,
    })

    return () => abortController.abort()
  }, [parentElement, mouseX, mouseY])

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200",
        "from-zinc-100 via-zinc-200 to-zinc-400 dark:from-zinc-50 dark:via-zinc-100 dark:to-zinc-200",
        isHovered ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
      }}
    />
  )
}
