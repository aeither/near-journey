"use client"

import useStore from "@/lib/store"

export default function PresenceCounter() {
  const currentUser = useStore((state) => state.liveblocks.room?.getSelf())
  const others = useStore((state) => state.liveblocks.others)

  return (
    <span>
      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <span>{others.length + 1} builder(s) online.</span>
        </div>
      )}
    </span>
  )
}
