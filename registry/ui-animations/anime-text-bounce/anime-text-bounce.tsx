"use client"

import * as React from "react"
import { animate, splitText, stagger } from "animejs"

import { cn } from "@/lib/utils"

interface AnimeTextBounceProps {
  children: string
  className?: string
  loop?: boolean
  loopDelay?: number
}

export function AnimeTextBounce({
  children,
  className,
  loop = true,
  loopDelay = 1000,
}: AnimeTextBounceProps) {
  const ref = React.useRef<HTMLHeadingElement>(null)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    // Kept whole rather than destructured: revert() is a method on the
    // splitter instance and loses `this` when pulled off the object.
    const split = splitText(element, {
      words: false,
      chars: true,
    })

    const animation = animate(split.chars, {
      y: [
        { to: "-2.75rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],
      rotate: {
        from: "-1turn",
        delay: 0,
      },
      delay: stagger(50),
      ease: "inOutCirc",
      loopDelay,
      loop,
    })

    return () => {
      animation.revert()
      split.revert()
    }
  }, [children, loop, loopDelay])

  return (
    <h2 ref={ref} className={cn(className)}>
      {children}
    </h2>
  )
}
