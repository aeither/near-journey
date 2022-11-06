import React, { ReactNode, SyntheticEvent } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

interface Props {
  children?: ReactNode;
  codeText: string;
}

export const CopyButton: React.FC<Props> = ({ children, codeText }) => {
  const handleClick = (e: SyntheticEvent) => {
    navigator.clipboard.writeText(codeText);
  };

  return (
    <button onClick={handleClick}>
      <span className="text-white absolute right-2 top-1 hover:cursor-pointer transition hover:scale-150">
        <MdOutlineContentCopy />
      </span>
      {children}
    </button>
  );
};
