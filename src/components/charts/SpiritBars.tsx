"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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

const SPIRIT_LABELS: Record<Spirit, string> = {
  rum: "Rum",
  cognac: "Cognac",
  gin: "Gin",
  scotch: "Scotch",
  rye: "Rye",
  vodka: "Vodka",
  aquavit: "Aquavit",
  bourbon: "Bourbon",
  mezcal: "Mezcal",
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

// Build insight title dynamically from data
const buildInsightTitle = (counts: SpiritCount[]): string => {
  if (counts.length === 0) return "Spirit Distribution";
  const top = counts[0];
  const label = SPIRIT_LABELS[top.spirit];
  return `${label} Anchors the Menu \u2014 Present in ${top.count} of ${drinks.length} Drinks`;
};

// Layout constants
const BAR_HEIGHT = 32;
const BAR_GAP = 8;
const LABEL_W = 80;
const COUNT_W = 36;
const MARGIN = { top: 8, right: 16, bottom: 8, left: 8 };

export const SpiritBars = ({ highlightSpirit, onHighlightSpirit, onHighlight }: Props) => {
  const handleHighlight = onHighlightSpirit ?? onHighlight ?? null;
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [hoveredSpirit, setHoveredSpirit] = useState<string | null>(null);

  const spiritCounts = useMemo(computeSpiritCounts, []);
  const insightTitle = useMemo(() => buildInsightTitle(spiritCounts), [spiritCounts]);
  const maxCount = spiritCounts.length > 0 ? spiritCounts[0].count : 1;

  const totalH =
    MARGIN.top +
    spiritCounts.length * (BAR_HEIGHT + BAR_GAP) -
    BAR_GAP +
    MARGIN.bottom;
  const SVG_W = 480;

  const barAreaW = SVG_W - MARGIN.left - LABEL_W - COUNT_W - MARGIN.right;

  const handleBarClick = (spirit: string) => {
    if (!handleHighlight) return;
    if (highlightSpirit === spirit) {
      handleHighlight(null);
    } else {
      handleHighlight(spirit as Spirit);
    }
  };

  const ariaLabel = `Horizontal bar chart showing spirit distribution across ${drinks.length} cocktails. ${spiritCounts
    .map((s) => `${SPIRIT_LABELS[s.spirit]}: ${s.count} drink${s.count !== 1 ? "s" : ""}`)
    .join(". ")}.`;

  return (
    <div ref={containerRef} className="w-full max-w-[520px]">
      {/* Insight title */}
      <h3 className="text-[15px] font-semibold text-amber-900 mb-3 leading-tight">
        {insightTitle}
      </h3>

      <svg
        viewBox={`0 0 ${SVG_W} ${totalH}`}
        className="w-full"
        role="img"
        aria-label={ariaLabel}
      >
        {spiritCounts.map((item, i) => {
          const y = MARGIN.top + i * (BAR_HEIGHT + BAR_GAP);
          const barW = (item.count / maxCount) * barAreaW;
          const color = SPIRIT_COLORS[item.spirit] ?? "#78350F";
          const isHighlighted = highlightSpirit === item.spirit;
          const isDimmed =
            highlightSpirit != null && highlightSpirit !== item.spirit;
          const isHovered = hoveredSpirit === item.spirit;

          return (
            <g
              key={item.spirit}
              onMouseEnter={() => setHoveredSpirit(item.spirit)}
              onMouseLeave={() => setHoveredSpirit(null)}
              onClick={() => handleBarClick(item.spirit)}
              style={{ cursor: onHighlightSpirit ? "pointer" : "default" }}
              role="button"
              tabIndex={0}
              aria-label={`${SPIRIT_LABELS[item.spirit]}: ${item.count} drink${item.count !== 1 ? "s" : ""}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleBarClick(item.spirit);
                }
              }}
            >
              {/* Spirit name label */}
              <text
                x={MARGIN.left + LABEL_W - 8}
                y={y + BAR_HEIGHT / 2}
                textAnchor="end"
                dominantBaseline="central"
                className="text-[12px] font-medium"
                fill={isDimmed ? "#C4A882" : "#78350F"}
                opacity={isDimmed ? 0.5 : 1}
              >
                {SPIRIT_LABELS[item.spirit]}
              </text>

              {/* Bar background track */}
              <rect
                x={MARGIN.left + LABEL_W}
                y={y + 2}
                width={barAreaW}
                height={BAR_HEIGHT - 4}
                rx={4}
                fill="#FEF3C7"
                opacity={0.4}
              />

              {/* Animated bar */}
              <motion.rect
                x={MARGIN.left + LABEL_W}
                y={y + 2}
                height={BAR_HEIGHT - 4}
                rx={4}
                fill={color}
                initial={
                  shouldReduceMotion ? { width: barW } : { width: 0 }
                }
                animate={
                  isInView || shouldReduceMotion
                    ? {
                        width: barW,
                        opacity: isDimmed ? 0.3 : isHighlighted || isHovered ? 1 : 0.85,
                      }
                    : { width: 0, opacity: 0.85 }
                }
                transition={{
                  width: {
                    duration: shouldReduceMotion ? 0 : 0.6,
                    delay: shouldReduceMotion ? 0 : i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  opacity: { duration: 0.2 },
                }}
              />

              {/* Highlight ring */}
              {isHighlighted && (
                <motion.rect
                  x={MARGIN.left + LABEL_W - 1}
                  y={y + 1}
                  width={barW + 2}
                  height={BAR_HEIGHT - 2}
                  rx={5}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  initial={shouldReduceMotion ? {} : { opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Count label */}
              <motion.text
                x={MARGIN.left + LABEL_W + barW + 8}
                y={y + BAR_HEIGHT / 2}
                dominantBaseline="central"
                className="text-[13px] font-bold tabular-nums"
                fill={isDimmed ? "#C4A882" : "#78350F"}
                opacity={isDimmed ? 0.5 : 1}
                initial={
                  shouldReduceMotion
                    ? {}
                    : { x: MARGIN.left + LABEL_W + 8, opacity: 0 }
                }
                animate={
                  isInView || shouldReduceMotion
                    ? {
                        x: MARGIN.left + LABEL_W + barW + 8,
                        opacity: isDimmed ? 0.5 : 1,
                      }
                    : {}
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  delay: shouldReduceMotion ? 0 : i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {item.count}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
