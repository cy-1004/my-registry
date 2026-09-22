"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
  scroller?: Element | string
}

export function ScrollParallaxImage({
  src,
  alt,
  className,
  speed = 0.3,
  scroller,
}: ScrollParallaxImageProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const imageRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    const wrapper = wrapperRef.current
    const image = imageRef.current
    if (!wrapper || !image) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            scroller,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [speed, scroller])

  return (
    <div ref={wrapperRef} className={cn("relative overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="h-[130%] w-full scale-110 object-cover"
      />
    </div>
  )
}
