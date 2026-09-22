import { codeToHtml } from "shiki"

import { CopyButton } from "@/components/site/copy-button"

interface CodeBlockProps {
  code: string
  lang?: string
}

export async function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark",
  })

  return (
    <div className="group relative overflow-hidden rounded-lg border">
      <CopyButton
        text={code}
        className="absolute top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div
        className="max-h-[520px] overflow-auto text-sm [&_pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
