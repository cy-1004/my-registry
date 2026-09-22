"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollFadeSectionProps {
  children: React.ReactNode
  className?: string
  y?: number
  scroller?: Element | string
}

export function ScrollFadeSection({
  children,
  className,
  y = 40,
  scroller,
}: ScrollFadeSectionProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [y, scroller])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
