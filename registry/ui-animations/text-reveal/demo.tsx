"use client"

import { TextReveal } from "@/registry/ui-animations/text-reveal/text-reveal"

export default function TextRevealDemo() {
  return (
    <div className="p-10">
      <TextReveal
        text="Build once, reuse everywhere."
        className="text-3xl font-semibold"
      />
    </div>
  )
}
