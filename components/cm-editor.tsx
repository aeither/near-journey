import React, { useCallback, useEffect, useState } from "react"
import { EditorState } from "@codemirror/state"
import useCodeMirror from "@/lib/hooks/use-codemirror"

interface Props {
  initialDoc: string
  onChange: (doc: string) => void
}

const Editor: React.FC<Props> = (props) => {
  const { onChange, initialDoc } = props
  const [isAnswer, setIsAnswer] = useState(false)

  const handleChange = useCallback(
    (state: EditorState) => {
      onChange(state.doc.toString())
    },
    [onChange]
  )
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
