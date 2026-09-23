"use client"

import { TextShimmerWave } from "@/registry/ui-animations/text-shimmer-wave/text-shimmer-wave"

export default function TextShimmerWaveDemo() {
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <TextShimmerWave className="font-mono text-sm" duration={1}>
        Creating the perfect dish...
      </TextShimmerWave>
      <TextShimmerWave
        className="font-mono text-sm [--base-color:#0D74CE] [--base-gradient-color:#5EB1EF]"
        duration={1}
        spread={1}
        zDistance={1}
        scaleDistance={1.1}
        rotateYDistance={20}
      >
        Creating the perfect dish...
      </TextShimmerWave>
    </div>
  )
}
