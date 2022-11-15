import Editors from "@/components/editors"
import InteractNear from "@/components/interact-near"
import LiveWrapper from "@/components/live-wrapper"
import { Code } from "@/lib/code/sources"
import { notFound } from "next/navigation"

export default async function PostPage() {
  const code = await Code.getCodeNode("journey")

  if (!code) {
    notFound()
  }

  return (
    <div className="grid grid-cols-5 h-[calc(100vh-24px-32px-8px)]">
      <InteractNear />
      <Editors content={code.content} answer={code.answer} />
    </div>
  )
}
