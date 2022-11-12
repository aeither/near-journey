import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";

import Article from "@/components/article";
import Editors from "@/components/editors";
import { Blog } from "@/lib/mdx/sources";
interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  const files = await Blog.getMdxFiles();

  return files?.map((file) => ({
    slug: file.slug.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await Blog.getMdxNode(params?.slug);

  if (!post) {
    notFound();
  }

  const mdx = await serialize(post.content);

  return (
    <div className="grid grid-cols-5 h-[calc(100vh-24px-32px-16px)]">
      <Article title={post.frontMatter.title} mdx={mdx} />
      <Editors />
    </div>
  );
}
