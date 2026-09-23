"use client"

import { AnimeSvgDistort } from "@/registry/ui-animations/anime-svg-distort/anime-svg-distort"

export default function AnimeSvgDistortDemo() {
  return (
    <div className="flex items-center justify-center p-10">
      <AnimeSvgDistort className="size-48 text-foreground" />
    </div>
  )
}
