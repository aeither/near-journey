import { CopyButton } from "@/components/copy-button";
import useCodeMirror from "@/lib/hooks/use-codemirror";
import { EditorState } from "@codemirror/state";
import React, { useCallback, useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MdxContent } from "@/components/mdx-content";

interface ArticleArgs {
  title: string;
  mdx: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}

const Article: React.FC<ArticleArgs> = ({ title, mdx }) => {
  return (
    <>
      <div className="col-span-2 h-full w-full bg-neutral-mid overflow-auto">
        <section className="flex flex-col">
          <header className="flex items-center justify-between p-4 sticky top-0 bg-neutral-light">
            <div className="flex items-center">
              <FiMenu size={28} color="white" />
              <h2 className="pl-4">{title}</h2>
            </div>
            <BsArrowRight size={28} color="white" />
          </header>
          {mdx && (
            <div className="prose dark:prose-invert p-4">
              <MdxContent source={mdx} />
            </div>
          )}
          <footer className="p-4 sticky bottom-0 bg-neutral-light">
            <a
              href="https://github.com/aeither/near-journey"
              rel="noreferrer"
              target={"_blank"}
            >
              Github
            </a>
          </footer>
        </section>
      </div>
    </>
  );
};

export default Article;
