"use client"

import * as React from "react"
import gsap from "gsap"

import { cn } from "@/lib/utils"

type TweenMethod = "to" | "from" | "fromTo" | "set"

const METHODS: TweenMethod[] = ["to", "from", "fromTo", "set"]

const CODE_SNIPPETS: Record<TweenMethod, string> = {
  to: `gsap.to(".circle", {\n  x: 40,\n  fill: "blue",\n});`,
  from: `gsap.from(".circle", {\n  x: -40,\n  fill: "blue",\n});`,
  fromTo: `gsap.fromTo(".circle",\n  { x: -40, fill: "blue" },\n  { x: 40, fill: "green" }\n);`,
  set: `gsap.set(".circle", {\n  x: 40,\n  fill: "blue",\n});`,
}

interface GsapTweenMethodsProps {
  className?: string
}

export function GsapTweenMethods({ className }: GsapTweenMethodsProps) {
  const [method, setMethod] = React.useState<TweenMethod>("to")
  const previousMethod = React.useRef<TweenMethod>(method)
  const circleRef = React.useRef<SVGCircleElement>(null)
  const fromOutlineRef = React.useRef<SVGCircleElement>(null)
  const toOutlineRef = React.useRef<SVGCircleElement>(null)
  const timelineRef = React.useRef<gsap.core.Timeline | null>(null)

  React.useEffect(() => {
    timelineRef.current = gsap.timeline()
    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  React.useEffect(() => {
    const circle = circleRef.current
    const fromOutline = fromOutlineRef.current
    const toOutline = toOutlineRef.current
    const tl = timelineRef.current
    if (!circle || !fromOutline || !toOutline || !tl) return

    gsap.set(circle, { clearProps: "all" })
    gsap.set([fromOutline, toOutline], { autoAlpha: 0 })
    tl.clear()

    if (previousMethod.current === method) {
      // Skip on mount (and React Strict Mode's dev-only double effect
      // invocation) — only animate on an actual selection change.
      return
    }
    previousMethod.current = method

    switch (method) {
      case "to":
        tl.to(toOutline, { autoAlpha: 1 }).to(circle, {
          duration: 1.1,
          ease: "none",
          x: 40,
          fill: "#00bae2",
        })
        break
      case "set":
        tl.set(circle, { x: 40, fill: "#00bae2" }, "+=0.5")
        break
      case "from":
        tl.to(fromOutline, { autoAlpha: 1 }).from(circle, {
          duration: 1.1,
          ease: "none",
          x: -40,
          fill: "#00bae2",
        })
        break
      case "fromTo":
        tl.to([fromOutline, toOutline], {
          autoAlpha: 1,
          stagger: 0.25,
        }).fromTo(
          circle,
          { x: -40, fill: "#00bae2" },
          { duration: 1.5, ease: "none", x: 40, fill: "#0ae448" }
        )
        break
    }
  }, [method])

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-6 rounded-lg bg-[#0e100f] p-8",
        className
      )}
    >
      <div className="flex gap-4 text-sm text-white">
        {METHODS.map((m) => (
          <label key={m} className="flex cursor-pointer items-center gap-1.5">
            <input
              type="radio"
              name="tween-method"
              value={m}
              checked={method === m}
              onChange={() => setMethod(m)}
            />
            {m}
          </label>
        ))}
      </div>
      <svg viewBox="0 0 100 20" className="w-full max-w-md overflow-visible">
        <circle
          ref={fromOutlineRef}
          stroke="grey"
          fill="none"
          strokeDasharray="1.2"
          strokeWidth="0.3"
          cx="10"
          cy="10"
          r="9.7"
        />
        <circle
          stroke="grey"
          fill="none"
          strokeDasharray="1.2"
          strokeWidth="0.3"
          cx="50"
          cy="10"
          r="9.7"
        />
        <circle
          ref={toOutlineRef}
          stroke="grey"
          fill="none"
          strokeDasharray="1.2"
          strokeWidth="0.3"
          cx="90"
          cy="10"
          r="9.7"
        />
        <circle
          ref={circleRef}
          strokeWidth="0.3"
          fill="#0ae448"
          cx="50"
          cy="10"
          r="10"
        />
      </svg>
      <pre className="min-h-[80px] w-full max-w-full overflow-x-auto rounded-md bg-black/40 p-4 text-xs text-emerald-300">
        {CODE_SNIPPETS[method]}
      </pre>
    </div>
  )
}
