"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

interface ThinkingBlockProps {
  title: string
  children: React.ReactNode
  /** Shows the running state: a spinning icon and a blinking title. */
  loading?: boolean
  /** Adds the blinking caret at the end of the title. */
  blink?: boolean
  icon?: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function ThinkingBlock({
  title,
  children,
  loading = false,
  blink = false,
  icon,
  defaultOpen = true,
  className,
}: ThinkingBlockProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <div className={cn("w-full rounded-lg border bg-card", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm"
      >
        <span
          className={cn(
            "flex size-4 shrink-0 items-center justify-center text-muted-foreground",
            loading && "animate-spin"
          )}
        >
          {icon ?? <Sparkles className="size-4" />}
        </span>

        <span
          className={cn(
            "flex-1 font-medium",
            loading && "animate-pulse text-muted-foreground"
          )}
        >
          {title}
          {blink && (
            <motion.span
              aria-hidden="true"
              className="ml-1 inline-block h-3.5 w-[2px] translate-y-0.5 bg-current"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </span>

        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t px-3 py-2 text-sm text-muted-foreground">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
