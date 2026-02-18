"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

type BotanicalType = "palm-leaf" | "cacao-pod" | "plantain-leaf" | "coffee-beans";

interface Props {
  type: BotanicalType;
  className?: string;
  size?: number;
}

const PATHS: Record<BotanicalType, string> = {
  "palm-leaf":
    "M50,95 Q45,75 30,60 Q20,50 10,48 Q20,45 32,50 Q40,55 45,65 Q42,50 35,35 Q28,20 20,15 Q30,12 40,25 Q48,38 48,55 Q50,40 55,25 Q62,10 70,5 Q68,15 60,30 Q54,42 52,60 Q58,48 68,40 Q80,30 90,28 Q82,35 72,45 Q62,55 55,70 Q60,62 70,58 Q82,55 92,55 Q84,60 74,63 Q62,68 52,80 Z",
  "cacao-pod":
    "M50,10 Q60,12 65,25 Q70,40 68,60 Q66,75 60,85 Q55,92 50,95 Q45,92 40,85 Q34,75 32,60 Q30,40 35,25 Q40,12 50,10 Z M42,30 Q50,28 58,30 M40,45 Q50,42 60,45 M40,60 Q50,57 60,60 M42,75 Q50,72 58,75",
  "plantain-leaf":
    "M50,5 Q52,20 55,35 Q58,50 60,65 Q62,80 60,95 M50,5 Q35,25 25,40 Q20,48 25,50 Q30,48 40,40 Q48,30 50,20 M50,30 Q65,40 75,55 Q80,62 76,65 Q70,62 62,55 Q54,45 50,38 M50,50 Q38,60 30,72 Q26,78 30,80 Q35,78 42,70 Q48,62 50,55 M50,65 Q60,72 68,82 Q72,88 68,90 Q63,88 57,80 Q52,72 50,68",
  "coffee-beans":
    "M30,40 Q28,30 35,25 Q42,20 48,28 Q52,35 48,42 Q44,48 35,48 Q30,48 30,40 Z M36,30 Q40,38 36,44 M55,55 Q53,45 60,40 Q67,35 73,43 Q77,50 73,57 Q69,63 60,63 Q55,63 55,55 Z M61,45 Q65,53 61,59 M40,70 Q38,60 45,55 Q52,50 58,58 Q62,65 58,72 Q54,78 45,78 Q40,78 40,70 Z M46,60 Q50,68 46,74",
};

export const BotanicalIllustration = ({ type, className = "", size = 120 }: Props) => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Guard scroll hooks — element is hidden md:block, so no need for scroll listeners on mobile
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 5000], [0, -60], { clamp: false });

  // On mobile, don't render at all (element is hidden via CSS anyway, but this avoids hook work)
  if (isMobile) return null;

  return (
    <motion.div
      style={{ y: shouldReduceMotion ? 0 : y }}
      className={`absolute pointer-events-none hidden md:block ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1} className="text-warm-brown/[0.15]">
        <path d={PATHS[type]} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
};
