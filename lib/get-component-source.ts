import fs from "node:fs"
import path from "node:path"

export function getComponentSource(relativePath: string): string {
  const fullPath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(fullPath, "utf-8")
}
