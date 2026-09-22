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
