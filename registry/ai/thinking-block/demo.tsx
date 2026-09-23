"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { ThinkingBlock } from "@/registry/ai/thinking-block/thinking-block"

export default function ThinkingBlockDemo() {
  const [loading, setLoading] = React.useState(false)

  const run = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2500)
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4 p-10">
      <div>
        <Button size="sm" variant="outline" onClick={run}>
          Run
        </Button>
      </div>

      <ThinkingBlock
        title={loading ? "Thinking…" : "Thought for 2s"}
        loading={loading}
        blink={loading}
      >
        Looked up the registry schema, then checked which fields the CLI reads
        when resolving an item.
      </ThinkingBlock>
    </div>
  )
}
