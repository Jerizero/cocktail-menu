"use client";

import { useState } from "react";

interface Props {
  content: string;
  children: React.ReactNode;
}

export const Tooltip = ({ content, children }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onTouchStart={() => setShow((v) => !v)}
    >
      {children}
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs bg-text-primary text-cream rounded-md whitespace-nowrap z-50 pointer-events-none">
          {content}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-text-primary" />
        </span>
      )}
    </span>
  );
};
