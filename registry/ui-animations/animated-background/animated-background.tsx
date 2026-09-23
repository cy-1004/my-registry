"use client"

// Adapted from motion-primitives (MIT) — https://motion-primitives.com

import * as React from "react"
import { AnimatePresence, motion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"

type AnimatedBackgroundChildProps = {
  "data-id": string
  "data-checked"?: string
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

type AnimatedBackgroundChild =
  React.ReactElement<AnimatedBackgroundChildProps>

interface AnimatedBackgroundProps {
  children: AnimatedBackgroundChild[] | AnimatedBackgroundChild
  defaultValue?: string
  onValueChange?: (activeId: string | null) => void
  className?: string
  transition?: Transition
  enableHover?: boolean
}

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = React.useState<string | null>(
    defaultValue ?? null
  )
  const [lastDefaultValue, setLastDefaultValue] = React.useState(defaultValue)
  const uniqueId = React.useId()

  // Follow `defaultValue` when the parent changes it, adjusted during render
  // rather than in an effect to avoid a cascading second render.
  if (defaultValue !== lastDefaultValue) {
    setLastDefaultValue(defaultValue)
    setActiveId(defaultValue ?? null)
  }

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id)
    onValueChange?.(id)
  }

  return React.Children.map(children, (child, index) => {
    const id = child.props["data-id"]

    const interactionProps = enableHover
      ? {
          onMouseEnter: () => handleSetActiveId(id),
          onMouseLeave: () => handleSetActiveId(null),
        }
      : {
          onClick: () => handleSetActiveId(id),
        }

    return React.cloneElement(
      child,
      {
        key: index,
        className: cn("relative inline-flex", child.props.className),
        "data-checked": activeId === id ? "true" : "false",
        ...interactionProps,
      },
      <>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              className={cn("absolute inset-0", className)}
              transition={transition}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        <div className="z-10">{child.props.children}</div>
      </>
    )
  })
}
