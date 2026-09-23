"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { TextEffect } from "@/registry/ui-animations/text-effect/text-effect"

export default function TextEffectDemo() {
  const [trigger, setTrigger] = React.useState(true)

  const replay = () => {
    setTrigger(false)
    setTimeout(() => setTrigger(true), 300)
  }

  return (
    <div className="flex flex-col items-center gap-6 p-10">
      <TextEffect
        per="char"
        preset="fade"
        trigger={trigger}
        className="text-center text-2xl font-medium"
      >
        Animate your ideas with motion
      </TextEffect>
      <Button size="sm" variant="outline" onClick={replay}>
        Replay
      </Button>
    </div>
  )
}
