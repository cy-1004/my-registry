"use client"

import { Spotlight } from "@/registry/ui-animations/spotlight/spotlight"

export default function SpotlightDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-10">
      <div className="relative aspect-video h-[200px] rounded-sm border bg-background">
        <Spotlight
          className="from-blue-800 via-blue-600 to-blue-400 blur-xl"
          size={64}
        />
        <div className="absolute inset-0">
          <svg className="h-full w-full">
            <defs>
              <pattern
                id="spotlight-grid"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 4H4M4 4V0M4 4H8M4 4V8"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  className="stroke-background"
                />
                <rect
                  x="3"
                  y="3"
                  width="2"
                  height="2"
                  fill="currentColor"
                  fillOpacity="0.25"
                  className="fill-background"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#spotlight-grid)" />
          </svg>
        </div>
      </div>

      <div className="relative aspect-video h-[200px] overflow-hidden rounded-xl bg-muted p-px">
        <Spotlight
          className="from-blue-600 via-blue-500 to-blue-400 blur-3xl"
          size={124}
        />
        <div className="relative h-full w-full rounded-xl bg-background" />
      </div>
    </div>
  )
}
