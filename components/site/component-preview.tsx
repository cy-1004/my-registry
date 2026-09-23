"use client"

import * as React from "react"
import dynamic from "next/dynamic"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const DEMOS: Record<string, React.ComponentType> = {
  "animated-button": dynamic(
    () => import("@/registry/ui-animations/animated-button/demo"),
    { ssr: false }
  ),
  "text-reveal": dynamic(
    () => import("@/registry/ui-animations/text-reveal/demo"),
    { ssr: false }
  ),
  "modal-transition": dynamic(
    () => import("@/registry/ui-animations/modal-transition/demo"),
    { ssr: false }
  ),
  "scroll-fade-section": dynamic(
    () => import("@/registry/scroll/scroll-fade-section/demo"),
    { ssr: false }
  ),
  "scroll-parallax-image": dynamic(
    () => import("@/registry/scroll/scroll-parallax-image/demo"),
    { ssr: false }
  ),
  "lottie-hover-player": dynamic(
    () => import("@/registry/lottie/lottie-hover-player/demo"),
    { ssr: false }
  ),
  "lottie-playback-controls": dynamic(
    () => import("@/registry/lottie/lottie-playback-controls/demo"),
    { ssr: false }
  ),
  "rotating-hero-scene": dynamic(
    () => import("@/registry/three/rotating-hero-scene/demo"),
    { ssr: false }
  ),
  "particle-field-background": dynamic(
    () => import("@/registry/three/particle-field-background/demo"),
    { ssr: false }
  ),
  "gsap-tween-methods": dynamic(
    () => import("@/registry/scroll/gsap-tween-methods/demo"),
    { ssr: false }
  ),
  "animated-background": dynamic(
    () => import("@/registry/ui-animations/animated-background/demo"),
    { ssr: false }
  ),
  "text-effect": dynamic(
    () => import("@/registry/ui-animations/text-effect/demo"),
    { ssr: false }
  ),
  "text-scramble": dynamic(
    () => import("@/registry/ui-animations/text-scramble/demo"),
    { ssr: false }
  ),
  "text-shimmer": dynamic(
    () => import("@/registry/ui-animations/text-shimmer/demo"),
    { ssr: false }
  ),
  "text-shimmer-wave": dynamic(
    () => import("@/registry/ui-animations/text-shimmer-wave/demo"),
    { ssr: false }
  ),
  "sliding-number": dynamic(
    () => import("@/registry/ui-animations/sliding-number/demo"),
    { ssr: false }
  ),
  "dock": dynamic(
    () => import("@/registry/ui-animations/dock/demo"),
    { ssr: false }
  ),
  "text-morph": dynamic(
    () => import("@/registry/ui-animations/text-morph/demo"),
    { ssr: false }
  ),
  "glow-effect": dynamic(
    () => import("@/registry/ui-animations/glow-effect/demo"),
    { ssr: false }
  ),
  "spotlight": dynamic(
    () => import("@/registry/ui-animations/spotlight/demo"),
    { ssr: false }
  ),
  "magnetic": dynamic(
    () => import("@/registry/ui-animations/magnetic/demo"),
    { ssr: false }
  ),
  "morphing-dialog": dynamic(
    () => import("@/registry/ui-animations/morphing-dialog/demo"),
    { ssr: false }
  ),
  "progressive-blur": dynamic(
    () => import("@/registry/ui-animations/progressive-blur/demo"),
    { ssr: false }
  ),
  "gsap-scramble-text": dynamic(
    () => import("@/registry/scroll/gsap-scramble-text/demo"),
    { ssr: false }
  ),
  "gsap-morph-svg": dynamic(
    () => import("@/registry/scroll/gsap-morph-svg/demo"),
    { ssr: false }
  ),
  "gsap-split-text": dynamic(
    () => import("@/registry/scroll/gsap-split-text/demo"),
    { ssr: false }
  ),
  "thinking-block": dynamic(
    () => import("@/registry/ai/thinking-block/demo"),
    { ssr: false }
  ),
  "thought-chain": dynamic(
    () => import("@/registry/ai/thought-chain/demo"),
    { ssr: false }
  ),
  "anime-text-bounce": dynamic(
    () => import("@/registry/ui-animations/anime-text-bounce/demo"),
    { ssr: false }
  ),
  "anime-svg-distort": dynamic(
    () => import("@/registry/ui-animations/anime-svg-distort/demo"),
    { ssr: false }
  ),
  "anime-line-draw": dynamic(
    () => import("@/registry/ui-animations/anime-line-draw/demo"),
    { ssr: false }
  ),
  "anime-char-flip": dynamic(
    () => import("@/registry/ui-animations/anime-char-flip/demo"),
    { ssr: false }
  ),
  "anime-three-spheres": dynamic(
    () => import("@/registry/three/anime-three-spheres/demo"),
    { ssr: false }
  ),
  "anime-three-cube-grid": dynamic(
    () => import("@/registry/three/anime-three-cube-grid/demo"),
    { ssr: false }
  ),
}

interface ComponentPreviewProps {
  name: string
  code: React.ReactNode
  install: React.ReactNode
}

export function ComponentPreview({ name, code, install }: ComponentPreviewProps) {
  const Demo = DEMOS[name]

  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="install">Install</TabsTrigger>
      </TabsList>
      <TabsContent
        value="preview"
        className="flex min-h-[200px] items-center justify-center rounded-lg border"
      >
        {Demo ? (
          <Demo />
        ) : (
          <p className="p-10 text-sm text-muted-foreground">
            No preview available.
          </p>
        )}
      </TabsContent>
      <TabsContent value="code">{code}</TabsContent>
      <TabsContent value="install">{install}</TabsContent>
    </Tabs>
  )
}
