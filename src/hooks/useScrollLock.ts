"use client";

import { useEffect } from "react";

export const useScrollLock = (enabled: boolean): void => {
  useEffect(() => {
    if (!enabled) return;

    const scrollTop = window.scrollY;
    const body = document.body;

    body.style.position = "fixed";
    body.style.top = `-${scrollTop}px`;
    body.style.width = "100%";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      // 'instant' overrides html { scroll-behavior: smooth } which otherwise
      // starts an animation that gets lost in React StrictMode double-effects.
      window.scrollTo({ top: scrollTop, left: 0, behavior: "instant" });
    };
  }, [enabled]);
};
