"use client"

import * as React from "react"

import { ScrollParallaxImage } from "@/registry/scroll/scroll-parallax-image/scroll-parallax-image"

export default function ScrollParallaxImageDemo() {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(
    null
  )

  return (
    <div
      ref={setContainer}
      className="h-[360px] space-y-6 overflow-y-auto rounded-md border p-6"
    >
      <div className="h-[80px]" />
      <ScrollParallaxImage
        src="/images/placeholder-a.svg"
        alt="Abstract gradient placeholder"
        scroller={container ?? undefined}
        className="h-56 rounded-md"
      />
      <ScrollParallaxImage
        src="/images/placeholder-b.svg"
        alt="Abstract gradient placeholder"
        scroller={container ?? undefined}
        className="h-56 rounded-md"
      />
      <div className="h-[80px]" />
    </div>
  )
}
