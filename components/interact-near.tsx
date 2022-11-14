"use client"

import { Wallet } from "@/lib/near/wallet"
import { useEffect, useMemo, useState } from "react"

export default function InteractNear() {
  const CONTRACT_ADDRESS = "dev-1667568912500-87724948574387"

  const wallet = useMemo(
    () => new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS }),
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

  async function fetchGreeting() {
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
    </div>
  )
}
