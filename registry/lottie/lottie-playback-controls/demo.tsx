"use client"

import { LottiePlaybackControls } from "@/registry/lottie/lottie-playback-controls/lottie-playback-controls"

import demoAnimation from "./demo-animation.json"

export default function LottiePlaybackControlsDemo() {
  return (
    <div className="flex items-center justify-center p-10">
      <LottiePlaybackControls src={demoAnimation} />
    </div>
  )
}
