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

// Detailed, recognizable ingredient illustrations.
// Each has a clear silhouette that reads at small sizes.
const INGREDIENT_PATHS: Record<IngredientType, IngredientPath> = {
  // Caldero: round-bottomed Dutch-oven-style pot with two handles and lid
  caldero: {
    stroke: [
      // Pot body — wide belly, flat bottom
      "M20,50 Q20,42 25,38 L75,38 Q80,42 80,50 L80,68 Q80,78 70,80 L30,80 Q20,78 20,68 Z",
      // Rim — thick lip
      "M18,38 L82,38 M18,40 L82,40",
      // Lid — domed with knob
      "M25,38 Q30,28 50,26 Q70,28 75,38",
      "M47,26 L47,22 Q50,20 53,22 L53,26",
      // Left handle
      "M20,48 L14,48 Q10,48 10,52 Q10,56 14,56 L20,56",
      // Right handle
      "M80,48 L86,48 Q90,48 90,52 Q90,56 86,56 L80,56",
      // Rice texture inside (concon!)
      "M30,55 Q32,53 35,55 Q37,57 40,55",
      "M45,52 Q48,50 52,52 Q55,54 58,52",
      "M35,62 Q38,60 42,62 Q45,64 48,62",
      "M55,60 Q58,58 62,60 Q65,62 68,60",
      // Char marks at bottom
      "M35,72 Q40,70 45,72",
      "M52,71 Q57,69 62,71",
    ].join(" "),
    fill: "M18,46 Q16,38 24,35 Q38,30 62,30 Q76,30 84,35 Q92,38 90,46 L88,70 Q86,82 70,84 Q50,86 30,84 Q14,82 12,70 Z",
  },

  // Mabi bark: rough bark strips bundled together, clearly woody
  "mabi-bark": {
    stroke: [
      // Three bark strips, rough edges
      // Left strip
      "M28,12 Q26,14 27,22 Q29,32 27,42 Q25,52 28,62 Q30,72 27,82 Q26,88 28,92",
      "M35,12 Q37,14 36,22 Q34,32 36,42 Q38,52 35,62 Q33,72 36,82 Q37,88 35,92",
      // Middle strip
      "M42,10 Q40,14 42,24 Q44,34 41,44 Q39,54 42,64 Q44,74 41,84 Q40,90 42,94",
      "M50,10 Q52,14 50,24 Q48,34 51,44 Q53,54 50,64 Q48,74 51,84 Q52,90 50,94",
      // Right strip
      "M56,14 Q54,18 56,28 Q58,38 55,48 Q53,58 56,68 Q58,78 55,86 Q54,90 56,92",
      "M64,14 Q66,18 64,28 Q62,38 65,48 Q67,58 64,68 Q62,78 65,86 Q66,90 64,92",
      // Bark texture — horizontal grain lines
      "M28,25 Q35,23 42,25 Q48,27 56,24 Q60,23 64,25",
      "M27,45 Q34,43 41,45 Q47,47 55,44 Q60,43 64,45",
      "M28,65 Q35,63 42,65 Q48,67 56,64 Q60,63 64,65",
      "M27,82 Q34,80 42,82 Q48,84 56,81 Q60,80 64,82",
      // Twine binding
      "M26,30 L66,28 M26,32 L66,30",
      "M26,70 L66,68 M26,72 L66,70",
    ].join(" "),
    fill: "M24,10 Q44,6 68,10 Q72,14 70,30 Q68,50 70,70 Q72,86 68,94 Q44,98 24,94 Q20,86 22,70 Q24,50 22,30 Q20,14 24,10 Z",
  },

  // Orange: clearly a citrus fruit — round with navel, leaf, and segment lines
  orange: {
    stroke: [
      // Fruit body — slightly imperfect circle
      "M50,18 Q30,18 22,32 Q14,46 18,60 Q22,74 38,82 Q50,88 62,82 Q78,74 82,60 Q86,46 78,32 Q70,18 50,18 Z",
      // Stem and leaf
      "M50,18 L50,12 Q50,10 52,10",
      "M50,12 Q56,6 64,8 Q62,12 56,14 Q52,14 50,12",
      // Navel at bottom
      "M46,78 Q50,82 54,78",
      // Segment lines radiating from center (like a cut orange)
      "M50,34 Q48,44 50,50",
      "M36,38 Q42,44 46,50",
      "M64,38 Q58,44 54,50",
      "M30,52 Q38,52 46,50",
      "M70,52 Q62,52 54,50",
      "M36,66 Q42,58 46,52",
      "M64,66 Q58,58 54,52",
      // Dimpled texture dots
      "M38,42 L39,42", "M60,44 L61,44", "M42,58 L43,58",
      "M58,62 L59,62", "M48,70 L49,70", "M54,36 L55,36",
    ].join(" "),
    fill: "M50,16 Q26,16 16,34 Q8,52 14,66 Q20,80 42,88 Q54,92 66,86 Q82,78 88,62 Q94,46 86,30 Q76,16 50,16 Z",
  },

  // Mamajuana bottle: distinctive rum bottle with herbs/bark visible inside
  mamajuana: {
    stroke: [
      // Bottle neck
      "M44,8 L44,18 Q44,20 42,22 L42,26",
      "M56,8 L56,18 Q56,20 58,22 L58,26",
      // Bottle cap/cork
      "M43,6 L57,6 L57,10 L43,10 Z",
      // Bottle shoulder
      "M42,26 Q36,30 34,36",
      "M58,26 Q64,30 66,36",
      // Bottle body — slight taper
      "M34,36 L32,74 Q32,84 40,88 L60,88 Q68,84 68,74 L66,36",
      // Liquid level line
      "M34,42 Q50,40 66,42",
      // Herbs and bark inside the bottle
      "M40,48 L40,68 M42,50 Q44,46 46,50",
      "M50,44 L50,72 M48,52 Q50,48 52,52",
      "M58,46 L56,66 M54,54 Q56,50 58,54",
      // Bark pieces
      "M44,60 L48,58 L46,64",
      "M54,56 L58,58 L56,62",
      // Label area
      "M36,70 L64,70 L64,82 L36,82 Z",
      // Label text lines
      "M40,74 L60,74",
      "M42,78 L58,78",
    ].join(" "),
    fill: "M42,4 Q50,2 58,4 Q60,8 58,20 Q62,24 66,30 Q70,36 70,40 L68,76 Q68,88 58,92 L42,92 Q32,88 32,76 L30,40 Q30,36 34,30 Q38,24 42,20 Q40,8 42,4 Z",
  },

  // Coconut: halved coconut showing white flesh inside dark shell
  coconut: {
    stroke: [
      // Outer shell — oval half
      "M18,50 Q18,28 34,20 Q50,14 66,20 Q82,28 82,50 Q82,72 66,78 Q50,84 34,78 Q18,72 18,50 Z",
      // Inner flesh line (white meat ring)
      "M26,50 Q26,34 38,28 Q50,22 62,28 Q74,34 74,50 Q74,66 62,70 Q50,76 38,70 Q26,66 26,50 Z",
      // Coconut water pool at bottom
      "M34,58 Q42,62 50,60 Q58,62 66,58",
      // Three eyes at top
      "M42,28 Q44,26 46,28 Q44,30 42,28 Z",
      "M50,26 Q52,24 54,26 Q52,28 50,26 Z",
      "M56,28 Q58,26 60,28 Q58,30 56,28 Z",
      // Shell texture — fibrous lines
      "M22,36 Q28,34 34,36",
      "M66,36 Q72,34 78,36",
      "M20,56 Q24,54 28,56",
      "M72,56 Q76,54 80,56",
      // Palm frond peeking from behind
      "M50,14 Q48,8 44,4 Q42,2 40,4",
      "M50,14 Q54,6 58,2 Q60,0 62,2",
      "M50,14 Q50,6 52,2",
    ].join(" "),
    fill: "M16,50 Q16,24 36,16 Q50,10 64,16 Q84,24 84,50 Q84,76 64,84 Q50,90 36,84 Q16,76 16,50 Z",
  },

  // Sugarcane: tall stalk with nodes, leaves sprouting from joints
  sugarcane: {
    stroke: [
      // Main stalk — segmented
      "M46,5 L44,95",
      "M54,5 L56,95",
      // Node bands (thicker rings at joints)
      "M43,20 L57,20 M43,22 L57,22",
      "M43,40 L57,40 M43,42 L57,42",
      "M43,60 L57,60 M43,62 L57,62",
      "M43,80 L57,80 M43,82 L57,82",
      // Leaves sprouting from nodes — long, graceful, alternating sides
      // Top-left leaf
      "M44,20 Q36,16 28,10 Q24,8 20,10 Q24,12 30,14 Q36,18 44,21",
      // Top-right leaf
      "M56,22 Q64,18 72,14 Q76,12 80,14 Q76,16 70,18 Q62,22 56,23",
      // Mid-left leaf
      "M44,40 Q34,36 24,32 Q20,30 16,32 Q20,34 28,36 Q36,40 44,41",
      // Mid-right leaf
      "M56,42 Q66,38 76,34 Q80,32 84,34 Q80,36 72,38 Q64,42 56,43",
      // Lower-left leaf
      "M44,60 Q36,56 28,52 Q24,50 20,52 Q24,54 30,56 Q38,60 44,61",
      // Lower-right leaf
      "M56,62 Q64,58 72,54 Q76,52 80,54 Q76,56 70,58 Q62,62 56,63",
      // Stalk fiber lines
      "M48,24 L48,38",
      "M52,44 L52,58",
      "M48,64 L48,78",
    ].join(" "),
    fill: "M42,3 Q50,0 58,3 Q60,8 58,20 Q60,40 58,60 Q60,80 58,92 Q56,98 50,100 Q44,98 42,92 Q40,80 42,60 Q40,40 42,20 Q40,8 42,3 Z",
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
        <path d={paths.fill} fill={color} fillOpacity={0.12} />
        {/* Layer 2: Hand-drawn stroke outline */}
        <path
          d={paths.stroke}
          fill="none"
          stroke={color}
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.4}
        />
      </svg>
    </motion.div>
  );
};
