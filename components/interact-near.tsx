"use client"

import { Wallet } from "@/lib/near/wallet"
import { useEffect, useMemo, useState } from "react"
import { nanoid } from "nanoid"

export default function InteractNear() {
  const NFT_EXAMPLES_ADDRESS = "nft.examples.testnet"

  const wallet = useMemo(
    () => new Wallet({ createAccessKeyFor: NFT_EXAMPLES_ADDRESS }),
    []
  )
  const [isSigned, setIsSigned] = useState(false)

  useEffect(() => {
    window.onload = async () => {
      let isSignedIn = await wallet.startUp()
      setIsSigned(isSignedIn)

      fetchGreeting()
    }
  }, [wallet])

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min
  }

  const mintNFT = async () => {
    const MEDIA = [
      "https://bafybeibdack2fgzxt54zvu5vncd6pvl4tlzj6vf7odqtodsa6vgucmrkia.ipfs.nftstorage.link/",
      "https://bafybeifirgr4cvvkx66xp7rz3j3wkk6owzcsxkjw4f2lblcjgkdfakk57u.ipfs.nftstorage.link/",
      "https://bafybeicymugrb2mhqdt6t5mmd42m52m37hwvqawzbzyy5bodqsr5dsg6vi.ipfs.nftstorage.link/",
      "https://bafybeig4hn3ia6vlxtxgh4u7azlrv5cgun6bcmay2gf2xfgkt674zkahci.ipfs.nftstorage.link/",
    ]

    const media = MEDIA[getRandomArbitrary(0, MEDIA.length - 1)]

    const tx = await wallet.callMethod({
      contractId: NFT_EXAMPLES_ADDRESS,
      method: "nft_mint",
      args: {
        token_id: nanoid(),
        receiver_id: wallet.accountId,
        metadata: {
          title: "Near Journey",
          description: "Collect them all!",
          media:
            "https://bafybeibdack2fgzxt54zvu5vncd6pvl4tlzj6vf7odqtodsa6vgucmrkia.ipfs.nftstorage.link/",
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
    console.log(
      "🚀 ~ file: interact-near.tsx ~ line 38 ~ fetchGreeting ~ currentGreeting",
      currentGreeting
    )
  }

  return (
    <div className="grid grid-cols-5 h-[calc(100vh-24px-32px-8px)]">
      <p>user is : {isSigned ? "signed" : "not signed"}</p>
      <button onClick={() => wallet.signIn()}>Sign In</button>
      <button onClick={() => wallet.signOut()}>Sign Out</button>
      <p>interact contract</p>
      <button onClick={mintNFT}>mint nft</button>
    </div>
  )
}
