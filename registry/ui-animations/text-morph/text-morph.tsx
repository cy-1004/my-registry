"use client"

// Adapted from motion-primitives (MIT) — https://motion-primitives.com

import * as React from "react"
import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from "motion/react"

import { cn } from "@/lib/utils"

export type TextMorphProps = {
  children: string
  as?: React.ElementType
  className?: string
  style?: React.CSSProperties
  variants?: Variants
  transition?: Transition
}

const defaultVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 18,
  mass: 0.3,
}

export function TextMorph({
  children,
  as = "p",
  className,
  style,
  variants,
  transition,
}: TextMorphProps) {
  const Component = as as React.ElementType<{
    className?: string
    style?: React.CSSProperties
    "aria-label"?: string
    children?: React.ReactNode
  }>
  const uniqueId = React.useId()

  const characters = React.useMemo(() => {
    const charCounts: Record<string, number> = {}

    return children.split("").map((char) => {
      const lowerChar = char.toLowerCase()
      charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1

      return {
        id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
        label: char === " " ? " " : char,
      }
    })
  }, [children, uniqueId])

  return (
    <Component className={cn(className)} aria-label={children} style={style}>
      <AnimatePresence mode="popLayout" initial={false}>
        {characters.map((character) => (
          <motion.span
            key={character.id}
            layoutId={character.id}
            className="inline-block"
            aria-hidden="true"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants || defaultVariants}
            transition={transition || defaultTransition}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  )
}
