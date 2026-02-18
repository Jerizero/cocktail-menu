"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { DrinkVisual } from "@/data/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  visual: DrinkVisual;
  size?: "tiny" | "card" | "modal";
  className?: string;
}

// Glass shape data — viewBox 0 0 120 180
// All stemmed glasses: wide rim at TOP (small y), narrow at stem connection (large y)
const GLASS = {
  coupe: {
    // Wide shallow bowl — champagne coupe style. Widest at rim.
    outline: "M24,44 C28,68 46,80 60,84 C74,80 92,68 96,44 L92,42 L28,42 Z M60,84 L60,142 M44,142 L76,142",
    fill: "M27,46 C30,66 47,78 60,82 C73,78 90,66 93,46 Z",
    liquidY: 48,
    liquidH: 34,
    foamW: 56,
    meniscusL: 30,
    meniscusR: 90,
  },
  highball: {
    // Tall Collins glass — slightly wider at top
    outline: "M35,35 L38,145 L82,145 L85,35 Z",
    fill: "M36,50 L38,143 L82,143 L84,50 Z",
    liquidY: 50,
    liquidH: 93,
    foamW: 44,
    meniscusL: 37,
    meniscusR: 83,
  },
  rocks: {
    // Old Fashioned tumbler — slightly wider at top (outward flare)
    outline: "M30,65 L32,145 L88,145 L90,65 Z",
    fill: "M30,75 L32,143 L88,143 L90,75 Z",
    liquidY: 75,
    liquidH: 68,
    foamW: 56,
    meniscusL: 32,
    meniscusR: 88,
  },
  "nick-and-nora": {
    // Deeper, rounder bowl than coupe — bell-shaped
    outline: "M33,38 C33,62 48,78 60,82 C72,78 87,62 87,38 L83,36 L37,36 Z M60,82 L60,142 M44,142 L76,142",
    fill: "M35,40 C35,60 49,76 60,80 C71,76 85,60 85,40 Z",
    liquidY: 42,
    liquidH: 38,
    foamW: 44,
    meniscusL: 38,
    meniscusR: 82,
  },
  wine: {
    // Taller tulip/goblet — rounder belly, narrows slightly at rim and bottom
    outline: "M37,30 C33,44 34,62 42,76 C50,86 57,90 60,90 C63,90 70,86 78,76 C86,62 87,44 83,30 L79,28 L41,28 Z M60,90 L60,145 M42,145 L78,145",
    fill: "M39,32 C35,44 36,61 43,74 C51,84 58,88 60,88 C62,88 69,84 77,74 C84,61 85,44 81,32 Z",
    liquidY: 34,
    liquidH: 54,
    foamW: 36,
    meniscusL: 41,
    meniscusR: 79,
  },
  spritz: {
    // Large balloon wine glass for spritzes — wider and rounder than tulip wine
    outline: "M30,28 C26,48 28,68 40,82 C48,90 54,94 60,94 C66,94 72,90 80,82 C92,68 94,48 90,28 L86,26 L34,26 Z M60,94 L60,142 M44,142 L76,142",
    fill: "M32,30 C28,48 30,67 41,80 C49,88 55,92 60,92 C65,92 71,88 79,80 C90,67 92,48 88,30 Z",
    liquidY: 32,
    liquidH: 60,
    foamW: 50,
    meniscusL: 34,
    meniscusR: 86,
  },
} as const;

const IceCubes = ({ x, y, type }: { x: number; y: number; type: "large-cube" | "rocks" | "crushed" }) => {
  if (type === "large-cube") {
    return (
      <g>
        <rect x={x - 11} y={y - 11} width={22} height={22} rx={3} fill="white" fillOpacity={0.35} transform={`rotate(-8 ${x} ${y})`} />
        <rect x={x - 9} y={y - 9} width={18} height={18} rx={2} fill="white" fillOpacity={0.15} transform={`rotate(-8 ${x} ${y})`} />
      </g>
    );
  }
  if (type === "rocks") {
    return (
      <g>
        {[{ dx: -7, dy: -4, s: 8, r: 12 }, { dx: 5, dy: -2, s: 7, r: -6 }, { dx: -1, dy: 5, s: 6, r: 18 }].map((c, i) => (
          <rect key={i} x={x + c.dx - c.s / 2} y={y + c.dy - c.s / 2} width={c.s} height={c.s} rx={2} fill="white" fillOpacity={0.3} transform={`rotate(${c.r} ${x + c.dx} ${y + c.dy})`} />
        ))}
      </g>
    );
  }
  // crushed
  return (
    <g>
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={x + Math.sin(i * 1.8) * 12 - 2} y={y + Math.cos(i * 2.1) * 8 - 6} width={4} height={4} rx={1} fill="white" fillOpacity={0.25} transform={`rotate(${i * 22} ${x + Math.sin(i * 1.8) * 12} ${y + Math.cos(i * 2.1) * 8 - 4})`} />
      ))}
    </g>
  );
};

const FoamLayer = ({
  type, y, width, liquidColor, animate,
}: {
  type: "egg-white" | "pineapple-froth" | "salt-topped";
  y: number; width: number; liquidColor: string; animate: boolean;
}) => {
  const cx = 60;
  const hw = width / 2;
  const color = type === "salt-topped" ? "#FFFFFF" : "#FFF8EE";
  const op = type === "salt-topped" ? 0.92 : 0.7;

  const d1 = `M${cx - hw},${y + 2} Q${cx - hw * 0.6},${y - 5} ${cx - hw * 0.2},${y - 3} Q${cx},${y - 7} ${cx + hw * 0.2},${y - 3} Q${cx + hw * 0.6},${y - 6} ${cx + hw},${y + 2} Z`;
  const d2 = `M${cx - hw},${y + 2} Q${cx - hw * 0.6},${y - 6} ${cx - hw * 0.2},${y - 4} Q${cx},${y - 5} ${cx + hw * 0.2},${y - 4} Q${cx + hw * 0.6},${y - 7} ${cx + hw},${y + 2} Z`;

  return (
    <g>
      <motion.path d={d1} fill={color} fillOpacity={op}
        animate={animate ? { d: [d1, d2] } : undefined}
        transition={animate ? { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } : undefined}
      />
      <path d={`M${cx - hw},${y + 2} Q${cx},${y + 6} ${cx + hw},${y + 2} L${cx + hw},${y + 5} Q${cx},${y + 8} ${cx - hw},${y + 5} Z`} fill={liquidColor} fillOpacity={0.15} />
      {type === "salt-topped" && [0, 1, 2, 3, 4].map(i => (
        <circle key={i} cx={cx - hw * 0.5 + i * hw * 0.25} cy={y - 3 + (i % 2 === 0 ? -1 : 1)} r={0.8} fill="#E8E0D0" fillOpacity={0.6} />
      ))}
    </g>
  );
};

const SmokeWisps = ({ y, animate }: { y: number; animate: boolean }) => (
  <g opacity={0.2}>
    {[0, 1, 2].map(i => {
      const sx = 50 + i * 10;
      return (
        <motion.path key={i}
          d={`M${sx},${y} Q${sx + 3},${y - 12} ${sx - 2},${y - 24} Q${sx + 4},${y - 32} ${sx + 1},${y - 40}`}
          stroke="#A89F91" strokeWidth={1.2} fill="none" strokeLinecap="round"
          animate={animate ? { opacity: [0.15, 0.25, 0.15], y: [0, -6, 0] } : undefined}
          transition={animate ? { duration: 4 + i * 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.8 } : undefined}
        />
      );
    })}
  </g>
);

export const DrinkIllustration = ({ visual, size = "card", className }: Props) => {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const animate = isInView && !shouldReduceMotion;

  const { glassType, liquidColor, liquidGradient, opacity, iceType, foam, smoke, viscosity } = visual;
  const g = GLASS[glassType];
  const dim =
    size === "tiny"
      ? { w: 36, h: 48 }
      : size === "card"
        ? { w: 120, h: 160 }
        : { w: 200, h: 280 };

  return (
    <svg ref={ref} viewBox="0 0 120 180" width={dim.w} height={dim.h} className={className} aria-hidden="true" role="presentation">
      {/* Base liquid */}
      <path d={g.fill} fill={liquidColor} fillOpacity={opacity * 0.5} />

      {/* Depth layer */}
      {liquidGradient && <path d={g.fill} fill={liquidGradient} fillOpacity={opacity * 0.25} />}

      {/* Meniscus highlight */}
      <path
        d={`M${g.meniscusL},${g.liquidY + 2} Q60,${g.liquidY - 2} ${g.meniscusR},${g.liquidY + 2} L${g.meniscusR},${g.liquidY + 6} Q60,${g.liquidY + 3} ${g.meniscusL},${g.liquidY + 6} Z`}
        fill="#FFFFFF" fillOpacity={0.12}
      />

      {/* Viscosity bottom layer */}
      {(viscosity === "thick" || viscosity === "syrupy") && (
        <path
          d={`M${g.meniscusL - 3},${g.liquidY + g.liquidH - 15} L${g.meniscusL - 3},${g.liquidY + g.liquidH} L${g.meniscusR + 3},${g.liquidY + g.liquidH} L${g.meniscusR + 3},${g.liquidY + g.liquidH - 15} Q60,${g.liquidY + g.liquidH - 10} ${g.meniscusL - 3},${g.liquidY + g.liquidH - 15} Z`}
          fill={liquidGradient || liquidColor} fillOpacity={opacity * 0.2}
        />
      )}

      {/* Ice */}
      {iceType !== "none" && (
        <IceCubes x={60} y={g.liquidY + g.liquidH * 0.35} type={iceType} />
      )}

      {/* Foam */}
      {foam && (
        <FoamLayer type={foam} y={g.liquidY} width={g.foamW} liquidColor={liquidColor} animate={animate} />
      )}

      {/* Glass outline — on top */}
      <path d={g.outline} fill="none" stroke="#A89F91" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />

      {/* Smoke */}
      {smoke && <SmokeWisps y={g.liquidY - 5} animate={animate} />}
    </svg>
  );
};
