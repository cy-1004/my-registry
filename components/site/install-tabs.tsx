import { CodeBlock } from "@/components/site/code-block"
import type { RegistryItem } from "@/lib/registry"

interface InstallTabsProps {
  item: RegistryItem
  source: string
  baseUrl: string
}

export function InstallTabs({ item, source, baseUrl }: InstallTabsProps) {
  const cliCommand = `npx shadcn add ${baseUrl}/r/${item.name}.json`
  const manualDeps = item.dependencies?.length
    ? `npm install ${item.dependencies.join(" ")}`
    : null

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">CLI</h3>
        <CodeBlock code={cliCommand} lang="bash" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Manual</h3>
        {manualDeps && (
          <div className="mb-3">
            <p className="mb-1 text-xs text-muted-foreground">
              1. Install dependencies
            </p>
            <CodeBlock code={manualDeps} lang="bash" />
          </div>
        )}
        <p className="mb-1 text-xs text-muted-foreground">
          {manualDeps ? "2." : "1."} Copy the component source
        </p>
        <CodeBlock code={source} lang="tsx" />
      </div>
    </div>
  )
}
