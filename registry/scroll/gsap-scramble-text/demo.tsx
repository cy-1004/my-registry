"use client"

import {
  GsapScrambleText,
  type ScrambleSegment,
} from "@/registry/scroll/gsap-scramble-text/gsap-scramble-text"

const SEGMENTS: ScrambleSegment[] = [
  { text: "Mix it up with ScrambleText.", chars: "lowerCase", duration: 2 },
  { text: "Animate using characters,", chars: "XO", speed: 0.4, duration: 2 },
  { text: "numbers,", chars: "0123456789", duration: 2 },
  { text: "UPPERCASE", chars: "upperCase", speed: 0.3, duration: 1 },
  { text: "or lowercase.", chars: "lowerCase", speed: 0.3, duration: 1.5 },
]

export default function GsapScrambleTextDemo() {
  return (
    <div className="flex w-full items-center justify-center rounded-lg bg-[#0e100f] p-10">
      <GsapScrambleText
        segments={SEGMENTS}
        className="max-w-[40ch] text-center font-mono text-2xl leading-tight font-semibold text-[#dfdcff]"
      />
    </div>
  )
}
