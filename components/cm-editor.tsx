"use client"
import { CopyButton } from "@/components/copy-button"
import useCodeMirror from "@/lib/hooks/use-codemirror"
import { EditorState } from "@codemirror/state"
import React, { useCallback, useEffect, useState } from "react"
interface Props {
  initialDoc: string
}

const Editor: React.FC<Props> = (props) => {
  const { initialDoc } = props

  const [doc, setDoc] = useState<string>("# Hello, World!\n")
  const [isAnswer, setIsAnswer] = useState(false)

  const handleChange = useCallback((state: EditorState) => {
    setDoc(state.doc.toString())
  }, [])
  const { refContainer, editorView, mutateText } =
    useCodeMirror<HTMLDivElement>({
      initialDoc: initialDoc,
      onChange: handleChange,
    })

  useEffect(() => {
    if (editorView) {
      // Do nothing for now
    } else {
      // loading editor
    }
  }, [editorView])

  return <div ref={refContainer}></div>

  // return (
  //   <div className="flex flex-col">
  //     <div className="flex-1 overflow-auto bg-slate-300">
  //       <div className="h-full" ref={refContainer}></div>
  //       <CopyButton codeText={doc}>Copy</CopyButton>
  //       <button
  //         onClick={() => {
  //           if (isAnswer) {
  //             setIsAnswer(false)
  //             mutateText("# hello from cm-editor \n")
  //           } else {
  //             setIsAnswer(true)
  //             mutateText("# hello from starter \n")
  //           }
  //         }}
  //       >
  //         {isAnswer ? "Show Answer" : "Reset"}
  //       </button>
  //     </div>
  //   </div>
  // )
}

export default Editor
