"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

type IngredientType =
  | "caldero"
  | "mabi-bark"
  | "orange"
  | "mamajuana"
  | "coconut"
  | "sugarcane";

interface IngredientPath {
  stroke: string;
  fill: string;
}

const INGREDIENT_PATHS: Record<IngredientType, IngredientPath> = {
  caldero: {
    stroke:
      "M25,55 Q25,45 30,40 L70,40 Q75,45 75,55 L75,70 Q75,78 65,80 L35,80 Q25,78 25,70 Z M20,40 L80,40 M30,40 Q35,25 40,20 M45,40 Q48,30 50,22 M60,40 Q58,28 55,20 M35,80 L35,85 M65,80 L65,85",
    fill: "M22,52 Q20,42 28,38 Q40,34 60,34 Q72,34 80,38 Q88,42 86,52 L84,72 Q82,82 68,84 Q50,86 32,84 Q18,82 16,72 Z",
  },
  "mabi-bark": {
    stroke:
      "M40,15 Q38,30 42,45 Q44,55 40,70 Q38,80 42,90 M50,12 Q52,28 48,42 Q46,55 50,68 Q52,78 48,88 M60,18 Q58,32 62,48 Q64,58 60,72 Q58,82 62,92 M35,35 Q50,32 65,35 M33,60 Q50,57 67,60",
    fill: "M32,12 Q48,8 65,12 Q70,14 68,25 Q66,45 68,65 Q70,80 66,92 Q50,96 34,92 Q30,80 32,65 Q34,45 32,25 Q30,14 32,12 Z",
  },
  orange: {
    stroke:
      "M50,15 Q50,10 48,8 M45,18 Q30,22 22,35 Q15,48 20,62 Q25,76 40,82 Q50,86 60,82 Q75,76 80,62 Q85,48 78,35 Q70,22 55,18 Q50,16 45,18 Z M42,20 Q45,25 50,22 Q55,25 58,20 M35,45 Q50,42 65,45",
    fill: "M50,14 Q30,16 20,32 Q10,48 18,66 Q26,82 46,88 Q56,90 66,84 Q82,76 88,58 Q92,42 82,28 Q72,16 50,14 Z",
  },
  mamajuana: {
    stroke:
      "M45,10 L55,10 L55,20 Q58,22 58,28 L58,30 Q62,32 62,38 L60,75 Q60,88 50,90 Q40,88 40,75 L38,38 Q38,32 42,30 L42,28 Q42,22 45,20 Z M42,45 L58,45 M42,55 L58,55 M42,65 L58,65 M44,75 L56,75",
    fill: "M42,8 Q48,6 58,8 Q60,10 60,20 Q64,24 64,32 L66,36 L64,78 Q62,92 50,94 Q38,92 36,78 L34,36 L36,32 Q36,24 40,20 Q40,10 42,8 Z",
  },
  coconut: {
    stroke:
      "M50,20 Q32,20 24,35 Q18,48 22,60 Q28,75 42,80 Q50,82 58,80 Q72,75 78,60 Q82,48 76,35 Q68,20 50,20 Z M30,38 Q40,55 50,58 Q60,55 70,38 M48,20 Q46,12 50,8 Q52,10 54,8 Q58,12 52,20",
    fill: "M50,16 Q28,16 18,34 Q10,50 16,66 Q24,80 44,86 Q56,88 66,82 Q80,74 86,58 Q90,44 82,30 Q72,16 50,16 Z",
  },
  sugarcane: {
    stroke:
      "M45,8 Q44,20 46,35 Q48,50 46,65 Q44,80 46,95 M55,8 Q56,20 54,35 Q52,50 54,65 Q56,80 54,95 M45,25 Q42,22 38,24 Q35,28 38,30 M55,45 Q58,42 62,44 Q65,48 62,50 M45,65 Q42,62 38,64 Q35,68 38,70 M46,35 L54,35 M46,55 L54,55 M46,75 L54,75",
    fill: "M40,5 Q48,2 60,5 Q62,8 60,22 Q58,38 60,55 Q62,72 60,88 Q58,96 50,98 Q42,96 40,88 Q38,72 40,55 Q42,38 40,22 Q38,8 40,5 Z",
  },
};

const INGREDIENT_COLORS: Record<IngredientType, string> = {
  caldero: "var(--amber)",
  "mabi-bark": "var(--warm-brown)",
  orange: "var(--amber)",
  mamajuana: "var(--warm-brown)",
  coconut: "var(--forest)",
  sugarcane: "var(--forest)",
};

interface WatercolorIngredientProps {
  type: IngredientType;
  className?: string;
  size?: number;
  parallaxSpeed?: number;
  scrollY: MotionValue<number>;
}

export const WatercolorIngredient = ({
  type,
  className = "",
  size = 100,
  parallaxSpeed = 0.5,
  scrollY,
}: WatercolorIngredientProps) => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const y = useTransform(scrollY, [0, 5000], [0, -120 * parallaxSpeed], {
    clamp: false,
  });

  if (isMobile) return null;

  const color = INGREDIENT_COLORS[type];
  const paths = INGREDIENT_PATHS[type];

  return (
    <motion.div
      style={{ y: shouldReduceMotion ? 0 : y }}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute pointer-events-none hidden md:block ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: Watercolor fill blob */}
        <path d={paths.fill} fill={color} fillOpacity={0.15} />
        {/* Layer 2: Hand-drawn stroke outline */}
        <path
          d={paths.stroke}
          fill="none"
          stroke={color}
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.35}
        />
      </svg>
    </motion.div>
  );
};
