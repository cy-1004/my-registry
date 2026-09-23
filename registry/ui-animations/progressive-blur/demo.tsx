"use client"

import * as React from "react"
import { motion } from "motion/react"

import { ProgressiveBlur } from "@/registry/ui-animations/progressive-blur/progressive-blur"

export default function ProgressiveBlurDemo() {
  const [isHover, setIsHover] = React.useState(false)

  return (
    <div className="p-10">
      <div
        className="relative aspect-square h-[300px] overflow-hidden rounded-sm"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/placeholder-b.svg"
          alt="Abstract gradient placeholder"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <ProgressiveBlur
          className="pointer-events-none absolute bottom-0 left-0 h-[75%] w-full"
          blurIntensity={0.5}
          animate={isHover ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0"
          animate={isHover ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="flex flex-col items-start gap-0 px-5 py-4">
            <p className="text-base font-medium text-white">John Martin</p>
            <span className="text-base text-zinc-300">Pandemonium</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
