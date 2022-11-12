"use client";

import REditor from "@/components/r-editor";
import React, { useState } from "react";

const Editors: React.FC = () => {
  const [isAnswer, setIsAnswer] = useState(false);

  return (
    <div className="flex col-span-3 flex-col h-full w-full">
      <REditor initialDoc={""} />
      <div className="w-full h-full py-4 items-center">
        <div className="mb-4 ml-4">
          <button
            onClick={() => {
              if (isAnswer) {
                setIsAnswer(false);
              } else {
                setIsAnswer(true);
              }
            }}
            className="px-4 py-2 bg-accent hover:brightness-110 text-neutral-dark rounded-full font-bold"
          >
            {isAnswer ? "Show Answer" : "Reset"}
          </button>
        </div>
        {isAnswer ? (
          <REditor initialDoc={"Answer hidden"} />
        ) : (
          <REditor initialDoc={"This is the answer"} />
        )}
      </div>
    </div>
  );
};

export default Editors;
