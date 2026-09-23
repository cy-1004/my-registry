"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Check, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

export type ThoughtStatus = "done" | "active" | "pending"

export type ThoughtStep = {
  title: string
  description?: string
  status?: ThoughtStatus
  /** Pulses the step's dot, for the step currently being worked on. */
  blink?: boolean
}

interface ThoughtChainProps {
  items: ThoughtStep[]
  className?: string
}

export function ThoughtChain({ items, className }: ThoughtChainProps) {
  return (
    <ol className={cn("relative", className)}>
      {items.map((item, index) => {
        const status = item.status ?? "done"
        const isLast = index === items.length - 1

        return (
          <li key={index} className="relative flex gap-3 pb-6 last:pb-0">
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute top-6 left-[11px] h-[calc(100%-1.5rem)] w-px bg-border"
              />
            )}

            <span
              className={cn(
                "relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border bg-background",
                status === "done" && "border-foreground/30",
                status === "active" && "border-foreground",
                status === "pending" && "border-dashed"
              )}
            >
              {item.blink && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-foreground/20"
                  animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.6, 1] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              {status === "done" && <Check className="size-3.5" />}
              {status === "active" && (
                <Loader2 className="size-3.5 animate-spin" />
              )}
              {status === "pending" && (
                <span className="size-1.5 rounded-full bg-muted-foreground" />
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{item.title}</p>
              {item.description && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
