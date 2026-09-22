"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { AnimatedButton } from "@/registry/ui-animations/animated-button/animated-button"
import { cn } from "@/lib/utils"

interface ModalTransitionProps {
  triggerLabel?: string
  title: string
  description?: string
  children?: React.ReactNode
}

export function ModalTransition({
  triggerLabel = "Open modal",
  title,
  description,
  children,
}: ModalTransitionProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <AnimatedButton onClick={() => setOpen(true)}>
        {triggerLabel}
      </AnimatedButton>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className={cn(
                "w-full max-w-md rounded-lg border bg-background p-6 shadow-lg"
              )}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <h2 className="text-lg font-semibold">{title}</h2>
              {description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
              {children}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
