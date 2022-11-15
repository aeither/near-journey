"use client"

import REditor from "@/components/r-editor"
import useStore from "@/lib/store"
import React, { useState } from "react"

interface EditorsArgs {
  answer: string
  hash?: string
  content: string
  filepath?: string
  slug?: string
  url?: string
}

const Editors: React.FC<EditorsArgs> = ({ content, answer }) => {
  const [isAnswer, setIsAnswer] = useState(false)
  const { setCode } = useStore()

  return (
    <div className="flex col-span-3 flex-col h-full w-full">
      <REditor isLiveEdit initialDoc={content} />
      <div className="w-full h-full py-4 items-center">
        <div className="flex">
          <div className="mb-4 ml-4">
            <button
              onClick={() => {
                setCode(content)
              }}
              className="px-4 py-2 bg-red-400 hover:brightness-110 text-neutral-dark rounded-full font-bold"
            >
              {"Reset"}
            </button>
          </div>
          <div className="mb-4 ml-4">
            <button
              onClick={() => {
                if (isAnswer) {
                  setIsAnswer(false)
                } else {
                  setIsAnswer(true)
                }
              }}
              className="px-4 py-2 bg-accent hover:brightness-110 text-neutral-dark rounded-full font-bold"
            >
              {isAnswer ? "Hide Answer" : "Show Answer"}
            </button>
          </div>
        </div>
        {isAnswer ? (
          <REditor initialDoc={answer} />
        ) : (
          <REditor initialDoc={"Answer hidden"} />
        )}
      </div>
    </div>
  )
}

export default Editors
