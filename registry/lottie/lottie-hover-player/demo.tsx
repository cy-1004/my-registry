"use client"

import { LottieHoverPlayer } from "@/registry/lottie/lottie-hover-player/lottie-hover-player"

import demoAnimation from "./demo-animation.json"

export default function LottieHoverPlayerDemo() {
  return (
    <div className="flex flex-col items-center gap-3 p-10">
      <LottieHoverPlayer src={demoAnimation} />
      <p className="text-sm text-muted-foreground">Hover to play</p>
    </div>
  )
}
