#!/usr/bin/env node
// 新增一个注册表组件的脚手架脚本。
// 用法：node scripts/new-component.mjs <category> <name> "<标题>" "<描述>" [依赖包...]
// 示例：node scripts/new-component.mjs ui-animations magnetic-button "磁吸按钮" "鼠标靠近时按钮向指针方向偏移。" motion

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const CATEGORIES = ["ui-animations", "scroll", "lottie", "three", "ai"]

const [, , category, name, title, description, ...deps] = process.argv

function fail(message) {
  console.error(`✖ ${message}`)
  process.exit(1)
}

if (!category || !name || !title || !description) {
  fail(
    `用法: node scripts/new-component.mjs <category> <name> "<标题>" "<描述>" [依赖包...]\n` +
      `category 必须是: ${CATEGORIES.join(" | ")}`
  )
}

if (!CATEGORIES.includes(category)) {
  fail(`未知分类 "${category}"，必须是: ${CATEGORIES.join(" | ")}`)
}

if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name)) {
  fail(`组件名 "${name}" 必须是 kebab-case，例如 magnetic-button`)
}

const pascalName = name
  .split("-")
  .map((part) => part[0].toUpperCase() + part.slice(1))
  .join("")

const componentDir = path.join(ROOT, "registry", category, name)

if (fs.existsSync(componentDir)) {
  fail(`目录已存在: ${path.relative(ROOT, componentDir)}`)
}

fs.mkdirSync(componentDir, { recursive: true })

const componentFile = path.join(componentDir, `${name}.tsx`)
fs.writeFileSync(
  componentFile,
  `"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ${pascalName}Props {
  className?: string
}

export function ${pascalName}({ className }: ${pascalName}Props) {
  return (
    <div className={cn("", className)}>
      {/* TODO: 在这里实现组件 */}
    </div>
  )
}
`
)

const demoFile = path.join(componentDir, "demo.tsx")
fs.writeFileSync(
  demoFile,
  `"use client"

import { ${pascalName} } from "@/registry/${category}/${name}/${name}"

export default function ${pascalName}Demo() {
  return (
    <div className="flex items-center justify-center p-10">
      <${pascalName} />
    </div>
  )
}
`
)

// 1. 写入 registry.json
const registryJsonPath = path.join(ROOT, "registry.json")
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"))

if (registryJson.items.some((item) => item.name === name)) {
  fail(`registry.json 中已存在同名组件 "${name}"`)
}

registryJson.items.push({
  name,
  type: "registry:ui",
  title,
  description,
  categories: [category],
  ...(deps.length ? { dependencies: deps } : {}),
  files: [
    {
      path: `registry/${category}/${name}/${name}.tsx`,
      type: "registry:ui",
      target: `@components/${category}/${name}.tsx`,
    },
  ],
})

fs.writeFileSync(registryJsonPath, JSON.stringify(registryJson, null, 2) + "\n")

// 2. 在 component-preview.tsx 的 DEMOS 表里插入一行
const previewPath = path.join(
  ROOT,
  "components",
  "site",
  "component-preview.tsx"
)
const previewSource = fs.readFileSync(previewPath, "utf-8")
const anchor = "}\n\ninterface ComponentPreviewProps"

if (!previewSource.includes(anchor)) {
  fail(
    "无法在 component-preview.tsx 中定位 DEMOS 表结尾，请手动添加一条 dynamic import"
  )
}

const newEntry =
  `  "${name}": dynamic(\n` +
  `    () => import("@/registry/${category}/${name}/demo"),\n` +
  `    { ssr: false }\n` +
  `  ),\n`

fs.writeFileSync(
  previewPath,
  previewSource.replace(anchor, `${newEntry}${anchor}`)
)

console.log(`✔ 已创建 ${path.relative(ROOT, componentFile)}`)
console.log(`✔ 已创建 ${path.relative(ROOT, demoFile)}`)
console.log(`✔ 已在 registry.json 中添加 "${name}"`)
console.log(`✔ 已在 component-preview.tsx 的 DEMOS 表中注册 "${name}"`)
console.log("")
console.log("接下来：")
console.log(`  1. 编辑 ${path.relative(ROOT, componentFile)}，把真正的实现代码写进去`)
if (deps.length) {
  console.log(`  2. 安装依赖: npm install ${deps.join(" ")}`)
}
console.log(`  3. 编辑 ${path.relative(ROOT, demoFile)}，调整预览用法`)
console.log("  4. npm run dev  查看 Preview / Code / Install 三个 tab")
console.log("  5. npm run registry:build  重新生成 public/r/*.json")
