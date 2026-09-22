import { notFound } from "next/navigation"

import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { InstallTabs } from "@/components/site/install-tabs"
import { getComponentSource } from "@/lib/get-component-source"
import { getItems, getItem, REGISTRY_BASE_URL } from "@/lib/registry"

interface PageProps {
  params: Promise<{ category: string; component: string }>
}

export function generateStaticParams() {
  return getItems().map((item) => ({
    category: item.categories[0],
    component: item.name,
  }))
}

export default async function ComponentPage({ params }: PageProps) {
  const { category, component } = await params
  const item = getItem(component)

  if (!item || item.categories[0] !== category) {
    notFound()
  }

  const source = getComponentSource(item.files[0].path)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{item.title}</h1>
        <p className="mt-2 text-muted-foreground">{item.description}</p>
      </div>
      <ComponentPreview
        name={item.name}
        code={<CodeBlock code={source} lang="tsx" />}
        install={
          <InstallTabs item={item} source={source} baseUrl={REGISTRY_BASE_URL} />
        }
      />
    </div>
  )
}
