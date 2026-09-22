"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { CATEGORIES, getByCategory } from "@/lib/registry"
import { cn } from "@/lib/utils"

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-6">
      {CATEGORIES.map((category) => {
        const items = getByCategory(category.slug)
        if (items.length === 0) return null

        return (
          <div key={category.slug}>
            <h3 className="mb-2 px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {category.label}
            </h3>
            <ul className="space-y-1">
              {items.map((item) => {
                const href = `/docs/${category.slug}/${item.name}`
                const active = pathname === href

                return (
                  <li key={item.name}>
                    <Link
                      href={href}
                      className={cn(
                        "block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground",
                        active
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}
