"use client"

import { Wallet } from "@/lib/near/wallet"
import { useEffect, useMemo, useState } from "react"
import { nanoid } from "nanoid"

export function useNear() {
  const NJ_RELIC_ADDRESS = "relic.testnet"

  const [isSigned, setIsSigned] = useState(false)
  const wallet = useMemo(
    () => new Wallet({ createAccessKeyFor: NJ_RELIC_ADDRESS }),
    []
  )

  const startupNear = async () => {
    let isSignedIn = await wallet.startUp()
    setIsSigned(isSignedIn)
  }
  useEffect(() => {
    window.onload = async () => {
      await startupNear()
      //   fetchGreeting()
    }
  }, [wallet])

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min
  }

  const mintNFT = async (title: string) => {
    const MEDIA = [
      "https://bafybeibdack2fgzxt54zvu5vncd6pvl4tlzj6vf7odqtodsa6vgucmrkia.ipfs.nftstorage.link/",
      "https://bafybeifirgr4cvvkx66xp7rz3j3wkk6owzcsxkjw4f2lblcjgkdfakk57u.ipfs.nftstorage.link/",
      "https://bafybeicymugrb2mhqdt6t5mmd42m52m37hwvqawzbzyy5bodqsr5dsg6vi.ipfs.nftstorage.link/",
      "https://bafybeig4hn3ia6vlxtxgh4u7azlrv5cgun6bcmay2gf2xfgkt674zkahci.ipfs.nftstorage.link/",
    ]

    const media = MEDIA[getRandomArbitrary(0, MEDIA.length - 1)]

    const tx = await wallet.callMethod({
      contractId: NJ_RELIC_ADDRESS,
      method: "nft_mint",
      args: {
        token_id: nanoid(),
        receiver_id: wallet.accountId,
        metadata: {
          title: `Near Journey: ${title}`,
          description: `Attestation for completing ${title}`,
          media: media,
          copies: 1,
        },
      },
      deposit: "0.1",
    })
    console.log("mint nft :", tx)
  }

  async function fetchGreeting() {
    const CONTRACT_ADDRESS = "dev-1667568912500-87724948574387"

    const currentGreeting = await wallet.viewMethod({
      method: "get_count",
      contractId: CONTRACT_ADDRESS,
    })
    console.log("Greeting", currentGreeting)
  }

  return { wallet, isSigned, mintNFT, startupNear }
}
