"use client"

import * as React from "react"
import { motion } from "motion/react"

import { GlowEffect } from "@/registry/ui-animations/glow-effect/glow-effect"
import { TextMorph } from "@/registry/ui-animations/text-morph/text-morph"

export default function GlowEffectDemo() {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div className="p-10">
      <div className="relative h-[200px] w-[300px]">
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <GlowEffect
            colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
            mode="colorShift"
            blur="medium"
            duration={4}
          />
        </motion.div>
        <div className="relative flex h-full flex-col items-end justify-end rounded-md border bg-card px-4 py-3">
          <button
            className="relative ml-1 flex h-8 scale-100 appearance-none items-center justify-center overflow-hidden rounded-lg border bg-background px-2 text-sm select-none focus-visible:ring-2 active:scale-[0.96]"
            type="button"
            aria-label="Submit"
            onClick={() => setIsVisible((visible) => !visible)}
          >
            <TextMorph>{isVisible ? "Submitting..." : "Submit"}</TextMorph>
          </button>
        </div>
      </div>
    </div>
  )
}
