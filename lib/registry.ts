import registryData from "@/registry.json"

export interface RegistryFile {
  path: string
  type: string
  target?: string
}

export interface RegistryItem {
  name: string
  type: string
  title: string
  description: string
  categories: string[]
  dependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
}

export const CATEGORIES = [
  { slug: "ui-animations", label: "UI Animations" },
  { slug: "scroll", label: "Scroll & Timeline" },
  { slug: "lottie", label: "Lottie" },
  { slug: "three", label: "3D / Three.js" },
] as const

export type CategorySlug = (typeof CATEGORIES)[number]["slug"]

const items = registryData.items as RegistryItem[]

export const REGISTRY_BASE_URL = registryData.homepage

export function getItems(): RegistryItem[] {
  return items.filter((item) =>
    CATEGORIES.some((category) => item.categories.includes(category.slug))
  )
}

export function getByCategory(category: string): RegistryItem[] {
  return getItems().filter((item) => item.categories.includes(category))
}

export function getItem(name: string): RegistryItem | undefined {
  return items.find((item) => item.name === name)
}

export function getCategoryLabel(slug: string): string {
  return CATEGORIES.find((category) => category.slug === slug)?.label ?? slug
}
