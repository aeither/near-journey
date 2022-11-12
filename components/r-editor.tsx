"use client"

import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { useCallback } from "react"

interface Props {
  initialDoc: string
}

const Editor: React.FC<Props> = (props) => {
  const onChange = useCallback((value, viewUpdate) => {
    console.log("value:", value)
  }, [])

  return (
    <CodeMirror
      value="console.log('hello world!');"
      height="390px"
      theme="dark"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  )
}

export default Editor
