"use client"

// Adapted from motion-primitives (MIT) — https://motion-primitives.com

import * as React from "react"
import { motion, type MotionProps } from "motion/react"

export type TextScrambleProps = {
  children: string
  duration?: number
  speed?: number
  characterSet?: string
  as?: TextScrambleTag
  className?: string
  trigger?: boolean
  onScrambleComplete?: () => void
} & MotionProps

const defaultChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

// Created once at module scope: components built during render would lose
// their identity (and state) on every re-render.
const MOTION_TAGS = {
  p: motion.p,
  span: motion.span,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const

export type TextScrambleTag = keyof typeof MOTION_TAGS

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as = "p",
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = MOTION_TAGS[as]
  const [scrambledText, setScrambledText] = React.useState<string | null>(null)
  const text = children
  const displayText = scrambledText ?? children

  // Held in a ref so an inline callback does not restart the animation on
  // every render of the parent.
  const onCompleteRef = React.useRef(onScrambleComplete)
  React.useEffect(() => {
    onCompleteRef.current = onScrambleComplete
  }, [onScrambleComplete])

  React.useEffect(() => {
    if (!trigger) return

    const steps = duration / speed
    let step = 0

    const interval = setInterval(() => {
      let scrambled = ""
      const progress = step / steps

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          scrambled += " "
          continue
        }

        if (progress * text.length > i) {
          scrambled += text[i]
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)]
        }
      }

      setScrambledText(scrambled)
      step++

      if (step > steps) {
        clearInterval(interval)
        setScrambledText(null)
        onCompleteRef.current?.()
      }
    }, speed * 1000)

    return () => clearInterval(interval)
  }, [trigger, text, duration, speed, characterSet])

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  )
}
