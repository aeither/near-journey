import { Icons } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

export default async function IndexPage() {
  return (
    <div className="bg-[#020312]">
      {/* Section Hero */}
      <section
        id="hero"
        className="bg-[url('/svgs/nj-gradient-bg.svg')] bg-right-top bg-no-repeat"
      >
        <div className="flex flex-row px-8 py-4 justify-between">
          <div className="flex items-center gap-8">
            <Image
              src="/svgs/nj-logo-full.svg"
              width={140}
              height={140}
              alt="NJ logo"
              priority
            />
            <Link href="#learn">Learn</Link>
            <Link href="#play">Play</Link>
          </div>
          <div>
            <div className="px-4 py-2 bg-white hover:bg-white/80 text-neutral-dark rounded-full font-bold">
              <Link href="/">Start</Link>
            </div>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center pt-36">
          <div className="[text-align:-webkit-center] max-w-xl">
            <h1 className="text-6xl text-white font-bold leading-[1.1]">
              The path to build on NEAR
            </h1>
            <p className="my-4 max-w-[85%] text-xl leading-8 text-white/80">
              Near Journey is an interactive website where you can follow
              guides, practice with friends and test your skill in the browser.
            </p>
            <Link
              href="/journey"
              className="relative inline-flex h-11 items-center rounded-full border border-transparent bg-white px-8 py-2 font-medium text-black hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              Start the journey
              <Icons.arrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
            <Image
              src="/svgs/nj-hero.svg"
              width={1380}
              height={1380}
              alt="NJ logo"
              priority
              className="bottom-0"
            />
          </div>
        </div>
      </section>

      {/* Section Learn */}
      <section
        id="learn"
        className="mx-auto grid grid-cols-1 items-center justify-items-center pb-44"
      >
        <div className="[text-align:-webkit-center] max-w-xl">
          <h2 className="text-4xl text-white font-bold leading-[1.1]">
            Level up the learning experience
          </h2>
          <p className="my-4 max-w-[85%] text-xl leading-8 text-white/80">
            Start in seconds, no need to download or install.
          </p>
        </div>

        <div className="grid grid-cols-2 w-full max-w-3xl gap-4">
          <div className="col-span-2 justify-self-center text-center">
            <div className="p-32 rounded-lg bg-[url('/svgs/nj-setup.svg')] bg-no-repeat bg-cover">
              <div className="[text-align:-webkit-center] max-w-xl">
                <h2 className="text-3xl text-white font-bold leading-[1.1]">
                  Zero setup
                </h2>
                <p className="my-4 max-w-[85%] text-lg leading-8 text-white/80">
                  The learning material comes with an online editor to try the
                  code directly.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="h-80 px-4 py-12 rounded-lg bg-gradient-to-b from-slate-800/70 to-slate-800/10">
              <div className="[text-align:-webkit-center] max-w-xl">
                <h2 className="text-3xl text-white font-bold leading-[1.1]">
                  Engaging content
                </h2>
                <p className="my-4 max-w-[85%] text-lg leading-8 text-white/80">
                  Learn to build projects that can be used as portfolio. Get
                  helped with interactive editors with revealable answer.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="h-80 px-4 py-12 rounded-lg bg-gradient-to-b from-slate-800/70 to-slate-800/10">
              <div className="[text-align:-webkit-center] max-w-xl">
                <h2 className="text-3xl text-white font-bold leading-[1.1]">
                  Granular delivery
                </h2>
                <p className="my-4 max-w-[85%] text-lg leading-8 text-white/80">
                  Acquire knowledge easier with In-browser step-by-step codes
                  break down.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Play */}
      <section
        id="play"
        className="mx-auto grid grid-cols-1 items-center justify-items-center pb-44"
      >
        <div className="[text-align:-webkit-center] max-w-xl">
          <h2 className="text-4xl text-white font-bold leading-[1.1]">
            You are not alone
          </h2>
          <p className="my-4 max-w-[85%] text-xl leading-8 text-white/80">
            Code along other learners through the journey to master NEAR.
          </p>
        </div>

        <div className="grid grid-cols-2 w-full max-w-3xl gap-4">
          <div className="col-span-1">
            <div className="h-[460px] px-8 py-12 rounded-lg border border-white/20 hover:border-white/50 bg-gradient-radial from-yellow-600/20 to-slate-800/0 hover:from-yellow-600/40">
              <div className="text-left max-w-xl">
                <h2 className="text-3xl text-white font-bold leading-[1.1]">
                  Collaborative
                </h2>
                <p className="my-4 max-w-[85%] text-lg leading-8 text-white/80">
                  Know how many builders are online in the same time. Solve
                  challenges with them.
                </p>
                <Image
                  src="/svgs/nj-collaborative.svg"
                  width={230}
                  height={230}
                  alt="NJ collab"
                  priority
                  className="bottom-0"
                />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="h-[460px] px-8 py-12 rounded-lg border border-white/20 hover:border-white/50 bg-gradient-radial from-teal-600/20 to-teal-800/0 hover:from-teal-600/40">
              <div className="text-left max-w-xl">
                <h2 className="text-3xl text-white font-bold leading-[1.1]">
                  Collect them all
                </h2>
                <p className="my-4 max-w-[85%] text-lg leading-8 text-white/80">
                  A curated AI generated NFT Relics you can collect on
                  completion.
                </p>
                <Image
                  src="/svgs/nj-nfts.svg"
                  width={230}
                  height={230}
                  alt="NJ nfts"
                  priority
                  className="bottom-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Ready */}
      <section
        id="ready"
        className="mx-auto grid grid-cols-1 items-center justify-items-center pb-44"
      >
        <div className="[text-align:-webkit-center] max-w-xl">
          <h1 className="text-6xl text-white font-bold leading-[1.1] pb-12">
            Are you ready?
          </h1>
          <Link
            href="/journey"
            className="relative inline-flex h-11 items-center rounded-full border border-transparent bg-white px-8 py-2 font-medium text-black hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            Start the journey
            <Icons.arrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t-1 border-white/20">
        <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-between">
          <div className="p-8">
            <Image
              src="/svgs/nj-logo-full.svg"
              width={140}
              height={140}
              alt="NJ logo"
              priority
            />
            <div className="text-xs uppercase text-gray-500 font-medium pt-2">
              by Gio
            </div>
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-500 font-medium">
              Product
            </div>
            <a className="my-3 block" href="/#">
              Home <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block" href="/#">
              List <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block" href="/#">
              Features <span className="text-teal-600 text-xs p-1"></span>
            </a>
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-500 font-medium">
              Learn
            </div>
            <a className="my-3 block" href="/#">
              Greetings <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block" href="/#">
              Counter <span className="text-teal-600 text-xs p-1">New</span>
            </a>
            <a className="my-3 block" href="/#">
              Coin-flip <span className="text-teal-600 text-xs p-1"></span>
            </a>
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-500 font-medium">
              Resources
            </div>
            <a className="my-3 block" href="/#">
              Demo <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block" href="/#">
              Github <span className="text-teal-600 text-xs p-1">New</span>
            </a>
            <a className="my-3 block" href="/#">
              License <span className="text-teal-600 text-xs p-1"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
