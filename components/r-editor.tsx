"use client"

import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { useCallback } from "react"
import useStore from "@/lib/store"

interface Props {
  initialDoc: string
  isLiveEdit?: boolean
}

const Editor: React.FC<Props> = (props) => {
  const { initialDoc, isLiveEdit = false } = props
  const { code, setCode } = useStore()

  const onChange = useCallback((value, viewUpdate) => {
    if (isLiveEdit) setCode(value)
    console.log("value:", value)
  }, [])

  return (
    <CodeMirror
      value={isLiveEdit ? code : initialDoc}
      height="390px"
      theme="dark"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  )
}

export default Editor
