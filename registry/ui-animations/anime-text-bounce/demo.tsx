"use client"

import { AnimeTextBounce } from "@/registry/ui-animations/anime-text-bounce/anime-text-bounce"

export default function AnimeTextBounceDemo() {
  return (
    <div className="flex items-center justify-center px-10 py-20">
      <AnimeTextBounce className="text-4xl font-semibold">
        Bounce
      </AnimeTextBounce>
    </div>
  )
}
