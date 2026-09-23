"use client"

import { AnimeCharFlip } from "@/registry/ui-animations/anime-char-flip/anime-char-flip"

export default function AnimeCharFlipDemo() {
  return (
    <div className="flex items-center justify-center p-16">
      <AnimeCharFlip className="text-4xl font-semibold">
        ROTATING
      </AnimeCharFlip>
    </div>
  )
}
