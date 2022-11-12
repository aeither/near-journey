import { CopyButton } from "@/components/copy-button";
import useCodeMirror from "@/lib/hooks/use-codemirror";
import { EditorState } from "@codemirror/state";
import React, { useCallback, useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";

const paragraph =
  "Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.Minim sunt occaecat eu sit adipisicing nisi cupidatat velit dolor. Proident ipsum ipsum aliquip qui reprehenderit sint laboris aute sit culpa ea veniam laboris non. Officia occaecat occaecat dolore anim velit in nisi cupidatat elit aliquip dolore dolor. Labore dolore non ea velit veniam deserunt nulla.";

const Article: React.FC = () => {
  return (
    <>
      <div className="col-span-2 h-full w-full bg-neutral-mid overflow-auto">
        <section className="flex flex-col">
          <header className="flex items-center justify-between p-4 sticky top-0 bg-neutral-light">
            <div className="flex items-center">
              <FiMenu size={28} color="white" />
              <h2 className="pl-4">Part 1 / Introduction</h2>
            </div>
            <BsArrowRight size={28} color="white" />
          </header>
          <div className="p-4">{paragraph}</div>
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
