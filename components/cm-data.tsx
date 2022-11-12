import { CopyButton } from "@/components/copy-button"
import useCodeMirror from "@/lib/hooks/use-codemirror"
import { EditorState } from "@codemirror/state"
import React, { useCallback, useEffect, useState } from "react"

const Editor: React.FC = () => {
  const [initialDoc, setInitialDoc] = useState<string>("# Hello, World!\n")
  const [isAnswer, setIsAnswer] = useState(false)

  const handleChange = useCallback((state: EditorState) => {
    setInitialDoc(state.doc.toString())
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

  return (
    <>
      <div
        className="w-auto h-full flex-grow-0 flex-shrink-0"
        ref={refContainer}
      ></div>
      <CopyButton codeText={initialDoc}>Copy</CopyButton>
      <button
        onClick={() => {
          if (isAnswer) {
            setIsAnswer(false)
            mutateText("# hello from cm-editor \n")
          } else {
            setIsAnswer(true)
            mutateText("# hello from starter \n")
          }
        }}
      >
        {isAnswer ? "Show Answer" : "Reset"}
      </button>
    </>
  )
}

export default Editor