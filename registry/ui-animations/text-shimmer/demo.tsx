"use client"

import { TextShimmer } from "@/registry/ui-animations/text-shimmer/text-shimmer"

export default function TextShimmerDemo() {
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <TextShimmer duration={1.2} className="text-xl font-medium">
        Hi, how are you?
      </TextShimmer>
      <TextShimmer
        duration={1.2}
        className="text-xl font-medium [--base-color:var(--color-blue-600)] [--base-gradient-color:var(--color-blue-200)] dark:[--base-color:var(--color-blue-700)] dark:[--base-gradient-color:var(--color-blue-400)]"
      >
        Hi, how are you?
      </TextShimmer>
    </div>
  )
}
