"use client"

import * as React from "react"

import { ScrollFadeSection } from "@/registry/scroll/scroll-fade-section/scroll-fade-section"

export default function ScrollFadeSectionDemo() {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(
    null
  )

  return (
    <div
      ref={setContainer}
      className="h-[360px] overflow-y-auto rounded-md border p-6"
    >
      <div className="h-[160px]" />
      {[1, 2, 3].map((i) => (
        <ScrollFadeSection
          key={i}
          scroller={container ?? undefined}
          className="mb-24 rounded-md border bg-card p-6 text-card-foreground"
        >
          <p className="font-medium">Section {i}</p>
          <p className="text-sm text-muted-foreground">
            Scroll inside this box to see it fade and rise into view.
          </p>
        </ScrollFadeSection>
      ))}
      <div className="h-[80px]" />
    </div>
  )
}
