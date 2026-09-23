"use client"

import * as React from "react"
import { animate, scrambleText } from "animejs"

import { cn } from "@/lib/utils"

export type AnimeScrambleTextHandle = {
  /** Replays the scramble, optionally revealing different text. */
  play: (text?: string) => void
}

const TAGS = {
  p: "p",
  span: "span",
  div: "div",
  h1: "h1",
  h2: "h2",
  h3: "h3",
} as const

export type AnimeScrambleTag = keyof typeof TAGS

interface AnimeScrambleTextProps {
  children: string
  as?: AnimeScrambleTag
  className?: string
  /**
   * Characters used while scrambling. Accepts named sets ("lowercase",
   * "uppercase", "numbers", "symbols", "braille", "blocks", "shades") or
   * range syntax such as "A-Z" / "a-z0-9".
   */
  chars?: string
  /** Glyph(s) shown at the leading edge of the reveal wave. */
  cursor?: boolean | number | string
  /** Where the reveal starts from. */
  from?: number | "left" | "center" | "right" | "random" | "auto"
  /** Reveals from the edges inward instead of outward. */
  reversed?: boolean
  /** Random timing jitter per character, for a less mechanical reveal. */
  perturbation?: number
  /** Fixes the random sequence, so the scramble is reproducible. */
  seed?: number
  /** Characters per second entering the reveal wave. */
  revealRate?: number
  /** How long each character scrambles before settling, in ms. */
  settleDuration?: number
  /** Runs once on mount. */
  playOnMount?: boolean
}

export const AnimeScrambleText = React.forwardRef<
  AnimeScrambleTextHandle,
  AnimeScrambleTextProps
>(function AnimeScrambleText(
  {
    children,
    as = "p",
    className,
    chars,
    cursor,
    from,
    reversed,
    perturbation,
    seed,
    revealRate,
    settleDuration,
    playOnMount = true,
  },
  ref
) {
  const Tag = TAGS[as]
  const elementRef = React.useRef<HTMLElement>(null)

  // Read through a ref so a replay always uses the latest settings without
  // the caller having to memoise anything.
  const optionsRef = React.useRef({
    chars,
    cursor,
    from,
    reversed,
    perturbation,
    seed,
    revealRate,
    settleDuration,
  })
  optionsRef.current = {
    chars,
    cursor,
    from,
    reversed,
    perturbation,
    seed,
    revealRate,
    settleDuration,
  }

  const play = React.useCallback((text?: string) => {
    const element = elementRef.current
    if (!element) return

    const options = optionsRef.current

    animate(element, {
      innerHTML: scrambleText({
        ...(text !== undefined ? { text } : {}),
        ...(options.chars !== undefined ? { chars: options.chars } : {}),
        ...(options.cursor !== undefined ? { cursor: options.cursor } : {}),
        ...(options.from !== undefined ? { from: options.from } : {}),
        ...(options.reversed !== undefined
          ? { reversed: options.reversed }
          : {}),
        ...(options.perturbation !== undefined
          ? { perturbation: options.perturbation }
          : {}),
        ...(options.seed !== undefined ? { seed: options.seed } : {}),
        ...(options.revealRate !== undefined
          ? { revealRate: options.revealRate }
          : {}),
        ...(options.settleDuration !== undefined
          ? { settleDuration: options.settleDuration }
          : {}),
      }),
    })
  }, [])

  React.useImperativeHandle(ref, () => ({ play }), [play])

  React.useEffect(() => {
    if (playOnMount) {
      play()
    }
  }, [playOnMount, play, children])

  return (
    <Tag
      ref={elementRef as React.Ref<HTMLParagraphElement>}
      className={cn(className)}
    >
      {children}
    </Tag>
  )
})
