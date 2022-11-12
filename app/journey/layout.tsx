import { Icons } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="mx-auto w-full px-4">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between py-4">
        <div className="flex gap-10 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/nearjourneylogo.png"
              width={30}
              height={30}
              alt="Next.js logo"
              priority
            />
            <span className="font-bold">Near Journey</span>
          </Link>
          <nav>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </nav>
        </div>
        <div>
          <Link href="/login">Login</Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
