"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { TextMorph } from "@/registry/ui-animations/text-morph/text-morph"

const PHRASES = ["Submit", "Submitting...", "Submitted"]

export default function TextMorphDemo() {
  const [index, setIndex] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-6 p-10">
      <TextMorph className="text-2xl font-medium">{PHRASES[index]}</TextMorph>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setIndex((i) => (i + 1) % PHRASES.length)}
      >
        Morph
      </Button>
    </div>
  )
}
