"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  AnimeScrambleText,
  type AnimeScrambleTextHandle,
} from "@/registry/ui-animations/anime-scramble-text/anime-scramble-text"

const CURSORS = ["_____", "░▒▓█", "😀"]

export default function AnimeScrambleTextDemo() {
  const [cursorIndex, setCursorIndex] = React.useState(0)
  const ref = React.useRef<AnimeScrambleTextHandle>(null)

  return (
    <div className="flex flex-col items-center gap-6 p-10">
      <AnimeScrambleText
        key={cursorIndex}
        ref={ref}
        cursor={CURSORS[cursorIndex]}
        className="font-mono text-lg"
      >
        Scrambling into place
      </AnimeScrambleText>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {CURSORS.map((cursor, index) => (
          <Button
            key={cursor}
            size="sm"
            variant={index === cursorIndex ? "default" : "outline"}
            onClick={() => {
              if (index === cursorIndex) {
                ref.current?.play()
              } else {
                setCursorIndex(index)
              }
            }}
          >
            {cursor}
          </Button>
        ))}
      </div>
    </div>
  )
}
