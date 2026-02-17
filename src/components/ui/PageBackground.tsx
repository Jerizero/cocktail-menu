"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Section color stops — cool cream → warmer → warmest → warm → neutral
const COLORS = [
  { pos: 0, r: 253, g: 252, b: 250 },    // Hero: #FDFCFA
  { pos: 0.25, r: 251, g: 248, b: 242 },  // Menu: #FBF8F2
  { pos: 0.5, r: 249, g: 243, b: 234 },   // Analysis: #F9F3EA
  { pos: 0.7, r: 247, g: 241, b: 232 },   // Roots: #F7F1E8
  { pos: 1, r: 253, g: 252, b: 250 },      // R&D: #FDFCFA
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const getColor = (progress: number): string => {
  const p = Math.max(0, Math.min(1, progress));
  let i = 0;
  for (let j = 1; j < COLORS.length; j++) {
    if (COLORS[j].pos >= p) { i = j - 1; break; }
  }
  const seg = COLORS[i];
  const next = COLORS[i + 1] || seg;
  const t = next.pos === seg.pos ? 0 : (p - seg.pos) / (next.pos - seg.pos);
  const r = Math.round(lerp(seg.r, next.r, t));
  const g = Math.round(lerp(seg.g, next.g, t));
  const b = Math.round(lerp(seg.b, next.b, t));
  return `rgb(${r},${g},${b})`;
};

export const PageBackground = () => {
  const shouldReduceMotion = useReducedMotion();
  const [color, setColor] = useState(getColor(0));

  useEffect(() => {
    if (shouldReduceMotion) {
      // Snap to midpoint color
      setColor(getColor(0.5));
      return;
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        setColor(getColor(progress));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldReduceMotion]);

  useEffect(() => {
    document.body.style.backgroundColor = color;
    return () => { document.body.style.backgroundColor = ""; };
  }, [color]);

  return null; // No DOM — just sets body background
};
