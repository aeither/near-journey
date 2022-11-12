import Article from "@/components/article"
import Editors from "@/components/editors"
import { Code } from "@/lib/code/sources"
import { notFound } from "next/navigation"
import { serialize } from "next-mdx-remote/serialize"

import { MdxContent } from "@/components/mdx-content"
import { formatDate } from "@/lib/utils"
import Editor from "@/components/cm-editor"

export default async function PostPage() {
  const code = await Code.getCodeNode("journey")

  if (!code) {
    notFound()
  }

  return (
    <div className="grid grid-cols-5 h-[calc(100vh-24px-32px-8px)]">
      <Editors content={code.content} />
    </div>
  )
}
