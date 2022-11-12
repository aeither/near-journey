import Editor from "@/components/cm-editor"
import { Icons } from "@/components/icons"
import { Blog } from "@/lib/code/sources"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default async function IndexPage() {
  const posts = await Blog.getAllMdxNodes()

  return (
    <section className="mx-auto grid max-w-[1100px] grid-cols-[1fr_380px] items-center gap-12 py-12">
      <div>
        <h1 className="text-6xl font-black leading-[1.1]">
          Publishing Platform for Everyone
        </h1>
        <p className="my-4 max-w-[85%] text-xl leading-8 text-slate-500">
          A Next.js 13 application built using layouts, server components and
          everything new in React 18.
        </p>
        <Link
          href="/journey"
          className="relative inline-flex h-11 items-center rounded-md border border-transparent bg-brand-500 px-8 py-2 font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          Get Started
          <Icons.arrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
      <Image
        src="/images/nextjs-icon-dark-background.png"
        width={380}
        height={380}
        alt="Next.js logo"
        priority
      />
      {posts.map((post) => (
        <article key={post.slug} className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">{post.content}</div>
          <Editor initialDoc={post.raw} />
        </article>
      ))}

      <Editor initialDoc={"hello 123"} />
      {/* <button onClick={getData}>getData</button> */}
    </section>
  )
}
