"use client"

import { GsapMorphSvg } from "@/registry/scroll/gsap-morph-svg/gsap-morph-svg"

const DIAMOND = "M50,1l49,49L50,99L1,50L50,1z"
const LIGHTNING =
  "M47.1,0.8 73.3,0.8 61.9,37.2 77.1,37.2 30.7,99.4 45.8,51.9 29,51.9z"
const SPEECH = "M20,1 85,1 85,66 51,98 51,66 20,66z"
const GRID =
  "M2 4H34.1774V35.4113H64.8226V4H97V36.1774H65.5887V66.8226H97V99H64.8226V67.5887H34.1774V99H2V66.8226H33.4113V36.1774H2V4Z"
const FLOWER =
  "M74.6 50.2h-.2v-.4h.2a24.4 24.4 0 1 0-24.4-24.4v.2h-.4v-.2a24.4 24.4 0 1 0-24.4 24.4h.2v.4h-.2a24.4 24.4 0 1 0 24.4 24.4v-.2h.4v.2a24.4 24.4 0 1 0 24.4-24.4z"

export default function GsapMorphSvgDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-10 rounded-lg bg-[#0e100f] p-10">
      <GsapMorphSvg paths={[DIAMOND, LIGHTNING]} className="h-40 w-40" />
      <GsapMorphSvg
        paths={[FLOWER, SPEECH, LIGHTNING, GRID, DIAMOND]}
        className="h-40 w-40"
        gradientFrom="rgb(120, 200, 255)"
        gradientTo="rgb(200, 150, 255)"
      />
    </div>
  )
}
