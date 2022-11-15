"use client"

import React, { FC, useEffect } from "react"
import useStore from "@/lib/store"

import Cursor from "@/components/cursor"

type LiveWrapperProps = {
  children: React.ReactNode
}

const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
]

const LiveWrapper: FC<LiveWrapperProps> = ({ children }) => {
  const {
    liveblocks: { enterRoom, leaveRoom },
  } = useStore()
  const { setCursor } = useStore()
  const others = useStore((state) => state.liveblocks.others)

  useEffect(() => {
    enterRoom("room-id")
    return () => {
      leaveRoom("room-id")
    }
  }, [enterRoom, leaveRoom])

  return (
    <div onPointerMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}>
      {others.map(({ connectionId, presence }) => {
        if (presence.cursor === null) {
          return null
        }

        const cursor = presence.cursor as {
          x: number
          y: number
        }

        return (
          <Cursor
            key={`cursor-${connectionId}`}
            color={COLORS[connectionId % COLORS.length]}
            x={cursor.x}
            y={cursor.y}
          />
        )
      })}
      {children}
    </div>
  )
}

export default LiveWrapper
