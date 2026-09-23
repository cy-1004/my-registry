"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  GsapSplitText,
  type GsapSplitTextHandle,
} from "@/registry/scroll/gsap-split-text/gsap-split-text"

export default function GsapSplitTextDemo() {
  const ref = React.useRef<GsapSplitTextHandle>(null)

  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-lg bg-[#0e100f] p-10">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm" variant="outline" onClick={() => ref.current?.play("chars")}>
          Characters
        </Button>
        <Button size="sm" variant="outline" onClick={() => ref.current?.play("words")}>
          Words
        </Button>
        <Button size="sm" variant="outline" onClick={() => ref.current?.play("lines")}>
          Lines
        </Button>
      </div>
      <GsapSplitText
        ref={ref}
        initialMode="chars"
        className="max-w-[24ch] text-center text-2xl leading-tight text-[#dfdcff]"
      >
        Break apart HTML text into characters, words, and/or lines for easy
        animation.
      </GsapSplitText>
    </div>
  )
}
