"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { drinks } from "@/data/drinks";
import type { Spirit } from "@/data/types";
import { SPIRIT_COLORS } from "@/lib/colors";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  highlightSpirit?: string;
  onHighlightSpirit?: (spirit: string | null) => void;
  onHighlight?: (spirit: Spirit | null) => void;
}

interface SpiritCount {
  spirit: Spirit;
  count: number;
  drinkIds: number[];
}

export const SPIRIT_LABELS: Record<Spirit, string> = {
  rum: "Rum",
  cognac: "Cognac",
  gin: "Gin",
  scotch: "Scotch",
  rye: "Rye",
  vodka: "Vodka",
  aquavit: "Aquavit",
  bourbon: "Bourbon",
  mezcal: "Mezcal",
  clairin: "Clairin",
};

const computeSpiritCounts = (): SpiritCount[] => {
  const map = new Map<Spirit, number[]>();

  for (const drink of drinks) {
    for (const spirit of drink.spirits) {
      const existing = map.get(spirit) ?? [];
      existing.push(drink.id);
      map.set(spirit, existing);
    }
  }

  const counts: SpiritCount[] = [];
  for (const [spirit, drinkIds] of map) {
    counts.push({ spirit, count: drinkIds.length, drinkIds });
  }

  // Sort descending by count, then alphabetically for ties
  counts.sort((a, b) => b.count - a.count || a.spirit.localeCompare(b.spirit));

  return counts;
};

// SVG arc path helper — draws an arc segment for the donut
const describeArc = (
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  thickness: number,
): string => {
  const outerR = radius;
  const innerR = radius - thickness;

  // Clamp sweep to avoid full-circle rendering issues
  const sweep = Math.min(endAngle - startAngle, 359.99);
  const endAdj = startAngle + sweep;

  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;

  const outerStart = {
    x: cx + outerR * Math.cos(toRad(startAngle)),
    y: cy + outerR * Math.sin(toRad(startAngle)),
  };
  const outerEnd = {
    x: cx + outerR * Math.cos(toRad(endAdj)),
    y: cy + outerR * Math.sin(toRad(endAdj)),
  };
  const innerStart = {
    x: cx + innerR * Math.cos(toRad(endAdj)),
    y: cy + innerR * Math.sin(toRad(endAdj)),
  };
  const innerEnd = {
    x: cx + innerR * Math.cos(toRad(startAngle)),
    y: cy + innerR * Math.sin(toRad(startAngle)),
  };

  const largeArc = sweep > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
    "Z",
  ].join(" ");
};

// Chart layout constants
const SIZE = 280;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER_RADIUS = 120;
const THICKNESS = 36;
const GAP_DEGREES = 2;

export const SpiritBars = ({
  highlightSpirit,
  onHighlightSpirit,
  onHighlight,
}: Props) => {
  const handleHighlight = onHighlightSpirit ?? onHighlight ?? null;
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [hoveredSpirit, setHoveredSpirit] = useState<string | null>(null);

  const spiritCounts = useMemo(computeSpiritCounts, []);
  const totalDrinks = useMemo(
    () => spiritCounts.reduce((sum, s) => sum + s.count, 0),
    [spiritCounts],
  );
  const uniqueSpirits = spiritCounts.length;

  // Compute arc segments
  const arcs = useMemo(() => {
    const totalGap = GAP_DEGREES * spiritCounts.length;
    const available = 360 - totalGap;
    let cursor = 0;

    return spiritCounts.map((item) => {
      const sweep = (item.count / totalDrinks) * available;
      const startAngle = cursor;
      const endAngle = cursor + sweep;
      cursor = endAngle + GAP_DEGREES;

      return {
        ...item,
        startAngle,
        endAngle,
        midAngle: startAngle + sweep / 2,
        path: describeArc(CX, CY, OUTER_RADIUS, startAngle, endAngle, THICKNESS),
      };
    });
  }, [spiritCounts, totalDrinks]);

  const handleArcClick = (spirit: string) => {
    if (!handleHighlight) return;
    if (highlightSpirit === spirit) {
      handleHighlight(null);
    } else {
      handleHighlight(spirit as Spirit);
    }
  };

  const ariaLabel = `Donut chart showing spirit distribution across ${drinks.length} cocktails. ${spiritCounts
    .map(
      (s) =>
        `${SPIRIT_LABELS[s.spirit]}: ${s.count} drink${s.count !== 1 ? "s" : ""}`,
    )
    .join(". ")}.`;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[280px]"
        role="img"
        aria-label={ariaLabel}
      >
        {/* Arc segments */}
        {arcs.map((arc, i) => {
          const color = SPIRIT_COLORS[arc.spirit] ?? "#78350F";
          const isHighlighted = highlightSpirit === arc.spirit;
          const isDimmed =
            highlightSpirit != null && highlightSpirit !== arc.spirit;
          const isHovered = hoveredSpirit === arc.spirit;

          // Compute slight outward translation for hover/highlight
          const midRad = ((arc.midAngle - 90) * Math.PI) / 180;
          const translateDist = isHighlighted ? 6 : isHovered ? 4 : 0;
          const tx = Math.cos(midRad) * translateDist;
          const ty = Math.sin(midRad) * translateDist;

          return (
            <motion.g
              key={arc.spirit}
              onMouseEnter={() => setHoveredSpirit(arc.spirit)}
              onMouseLeave={() => setHoveredSpirit(null)}
              onClick={() => handleArcClick(arc.spirit)}
              style={{ cursor: handleHighlight ? "pointer" : "default" }}
              role="button"
              tabIndex={0}
              aria-label={`${SPIRIT_LABELS[arc.spirit]}: ${arc.count} drink${arc.count !== 1 ? "s" : ""}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleArcClick(arc.spirit);
                }
              }}
            >
              {/* Arc path */}
              <motion.path
                d={arc.path}
                fill={color}
                initial={
                  shouldReduceMotion
                    ? { opacity: isDimmed ? 0.25 : 0.85 }
                    : { opacity: 0, scale: 0.8 }
                }
                animate={
                  isInView || shouldReduceMotion
                    ? {
                        opacity: isDimmed
                          ? 0.25
                          : isHighlighted || isHovered
                            ? 1
                            : 0.85,
                        scale: 1,
                        translateX: tx,
                        translateY: ty,
                      }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  opacity: { duration: 0.2 },
                  scale: {
                    duration: shouldReduceMotion ? 0 : 0.6,
                    delay: shouldReduceMotion ? 0 : i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  translateX: {
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  translateY: {
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />

              {/* Highlight glow ring */}
              {isHighlighted && (
                <motion.path
                  d={arc.path}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  initial={shouldReduceMotion ? {} : { opacity: 0 }}
                  animate={{
                    opacity: 0.6,
                    translateX: tx,
                    translateY: ty,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    filter: `drop-shadow(0 0 4px ${color})`,
                    transformOrigin: `${CX}px ${CY}px`,
                  }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Center label */}
        <text
          x={CX}
          y={CY - 8}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-[28px] font-bold"
          fill="#78350F"
        >
          {uniqueSpirits}
        </text>
        <text
          x={CX}
          y={CY + 10}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-[10px] font-medium uppercase tracking-wider"
          fill="#A16207"
        >
          Spirits
        </text>
        <text
          x={CX}
          y={CY + 24}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-[10px] font-medium"
          fill="#92400E"
        >
          {totalDrinks} Drinks
        </text>
      </svg>

      {/* Legend — arc labels below the chart */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-4 max-w-[320px]">
        {arcs.map((arc) => {
          const color = SPIRIT_COLORS[arc.spirit] ?? "#78350F";
          const isDimmed =
            highlightSpirit != null && highlightSpirit !== arc.spirit;
          const isHighlighted = highlightSpirit === arc.spirit;

          return (
            <button
              key={arc.spirit}
              type="button"
              className="flex items-center gap-1.5 text-[11px] font-medium transition-opacity duration-200"
              style={{
                color: isDimmed ? "#C4A882" : "#78350F",
                opacity: isDimmed ? 0.5 : 1,
              }}
              onClick={() => handleArcClick(arc.spirit)}
              onMouseEnter={() => setHoveredSpirit(arc.spirit)}
              onMouseLeave={() => setHoveredSpirit(null)}
            >
              <span
                className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-200"
                style={{
                  backgroundColor: color,
                  transform: isHighlighted ? "scale(1.3)" : "scale(1)",
                }}
              />
              {SPIRIT_LABELS[arc.spirit]}
              <span className="tabular-nums text-[10px] opacity-70">
                {arc.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
