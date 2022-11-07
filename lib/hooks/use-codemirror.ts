import { defaultKeymap } from "@codemirror/commands"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { EditorState } from "@codemirror/state"
import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView, keymap } from "@codemirror/view"
import { basicSetup } from "codemirror"
import type React from "react"
import { useEffect, useRef, useState } from "react"

interface Props {
  initialDoc: string
  onChange?: (state: EditorState) => void
}

interface Return<T> {
  refContainer: React.MutableRefObject<T | null>
  editorView?: EditorView
  mutateText?: (text: string) => void
}

const useCodeMirror = <T extends Element>(props: Props): Return<T> => {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()
  const { onChange } = props

  useEffect(() => {
    if (!refContainer.current) return

    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        oneDark,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state)
          }
        }),
      ],
    })

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    })

    setEditorView(view)

    return () => {
      view.destroy()
    }
  }, [refContainer])

  const mutateText = (text: string) => {
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.toString().length,
        insert: text,
      },
      selection: {
        anchor: editorView.state.selection.ranges[0].from,
        head: editorView.state.selection.ranges[0].from,
      },
    })
  }

  return { refContainer, editorView, mutateText }
}

export default useCodeMirror
