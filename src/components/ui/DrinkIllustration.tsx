"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { DrinkVisual } from "@/data/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  visual: DrinkVisual;
  size?: "card" | "modal";
  className?: string;
}

// Glass shape data — viewBox 0 0 120 180
const GLASS = {
  coupe: {
    outline: "M30,80 Q30,55 40,45 Q50,38 60,36 Q70,38 80,45 Q90,55 90,80 L85,82 L35,82 Z M60,82 L60,140 M45,140 L75,140",
    fill: "M32,78 Q32,57 41,47 Q51,40 60,38 Q69,40 79,47 Q88,57 88,78 Z",
    liquidY: 42,
    liquidH: 38,
    foamW: 46,
    meniscusL: 40,
    meniscusR: 80,
  },
  highball: {
    outline: "M38,35 L35,145 L85,145 L82,35 Z",
    fill: "M37,50 L35,143 L85,143 L83,50 Z",
    liquidY: 50,
    liquidH: 93,
    foamW: 44,
    meniscusL: 39,
    meniscusR: 81,
  },
  rocks: {
    outline: "M32,65 L30,145 L90,145 L88,65 Z",
    fill: "M31,75 L30,143 L90,143 L89,75 Z",
    liquidY: 75,
    liquidH: 68,
    foamW: 56,
    meniscusL: 34,
    meniscusR: 86,
  },
  "nick-and-nora": {
    outline: "M35,75 Q35,50 45,42 Q55,36 60,35 Q65,36 75,42 Q85,50 85,75 L80,78 L40,78 Z M60,78 L60,140 M45,140 L75,140",
    fill: "M37,73 Q37,52 46,44 Q55,38 60,37 Q65,38 74,44 Q83,52 83,73 Z",
    liquidY: 40,
    liquidH: 35,
    foamW: 42,
    meniscusL: 42,
    meniscusR: 78,
  },
  wine: {
    outline: "M38,80 Q35,55 42,42 Q50,32 60,30 Q70,32 78,42 Q85,55 82,80 L78,82 L42,82 Z M60,82 L60,145 M42,145 L78,145",
    fill: "M40,78 Q37,57 43,44 Q51,34 60,32 Q69,34 77,44 Q83,57 80,78 Z",
    liquidY: 36,
    liquidH: 44,
    foamW: 38,
    meniscusL: 44,
    meniscusR: 76,
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
  const color = type === "salt-topped" ? "#FAF3E0" : "#FFF8EE";
  const op = type === "salt-topped" ? 0.85 : 0.7;

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
  const dim = size === "card" ? { w: 120, h: 160 } : { w: 200, h: 280 };

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
