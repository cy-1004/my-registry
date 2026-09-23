"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { AnimeWords3D } from "@/registry/ui-animations/anime-words-3d/anime-words-3d"

export default function AnimeWords3DDemo() {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <div className="flex flex-col items-center gap-8 p-16">
      <AnimeWords3D
        expanded={expanded}
        className="max-w-[28ch] text-center text-2xl font-medium"
      >
        Each word lifts off the page on its own timing.
      </AnimeWords3D>

      <Button
        size="sm"
        variant="outline"
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Collapse" : "Expand"}
      </Button>
    </div>
  )
}
