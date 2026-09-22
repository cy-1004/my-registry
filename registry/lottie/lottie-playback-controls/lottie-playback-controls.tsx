"use client"

import * as React from "react"
import { Lottie, type LottieHandle } from "lottie-react"
import { Pause, Play, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LottiePlaybackControlsProps {
  src: string | object
  className?: string
}

export function LottiePlaybackControls({
  src,
  className,
}: LottiePlaybackControlsProps) {
  const lottieRef = React.useRef<LottieHandle>(null)
  const [playing, setPlaying] = React.useState(true)

  const togglePlay = () => {
    if (playing) {
      lottieRef.current?.pause()
    } else {
      lottieRef.current?.play()
    }
    setPlaying(!playing)
  }

  const restart = () => {
    lottieRef.current?.seek(0)
    lottieRef.current?.play()
    setPlaying(true)
  }

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="h-32 w-32">
        <Lottie lottieRef={lottieRef} src={src} loop />
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" onClick={togglePlay}>
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </Button>
        <Button size="icon" variant="outline" onClick={restart}>
          <RotateCcw className="size-4" />
        </Button>
      </div>
    </div>
  )
}
