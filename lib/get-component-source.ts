import fs from "node:fs"
import path from "node:path"

export function getComponentSource(registryPath: string): string {
  // Scoped to registry/ so the bundler traces only that folder rather than the
  // whole project (which would pull all sources and public/ into the server bundle).
  const relative = registryPath.replace(/^registry[/\\]/, "")
  return fs.readFileSync(
    path.join(process.cwd(), "registry", relative),
    "utf-8"
  )
}
