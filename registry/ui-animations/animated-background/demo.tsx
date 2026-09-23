"use client"

import { AnimatedBackground } from "@/registry/ui-animations/animated-background/animated-background"

const ITEMS = [
  { title: "Dialog", description: "Enhances modal presentations." },
  { title: "Popover", description: "For small interactive overlays." },
  {
    title: "Accordion",
    description: "Collapsible sections for more content.",
  },
  {
    title: "Collapsible",
    description: "Collapsible sections for more content.",
  },
  {
    title: "Drag to Reorder",
    description: "Reorder items with drag and drop.",
  },
  {
    title: "Swipe to Delete",
    description: "Delete items with swipe gestures.",
  },
]

export default function AnimatedBackgroundDemo() {
  return (
    <div className="grid grid-cols-2 p-10 md:grid-cols-3">
      <AnimatedBackground
        className="rounded-lg bg-foreground/10"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        enableHover
      >
        {ITEMS.map((item, index) => (
          <div key={index} data-id={`card-${index}`}>
            <div className="flex select-none flex-col space-y-1 p-4">
              <h3 className="text-base font-medium text-foreground">
                {item.title}
              </h3>
              <p className="text-base text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </AnimatedBackground>
    </div>
  )
}
