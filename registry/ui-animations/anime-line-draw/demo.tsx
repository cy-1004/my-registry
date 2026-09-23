"use client"

import { AnimeLineDraw } from "@/registry/ui-animations/anime-line-draw/anime-line-draw"

const PATHS = [
  "M64 12 A52 52 0 1 1 63.9 12",
  "M40 52 L52 52",
  "M76 52 L88 52",
  "M40 84 Q64 104 88 84",
]

export default function AnimeLineDrawDemo() {
  return (
    <div className="flex items-center justify-center p-10">
      <AnimeLineDraw
        paths={PATHS}
        className="size-48 text-foreground"
        strokeWidth={3}
      />
    </div>
  )
}
