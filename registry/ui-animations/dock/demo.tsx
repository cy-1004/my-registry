"use client"

import {
  Activity,
  Component,
  HomeIcon,
  Mail,
  Package,
  ScrollText,
  SunMoon,
} from "lucide-react"

import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
} from "@/registry/ui-animations/dock/dock"

const ITEMS = [
  { title: "Home", icon: HomeIcon },
  { title: "Products", icon: Package },
  { title: "Components", icon: Component },
  { title: "Activity", icon: Activity },
  { title: "Change Log", icon: ScrollText },
  { title: "Email", icon: Mail },
  { title: "Theme", icon: SunMoon },
]

export default function DockDemo() {
  return (
    <div className="flex w-full items-end justify-center pt-16 pb-4">
      <Dock className="items-end pb-3">
        {ITEMS.map((item) => (
          <DockItem
            key={item.title}
            className="aspect-square rounded-full bg-background"
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>
              <item.icon className="h-full w-full text-muted-foreground" />
            </DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  )
}
