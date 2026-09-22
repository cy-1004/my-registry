"use client"

import * as React from "react"
import { Lottie, type LottieHandle } from "lottie-react"

import { cn } from "@/lib/utils"

interface LottieHoverPlayerProps {
  src: string | object
  className?: string
  loop?: boolean
}

export function LottieHoverPlayer({
  src,
  className,
  loop = true,
}: LottieHoverPlayerProps) {
  const lottieRef = React.useRef<LottieHandle>(null)

  return (
    <div
      className={cn("h-32 w-32", className)}
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
    >
      <Lottie
        lottieRef={lottieRef}
        src={src}
        loop={loop}
        autoplay={false}
        className="h-full w-full"
      />
    </div>
  )
}
