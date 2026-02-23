"use client";

import { useId, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { DrinkVisual, GlassType } from "@/data/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  visual: DrinkVisual;
  size?: "tiny" | "card" | "modal";
  className?: string;
}

// Glass shape data — viewBox 0 0 120 180
// All stemmed glasses: wide rim at TOP (small y), narrow at stem connection (large y)
// Each glass: outline, fill, liquidY, liquidH, foamW, meniscusL, meniscusR, rimY, reflection
const GLASS: Record<GlassType, {
  outline: string;
  fill: string;
  liquidY: number;
  liquidH: number;
  foamW: number;
  meniscusL: number;
  meniscusR: number;
  rimY: number;
  reflection: string;
}> = {
  coupe: {
    // Wide shallow bowl — champagne coupe style. Wider bowl, elliptical stem base.
    outline: "M22,44 C26,68 44,82 60,86 C76,82 94,68 98,44 L94,42 L26,42 Z M60,86 L60,142 M44,142 Q60,148 76,142",
    fill: "M25,46 C28,66 45,80 60,84 C75,80 92,66 95,46 Z",
    liquidY: 48,
    liquidH: 36,
    foamW: 60,
    meniscusL: 28,
    meniscusR: 92,
    rimY: 42,
    reflection: "M30,50 C32,62 42,72 50,76",
  },
  highball: {
    // Tall Collins glass — very slight outward bow via C curves
    outline: "M36,35 C35,55 35,95 38,145 L82,145 C85,95 85,55 84,35 Z",
    fill: "M37,50 C36,70 36,100 39,143 L81,143 C84,100 84,70 83,50 Z",
    liquidY: 50,
    liquidH: 93,
    foamW: 44,
    meniscusL: 37,
    meniscusR: 83,
    rimY: 35,
    reflection: "M40,55 C39,75 39,105 40,130",
  },
  rocks: {
    // Old Fashioned tumbler — subtle barrel curve, wider rim
    outline: "M28,65 C27,80 28,110 30,145 L90,145 C92,110 93,80 92,65 Z",
    fill: "M29,75 C28,88 29,115 31,143 L89,143 C91,115 92,88 91,75 Z",
    liquidY: 75,
    liquidH: 68,
    foamW: 58,
    meniscusL: 30,
    meniscusR: 90,
    rimY: 65,
    reflection: "M34,75 C33,90 33,115 34,135",
  },
  "nick-and-nora": {
    // Deeper, rounder bowl than coupe — bell-shaped (paths unchanged, rimY/reflection added)
    outline: "M33,38 C33,62 48,78 60,82 C72,78 87,62 87,38 L83,36 L37,36 Z M60,82 L60,142 M44,142 L76,142",
    fill: "M35,40 C35,60 49,76 60,80 C71,76 85,60 85,40 Z",
    liquidY: 42,
    liquidH: 38,
    foamW: 44,
    meniscusL: 38,
    meniscusR: 82,
    rimY: 36,
    reflection: "M39,44 C39,56 46,68 52,74",
  },
  wine: {
    // Taller tulip/goblet (paths unchanged, rimY/reflection added)
    outline: "M37,30 C33,44 34,62 42,76 C50,86 57,90 60,90 C63,90 70,86 78,76 C86,62 87,44 83,30 L79,28 L41,28 Z M60,90 L60,145 M42,145 L78,145",
    fill: "M39,32 C35,44 36,61 43,74 C51,84 58,88 60,88 C62,88 69,84 77,74 C84,61 85,44 81,32 Z",
    liquidY: 34,
    liquidH: 54,
    foamW: 36,
    meniscusL: 41,
    meniscusR: 79,
    rimY: 28,
    reflection: "M42,38 C39,48 39,60 44,72",
  },
  spritz: {
    // Large balloon wine glass — larger balloon, lower stem, curved base
    outline: "M28,26 C23,48 26,72 40,86 C48,94 54,98 60,98 C66,98 72,94 80,86 C94,72 97,48 92,26 L88,24 L32,24 Z M60,98 L60,142 M44,142 Q60,148 76,142",
    fill: "M30,28 C26,48 28,70 41,84 C49,92 55,96 60,96 C65,96 71,92 79,84 C92,70 94,48 90,28 Z",
    liquidY: 30,
    liquidH: 66,
    foamW: 54,
    meniscusL: 32,
    meniscusR: 88,
    rimY: 24,
    reflection: "M35,34 C32,50 33,68 42,80",
  },
  hurricane: {
    // Classic hurricane glass: tall, curvy S-shape, wide mouth, pinched waist, flared base, NO stem
    outline: "M30,35 C28,50 34,65 42,75 C48,83 48,90 44,100 C40,110 36,125 38,145 L82,145 C84,125 80,110 76,100 C72,90 72,83 78,75 C86,65 92,50 90,35 Z",
    fill: "M32,50 C30,60 36,70 43,77 C49,84 49,91 45,101 C41,111 38,126 39,143 L81,143 C82,126 79,111 75,101 C71,91 71,84 77,77 C84,70 90,60 88,50 Z",
    liquidY: 50,
    liquidH: 93,
    foamW: 52,
    meniscusL: 33,
    meniscusR: 87,
    rimY: 35,
    reflection: "M36,52 C34,62 38,72 44,78",
  },
};

const TUMBLER_TYPES: GlassType[] = ["rocks", "highball", "hurricane"];

const IceCubes = ({ x, y, type, rimY }: { x: number; y: number; type: "large-cube" | "rocks" | "crushed" | "pebbled"; rimY: number }) => {
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
  if (type === "pebbled") {
    // Swizzle-style pebbled ice mound that overflows above the glass rim.
    // Uses rimY from glass config so it works on any glass type.
    const pebbles: { cx: number; cy: number; r: number; op: number }[] = [];

    // Layer 1 — deep inside glass (widest, most transparent)
    for (let i = 0; i < 9; i++) {
      pebbles.push({
        cx: x + (i - 4) * 5 + (i % 2 ? 1.5 : -1),
        cy: rimY + 18 - (i % 3) * 2.5,
        r: 3.2 + (i % 3) * 0.8,
        op: 0.18 + (i % 2) * 0.06,
      });
    }

    // Layer 2 — just below rim (wide)
    for (let i = 0; i < 10; i++) {
      pebbles.push({
        cx: x + (i - 4.5) * 4.9 + (i % 2 ? -1 : 1.2),
        cy: rimY + 8 - (i % 3) * 2,
        r: 3 + (i % 3) * 0.7,
        op: 0.22 + (i % 2) * 0.06,
      });
    }

    // Layer 3 — at the rim line (full width of glass opening)
    for (let i = 0; i < 11; i++) {
      pebbles.push({
        cx: x + (i - 5) * 4.6 + (i % 2 ? 1 : -0.8),
        cy: rimY + 1 - (i % 2) * 2,
        r: 3.2 + (i % 3) * 0.6,
        op: 0.28 + (i % 2) * 0.05,
      });
    }

    // Layer 4 — above rim, narrowing for dome shape
    for (let i = 0; i < 9; i++) {
      pebbles.push({
        cx: x + (i - 4) * 4.5 + (i % 2 ? -1.2 : 0.8),
        cy: rimY - 7 + Math.abs(i - 4) * 1.2 - (i % 3),
        r: 3 + (i % 2) * 0.8,
        op: 0.30 + (i % 2) * 0.06,
      });
    }

    // Layer 5 — dome crown, narrower still
    for (let i = 0; i < 5; i++) {
      pebbles.push({
        cx: x + (i - 2) * 5 + (i % 2 ? 0.5 : -0.5),
        cy: rimY - 13 + Math.abs(i - 2) * 2,
        r: 3.5 + (i % 2) * 0.5,
        op: 0.32 + (i % 2) * 0.05,
      });
    }

    // Top cap — peak of the mound
    pebbles.push({ cx: x - 2, cy: rimY - 17, r: 3, op: 0.30 });
    pebbles.push({ cx: x + 3, cy: rimY - 16, r: 2.8, op: 0.28 });
    pebbles.push({ cx: x, cy: rimY - 19, r: 2.5, op: 0.26 });

    return (
      <g>
        {pebbles.map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="white" fillOpacity={p.op} />
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

const Straw = ({ glassY, iceType, rimY }: { glassY: number; iceType?: string; rimY: number }) => {
  // When pebbled ice overflows above the rim, the straw pokes out from the ice mound
  const topY = iceType === "pebbled" ? rimY - 28 : glassY - 12;
  return (
    <g>
      {/* Thin diagonal straw from inside glass to above the ice mound */}
      <line x1={68} y1={topY} x2={52} y2={glassY + 40} stroke="#A89F91" strokeWidth={1.8} strokeLinecap="round" />
      <line x1={68} y1={topY} x2={52} y2={glassY + 40} stroke="#C4B8A8" strokeWidth={0.8} strokeLinecap="round" />
    </g>
  );
};

const SmokeWisps = ({ y, animate }: { y: number; animate: boolean }) => {
  // Each wisp: starting x, horizontal sway amplitude, height, stroke width, delay, duration
  const wisps = [
    { sx: 46, sway: -4, h: 38, sw: 1.6, delay: 0, dur: 5 },
    { sx: 54, sway: 3, h: 44, sw: 1.2, delay: 0.6, dur: 4.5 },
    { sx: 60, sway: -2, h: 48, sw: 1.4, delay: 1.3, dur: 5.5 },
    { sx: 66, sway: 4, h: 42, sw: 1.0, delay: 0.3, dur: 4.8 },
    { sx: 74, sway: -3, h: 36, sw: 1.3, delay: 0.9, dur: 5.2 },
  ];

  return (
    <g>
      {wisps.map((w, i) => {
        const q1y = y - w.h * 0.25;
        const q2y = y - w.h * 0.55;
        const q3y = y - w.h * 0.8;
        const endY = y - w.h;
        // S-curve wisp path
        const d = `M${w.sx},${y} Q${w.sx + w.sway * 1.2},${q1y} ${w.sx - w.sway * 0.8},${q2y} Q${w.sx + w.sway * 1.5},${q3y} ${w.sx + w.sway * 0.5},${endY}`;
        return (
          <motion.path
            key={i}
            d={d}
            stroke="#B8AFA5"
            strokeWidth={w.sw}
            fill="none"
            strokeLinecap="round"
            opacity={0}
            animate={
              animate
                ? {
                    opacity: [0, 0.22, 0.3, 0.18, 0],
                    y: [4, 0, -5, -10, -14],
                    x: [0, w.sway * 0.3, w.sway * 0.5, w.sway * 0.2, 0],
                  }
                : undefined
            }
            transition={
              animate
                ? {
                    duration: w.dur,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: w.delay,
                  }
                : undefined
            }
          />
        );
      })}
    </g>
  );
};

export const DrinkIllustration = ({ visual, size = "card", className }: Props) => {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const animate = isInView && !shouldReduceMotion;

  const { glassType, liquidColor, liquidGradient, opacity, iceType, foam, smoke, straw, viscosity } = visual;
  const g = GLASS[glassType];
  const showDetail = size !== "tiny";
  const clipId = useId();
  const dim =
    size === "tiny"
      ? { w: 36, h: 48 }
      : size === "card"
        ? { w: 120, h: 160 }
        : { w: 200, h: 280 };

  return (
    <svg ref={ref} viewBox="0 0 120 180" width={dim.w} height={dim.h} className={className} aria-hidden="true" role="presentation">
      <defs>
        <clipPath id={clipId}>
          <path d={g.fill} />
        </clipPath>
      </defs>

      {/* Base liquid */}
      <path d={g.fill} fill={liquidColor} fillOpacity={opacity * 0.5} />

      {/* Depth layer */}
      {liquidGradient && <path d={g.fill} fill={liquidGradient} fillOpacity={opacity * 0.25} />}

      {/* Meniscus highlight */}
      <path
        d={`M${g.meniscusL},${g.liquidY + 2} Q60,${g.liquidY - 2} ${g.meniscusR},${g.liquidY + 2} L${g.meniscusR},${g.liquidY + 6} Q60,${g.liquidY + 3} ${g.meniscusL},${g.liquidY + 6} Z`}
        fill="#FFFFFF" fillOpacity={0.12}
      />

      {/* Viscosity bottom layer — clipped to glass interior */}
      {(viscosity === "thick" || viscosity === "syrupy") && (
        <path
          clipPath={`url(#${clipId})`}
          d={`M${g.meniscusL - 3},${g.liquidY + g.liquidH - 15} L${g.meniscusL - 3},${g.liquidY + g.liquidH} L${g.meniscusR + 3},${g.liquidY + g.liquidH} L${g.meniscusR + 3},${g.liquidY + g.liquidH - 15} Q60,${g.liquidY + g.liquidH - 10} ${g.meniscusL - 3},${g.liquidY + g.liquidH - 15} Z`}
          fill={liquidGradient || liquidColor} fillOpacity={opacity * 0.2}
        />
      )}

      {/* Ice */}
      {iceType !== "none" && (
        <IceCubes x={60} y={g.liquidY + g.liquidH * 0.35} type={iceType} rimY={g.rimY} />
      )}

      {/* Foam */}
      {foam && (
        <FoamLayer type={foam} y={g.liquidY} width={g.foamW} liquidColor={liquidColor} animate={animate} />
      )}

      {/* Glass outline — on top */}
      <path d={g.outline} fill="none" stroke="#A89F91" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />

      {/* Rim thickness — subtle inner rim line for tumblers */}
      {showDetail && TUMBLER_TYPES.includes(glassType) && (
        <path
          d={`M${g.meniscusL + 1},${g.rimY + 2} L${g.meniscusR - 1},${g.rimY + 2}`}
          fill="none" stroke="#A89F91" strokeWidth={0.6} strokeLinecap="round" strokeOpacity={0.5}
        />
      )}

      {/* Glass reflection highlight */}
      {showDetail && (
        <path d={g.reflection} fill="none" stroke="#FFFFFF" strokeWidth={1.5}
          strokeLinecap="round" strokeOpacity={0.10} />
      )}

      {/* Straw */}
      {straw && <Straw glassY={g.liquidY} iceType={iceType} rimY={g.rimY} />}

      {/* Smoke */}
      {smoke && <SmokeWisps y={g.liquidY - 5} animate={animate} />}
    </svg>
  );
};
