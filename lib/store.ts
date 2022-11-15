import create from "zustand"
import { createClient } from "@liveblocks/client"
import { liveblocks } from "@liveblocks/zustand"
import type { WithLiveblocks } from "@liveblocks/zustand"

type Cursor = { x: number; y: number }

type State = {
  cursor: Cursor
  code: string

  setCursor: (cursor: Cursor) => void
  setCode: (code: string) => void
}

if (!process.env.NEXT_PUBLIC_API_URL) throw "API_URL not found"
const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_API_URL,
})

const useStore = create<WithLiveblocks<State>>()(
  liveblocks(
    (set) => ({
      code: "Hello World",
      cursor: { x: 0, y: 0 },
      setCursor: (cursor) => set({ cursor }),
      setCode: (code) => set({ code }),
    }),
    {
      client,
      presenceMapping: {
        cursor: true,
      },
      storageMapping: { code: true },
    }
  )
)

export default useStore
