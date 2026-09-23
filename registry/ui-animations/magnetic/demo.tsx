"use client"

import { Magnetic } from "@/registry/ui-animations/magnetic/magnetic"

const springOptions = { bounce: 0.1 }

export default function MagneticDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 p-16">
      <Magnetic>
        <button
          type="button"
          className="inline-flex items-center rounded-md border bg-transparent px-4 py-2 text-sm transition-all duration-300 hover:bg-muted"
        >
          <span>Submit</span>
        </button>
      </Magnetic>

      <Magnetic
        intensity={0.2}
        springOptions={springOptions}
        actionArea="global"
        range={200}
      >
        <button
          type="button"
          className="inline-flex items-center rounded-lg border bg-muted px-4 py-2 text-sm transition-all duration-200 hover:bg-accent"
        >
          <Magnetic
            intensity={0.1}
            springOptions={springOptions}
            actionArea="global"
            range={200}
          >
            <span>Nested</span>
          </Magnetic>
        </button>
      </Magnetic>
    </div>
  )
}
