"use client"

import { MdxContent } from "@/components/mdx-content"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import React from "react"

interface Args {
  mdx: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>
}

const ArticleBoody: React.FC<Args> = ({ mdx }) => {
  return (
    <>
      {mdx && (
        <div className="prose dark:prose-invert p-4">
          <MdxContent source={mdx} />
        </div>
      )}
    </>
  )
}

export default ArticleBoody
