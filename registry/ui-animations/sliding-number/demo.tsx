"use client"

import * as React from "react"

import { SlidingNumber } from "@/registry/ui-animations/sliding-number/sliding-number"

export default function SlidingNumberDemo() {
  const [value, setValue] = React.useState(100)

  return (
    <div className="flex flex-col items-start gap-2 p-10">
      <div className="font-mono text-sm text-muted-foreground">Current ARR</div>
      <div className="inline-flex items-center gap-1 font-mono text-2xl leading-none">
        ${<SlidingNumber value={value} />}
      </div>
      <input
        type="range"
        value={value}
        min={500}
        max={100000}
        step={50}
        onChange={(event) => setValue(Number(event.target.value))}
        className="mt-2 w-64 accent-foreground"
      />
    </div>
  )
}
