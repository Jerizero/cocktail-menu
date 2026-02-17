"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Section color stops — more pronounced warmth shift for visual rhythm
const COLORS = [
  { pos: 0, r: 253, g: 252, b: 250 },    // Hero: cool cream #FDFCFA
  { pos: 0.12, r: 251, g: 247, b: 240 }, // Menu: warming #FBF7F0
  { pos: 0.3, r: 247, g: 240, b: 228 },  // Roots: warm earth #F7F0E4
  { pos: 0.5, r: 244, g: 237, b: 224 },  // Analysis: warmest #F4EDE0
  { pos: 0.7, r: 248, g: 242, b: 232 },  // Techniques: still warm #F8F2E8
  { pos: 0.85, r: 245, g: 240, b: 230 }, // R&D: earthy #F5F0E6
  { pos: 1, r: 250, g: 248, b: 244 },    // Credits: cooling back #FAF8F4
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
