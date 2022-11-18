import { Icons } from "@/components/icons"
import { NJLogo } from "@/components/nj-logo"
import PresenceCounter from "@/components/presence-counter"
import Link from "next/link"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="mx-auto w-full px-4">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between py-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <NJLogo />
            <span className="font-bold">Near Journey</span>
          </Link>
          <nav>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <PresenceCounter />
          <div className="px-4 py-2 bg-white hover:bg-white/80 text-neutral-dark rounded-full font-bold">
            <Link href="/">Connect Wallet</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
