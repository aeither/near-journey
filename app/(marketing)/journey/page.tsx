import Editors from "@/components/editors"
import { Code } from "@/lib/code/sources"
import { notFound } from "next/navigation"

export default async function PostPage() {
  const code = await Code.getCodeNode("journey")

  if (!code) {
    notFound()
  }

  return (
    <div className="grid grid-cols-5 h-[calc(100vh-24px-32px-8px)]">
      <Editors content={code.content} answer={code.answer} />
    </div>
  )
}
