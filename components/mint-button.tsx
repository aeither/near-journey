"use client"

import { useNear } from "@/lib/hooks/near"
import React from "react"
import { clsx } from "clsx"

interface Args {
  title: string
  disabled: boolean
}
const MintButton: React.FC<Args> = ({ title, disabled }) => {
  const { mintNFT } = useNear()
  return (
    <>
      <button
        onClick={() => {
          mintNFT(title)
        }}
        disabled={disabled}
        className={clsx(
          "px-4 py-2 bg-white hover:brightness-110 text-neutral-dark rounded-full font-bold",
          disabled && "disabled:opacity-30"
        )}
      >
        Complete
      </button>
    </>
  )
}

export default MintButton
