"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { TextScramble } from "@/registry/ui-animations/text-scramble/text-scramble"

export default function TextScrambleDemo() {
  const [runId, setRunId] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-6 p-10">
      <TextScramble
        key={runId}
        className="font-mono text-sm"
        duration={1.2}
        characterSet=". "
      >
        Generating the interface...
      </TextScramble>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setRunId((id) => id + 1)}
      >
        Scramble
      </Button>
    </div>
  )
}
