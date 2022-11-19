"use client"

import { MDXRemoteSerializeResult } from "next-mdx-remote"
import React, { useState } from "react"
import { BsArrowRight } from "react-icons/bs"
import { FiMenu } from "react-icons/fi"
import ArticleBody from "./article-body"
import MintButton from "./mint-button"

interface ArticleArgs {
  title: string
  mdx: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>
}

const Article: React.FC<ArticleArgs> = ({ title, mdx }) => {
  const [disabled, setDisabled] = useState(true)
  const checkBottom = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  return (
    <>
      <div
        onScroll={(e) => checkBottom(e)}
        className="col-span-2 h-full w-full bg-neutral-mid overflow-auto"
      >
        <section onScroll={(e) => checkBottom(e)} className="flex flex-col">
          <header className="flex items-center justify-between p-4 sticky top-0 bg-neutral-light">
            <div className="flex items-center">
              <FiMenu size={28} color="white" />
              <h2 className="pl-4">{title}</h2>
            </div>
            <BsArrowRight size={28} color="white" />
          </header>
          <ArticleBody mdx={mdx} />
          <footer className="p-4 sticky bottom-0 bg-neutral-light text-right">
            <MintButton title={title} disabled={disabled} />
          </footer>
        </section>
      </div>
    </>
  )
}

export default Article
