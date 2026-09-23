"use client"

import {
  ThoughtChain,
  type ThoughtStep,
} from "@/registry/ai/thought-chain/thought-chain"

const ITEMS: ThoughtStep[] = [
  {
    title: "Knowledge Query",
    description: "Query knowledge base",
    status: "done",
  },
  {
    title: "Web Search Tool Invoked",
    description: "Tool invocation",
    status: "done",
  },
  {
    title: "Model Invocation Complete",
    description: "Invoke model for response",
    status: "done",
  },
  {
    title: "Response Complete",
    description: "Task completed",
    status: "active",
    blink: true,
  },
]

export default function ThoughtChainDemo() {
  return (
    <div className="p-10">
      <div className="w-[400px] max-w-full rounded-lg border bg-card p-5">
        <ThoughtChain items={ITEMS} />
      </div>
    </div>
  )
}
