"use client";

import { useState, useEffect } from "react";

export const useReducedMotion = (): boolean => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return shouldReduceMotion;
};
