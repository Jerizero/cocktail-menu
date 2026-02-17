"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { drinks } from "@/data/drinks";
import type { DimensionalScores } from "@/data/types";
import { getHeatmapColor, getHeatmapTextColor } from "@/lib/colors";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  activeDimension?: number | null;
  onSelectDrink?: (id: number) => void;
}

const DIMENSIONS: { key: keyof DimensionalScores; label: string; initial: string }[] = [
  { key: "boozy", label: "Boozy", initial: "B" },
  { key: "refreshing", label: "Refreshing", initial: "R" },
  { key: "sweet", label: "Sweet", initial: "S" },
  { key: "dryBitter", label: "Dry/Bitter", initial: "D" },
  { key: "tart", label: "Tart", initial: "T" },
  { key: "weight", label: "Weight", initial: "W" },
  { key: "complexity", label: "Complexity", initial: "C" },
];

const SHORT_NAMES: Record<number, string> = {
  1: "Sueno",
  2: "Chinola",
  3: "Coco Concon",
  4: "Mabi",
  5: "Negroni",
  6: "Mango",
  7: "Cafecito",
  8: "El Sazón",
  9: "Habichuela",
  10: "Tabaquero",
  11: "Pina Colada",
  12: "Malta Flip",
  13: "Mamajuana",
};

const getShortName = (drink: (typeof drinks)[0]): string =>
  SHORT_NAMES[drink.id] ?? drink.name.split(" ")[0];

// --- SVG Heatmap (Desktop) ---

const CELL_W = 64;
const CELL_H = 36;
const ROW_LABEL_W = 100;
const COL_HEADER_H = 44;
const PADDING = 8;

const SVG_W = ROW_LABEL_W + DIMENSIONS.length * CELL_W + PADDING * 2;
const SVG_H = COL_HEADER_H + drinks.length * CELL_H + PADDING * 2;

const DesktopHeatmap = ({ activeDimension, onSelectDrink }: Props) => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleRowClick = useCallback(
    (drinkId: number) => {
      onSelectDrink?.(drinkId);
    },
    [onSelectDrink]
  );

  const ariaLabel = `Heatmap of dimensional scores for ${drinks.length} cocktails across 7 flavor dimensions: ${DIMENSIONS.map((d) => d.label).join(", ")}. Scores range from 0 to 10.`;

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="w-full max-w-[700px]"
      role="img"
      aria-label={ariaLabel}
    >
      {/* Column headers */}
      {DIMENSIONS.map((dim, colIdx) => {
        const x = ROW_LABEL_W + colIdx * CELL_W + CELL_W / 2 + PADDING;
        const isActive = activeDimension === colIdx;
        return (
          <g key={dim.key}>
            <text
              x={x}
              y={PADDING + COL_HEADER_H / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[12px] font-semibold"
              fill={isActive ? "#92400E" : "#78350F"}
              opacity={activeDimension != null && !isActive ? 0.4 : 1}
            >
              {dim.label}
            </text>
          </g>
        );
      })}

      {/* Active column highlight */}
      {activeDimension != null && (
        <motion.rect
          x={ROW_LABEL_W + activeDimension * CELL_W + PADDING - 1}
          y={COL_HEADER_H + PADDING - 1}
          width={CELL_W + 2}
          height={drinks.length * CELL_H + 2}
          rx={4}
          fill="none"
          stroke="#B45309"
          strokeWidth={2}
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* Rows */}
      {drinks.map((drink, rowIdx) => {
        const y = COL_HEADER_H + rowIdx * CELL_H + PADDING;
        const isHovered = hoveredRow === rowIdx;

        return (
          <g
            key={drink.id}
            onMouseEnter={() => setHoveredRow(rowIdx)}
            onMouseLeave={() => setHoveredRow(null)}
            onClick={() => handleRowClick(drink.id)}
            style={{ cursor: onSelectDrink ? "pointer" : "default" }}
            role="button"
            tabIndex={0}
            aria-label={`${getShortName(drink)}: ${DIMENSIONS.map(
              (d) => `${d.label} ${drink.dimensions[d.key]}`
            ).join(", ")}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleRowClick(drink.id);
              }
            }}
          >
            {/* Row highlight background */}
            {isHovered && (
              <motion.rect
                x={PADDING}
                y={y}
                width={SVG_W - PADDING * 2}
                height={CELL_H}
                rx={4}
                fill="#FBBF24"
                initial={shouldReduceMotion ? { opacity: 0.12 } : { opacity: 0 }}
                animate={{ opacity: 0.12 }}
                transition={{ duration: 0.15 }}
              />
            )}

            {/* Row label */}
            <text
              x={PADDING + 4}
              y={y + CELL_H / 2}
              dominantBaseline="middle"
              className="text-[12px] font-medium"
              fill={isHovered ? "#92400E" : "#78350F"}
            >
              {getShortName(drink)}
            </text>

            {/* Cells */}
            {DIMENSIONS.map((dim, colIdx) => {
              const value = drink.dimensions[dim.key];
              const cellX = ROW_LABEL_W + colIdx * CELL_W + PADDING;
              const bgColor = getHeatmapColor(value);
              const textColor = getHeatmapTextColor(value);
              const isDimmed =
                activeDimension != null && activeDimension !== colIdx;

              return (
                <g key={dim.key}>
                  <motion.rect
                    x={cellX + 1}
                    y={y + 1}
                    width={CELL_W - 2}
                    height={CELL_H - 2}
                    rx={4}
                    fill={bgColor}
                    initial={shouldReduceMotion ? {} : { opacity: 0 }}
                    animate={{ opacity: isDimmed ? 0.35 : 1 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                  <text
                    x={cellX + CELL_W / 2}
                    y={y + CELL_H / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[11px] font-semibold tabular-nums"
                    fill={textColor}
                    opacity={isDimmed ? 0.4 : 1}
                  >
                    {value}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

// --- Mobile Compact List ---

const MiniBar = ({
  value,
  initial,
  dimmed,
}: {
  value: number;
  initial: string;
  dimmed: boolean;
}) => {
  const widthPct = (value / 10) * 100;
  const bgColor = getHeatmapColor(value);
  const textColor = getHeatmapTextColor(value);

  return (
    <div
      className="flex items-center gap-1"
      style={{ opacity: dimmed ? 0.35 : 1 }}
    >
      <span className="text-[10px] font-semibold text-amber-900 w-3 text-center shrink-0">
        {initial}
      </span>
      <div className="relative h-4 flex-1 rounded-sm bg-amber-50 overflow-hidden min-w-0">
        <div
          className="absolute inset-y-0 left-0 rounded-sm transition-all duration-300"
          style={{ width: `${widthPct}%`, backgroundColor: bgColor }}
        />
        <span
          className="absolute inset-0 flex items-center justify-center text-[10px] font-bold tabular-nums"
          style={{ color: value >= 5 ? textColor : "#78350F" }}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

const MobileHeatmap = ({ activeDimension, onSelectDrink }: Props) => {
  return (
    <div
      className="space-y-3"
      role="img"
      aria-label={`Compact dimensional scores for ${drinks.length} cocktails`}
    >
      {drinks.map((drink) => (
        <button
          key={drink.id}
          onClick={() => onSelectDrink?.(drink.id)}
          className="w-full text-left p-3 rounded-lg bg-amber-50/50 border border-amber-100
                     hover:bg-amber-100/60 active:bg-amber-100 transition-colors"
        >
          <div className="text-[13px] font-semibold text-amber-900 mb-2">
            {getShortName(drink)}
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {DIMENSIONS.map((dim, colIdx) => (
              <MiniBar
                key={dim.key}
                value={drink.dimensions[dim.key]}
                initial={dim.initial}
                dimmed={activeDimension != null && activeDimension !== colIdx}
              />
            ))}
          </div>
        </button>
      ))}
    </div>
  );
};

// --- Main Component ---

export const DimensionalHeatmap = (props: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? <MobileHeatmap {...props} /> : <DesktopHeatmap {...props} />;
};
