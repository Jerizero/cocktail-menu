"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { drinks } from "@/data/drinks";
import { CATEGORY_COLORS } from "@/lib/colors";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Props {
  onSelectDrink?: (id: number) => void;
  selectedId?: number | null;
}

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

// Layout constants
const MARGIN = { top: 50, right: 40, bottom: 50, left: 50 };
const FULL_W = 640;
const FULL_H = 500;
const PLOT_W = FULL_W - MARGIN.left - MARGIN.right;
const PLOT_H = FULL_H - MARGIN.top - MARGIN.bottom;

// Annotation targets
const ANNOTATION_CAFECITO_ID = 7;
const ANNOTATION_CHINOLA_ID = 2;

// Map drink to plot coordinates
const getPosition = (drink: (typeof drinks)[0]) => {
  const { sweet, dry, weight, complexity } = drink.dimensions;
  // X: sweet (left) to dry (right)
  const x = ((dry - sweet + 10) / 20) * PLOT_W;
  // Y: light (top) to heavy (bottom)
  const y = (weight / 10) * PLOT_H;
  // Radius: complexity mapped to 8-20px
  const r = 8 + (complexity / 10) * 12;
  return { x, y, r };
};

// Simple label collision avoidance
interface LabelPlacement {
  drinkId: number;
  x: number;
  y: number;
  anchor: "start" | "end";
  offsetX: number;
  offsetY: number;
}

const computeLabelPlacements = (): LabelPlacement[] => {
  const placements: LabelPlacement[] = [];
  const occupied: { x: number; y: number; w: number; h: number }[] = [];

  for (const drink of drinks) {
    const pos = getPosition(drink);
    const name = getShortName(drink);
    const estWidth = name.length * 6.5;
    const estHeight = 14;

    // Try right side first, then left
    const candidates: { anchor: "start" | "end"; ox: number; oy: number }[] = [
      { anchor: "start", ox: pos.r + 4, oy: -4 },
      { anchor: "end", ox: -(pos.r + 4), oy: -4 },
      { anchor: "start", ox: pos.r + 4, oy: pos.r + 12 },
      { anchor: "end", ox: -(pos.r + 4), oy: pos.r + 12 },
      { anchor: "start", ox: pos.r + 4, oy: -(pos.r + 8) },
    ];

    let placed = false;
    for (const c of candidates) {
      const lx = c.anchor === "start" ? pos.x + c.ox : pos.x + c.ox - estWidth;
      const ly = pos.y + c.oy - estHeight / 2;
      const rect = { x: lx, y: ly, w: estWidth, h: estHeight };

      const collides = occupied.some(
        (o) =>
          rect.x < o.x + o.w &&
          rect.x + rect.w > o.x &&
          rect.y < o.y + o.h &&
          rect.y + rect.h > o.y
      );

      if (!collides && lx >= -10 && lx + estWidth <= PLOT_W + 20 && ly >= -10 && ly + estHeight <= PLOT_H + 20) {
        placements.push({
          drinkId: drink.id,
          x: pos.x + c.ox,
          y: pos.y + c.oy,
          anchor: c.anchor,
          offsetX: c.ox,
          offsetY: c.oy,
        });
        occupied.push(rect);
        placed = true;
        break;
      }
    }

    if (!placed) {
      placements.push({
        drinkId: drink.id,
        x: pos.x + pos.r + 4,
        y: pos.y - 4,
        anchor: "start",
        offsetX: pos.r + 4,
        offsetY: -4,
      });
    }
  }

  return placements;
};

// --- Annotation arrow component ---
const Annotation = ({
  fromX,
  fromY,
  toX,
  toY,
  text,
  textAnchor = "start",
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  text: string;
  textAnchor?: "start" | "middle" | "end" | "inherit";
}) => (
  <g>
    <line
      x1={fromX}
      y1={fromY}
      x2={toX}
      y2={toY}
      stroke="#78350F"
      strokeWidth={1}
      strokeDasharray="3 2"
      opacity={0.6}
    />
    {/* Arrow tip */}
    <circle cx={toX} cy={toY} r={2.5} fill="#78350F" opacity={0.6} />
    <text
      x={fromX}
      y={fromY - 6}
      textAnchor={textAnchor}
      className="text-[11px] font-medium italic"
      fill="#78350F"
    >
      {text}
    </text>
  </g>
);

// --- Desktop Scatter ---

const DesktopScatter = ({ onSelectDrink, selectedId }: Props) => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const labelPlacements = useMemo(computeLabelPlacements, []);

  const centerX = PLOT_W / 2;
  const centerY = PLOT_H / 2;

  return (
    <svg
      viewBox={`0 0 ${FULL_W} ${FULL_H}`}
      className="w-full max-w-[640px]"
      role="img"
      aria-label={`Scatter plot of ${drinks.length} cocktails. X axis: Sweet (left) to Dry (right). Y axis: Light (top) to Heavy (bottom). Dot size represents complexity.`}
    >
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        {/* Quadrant labels */}
        <text x={PLOT_W * 0.15} y={24} textAnchor="middle" className="text-[11px]" fill="#D4A574" opacity={0.5}>
          Sweet &amp; Light
        </text>
        <text x={PLOT_W * 0.85} y={24} textAnchor="middle" className="text-[11px]" fill="#D4A574" opacity={0.5}>
          Dry &amp; Light
        </text>
        <text x={PLOT_W * 0.15} y={PLOT_H - 12} textAnchor="middle" className="text-[11px]" fill="#D4A574" opacity={0.5}>
          Sweet &amp; Heavy
        </text>
        <text x={PLOT_W * 0.85} y={PLOT_H - 12} textAnchor="middle" className="text-[11px]" fill="#D4A574" opacity={0.5}>
          Dry &amp; Heavy
        </text>

        {/* Axis lines through center */}
        <line x1={0} y1={centerY} x2={PLOT_W} y2={centerY} stroke="#E7E5E4" strokeWidth={0.75} />
        <line x1={centerX} y1={0} x2={centerX} y2={PLOT_H} stroke="#E7E5E4" strokeWidth={0.75} />

        {/* Axis labels */}
        <text x={0} y={centerY - 8} textAnchor="start" className="text-[10px] font-semibold" fill="#92400E" opacity={0.7}>
          Sweet
        </text>
        <text x={PLOT_W} y={centerY - 8} textAnchor="end" className="text-[10px] font-semibold" fill="#92400E" opacity={0.7}>
          Dry
        </text>
        <text x={centerX + 8} y={12} textAnchor="start" className="text-[10px] font-semibold" fill="#92400E" opacity={0.7}>
          Light
        </text>
        <text x={centerX + 8} y={PLOT_H - 4} textAnchor="start" className="text-[10px] font-semibold" fill="#92400E" opacity={0.7}>
          Heavy
        </text>

        {/* Dots */}
        {drinks.map((drink, i) => {
          const pos = getPosition(drink);
          const color = CATEGORY_COLORS[drink.category];
          const isHovered = hoveredId === drink.id;
          const isSelected = selectedId === drink.id;
          const hasSelection = selectedId != null;
          // Dimming: if something is selected, unselected+unhovered dots dim to 0.3
          const baseOpacity = hasSelection && !isSelected && !isHovered ? 0.3 : isHovered || isSelected ? 0.9 : 0.65;

          return (
            <g
              key={drink.id}
              onMouseEnter={() => setHoveredId(drink.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectDrink?.(drink.id)}
              style={{ cursor: onSelectDrink ? "pointer" : "default" }}
              role="button"
              tabIndex={0}
              aria-label={`${getShortName(drink)}: Sweet ${drink.dimensions.sweet}, Dry ${drink.dimensions.dry}, Bitter ${drink.dimensions.bitter}, Weight ${drink.dimensions.weight}, Complexity ${drink.dimensions.complexity}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectDrink?.(drink.id);
                }
              }}
            >
              {/* Pulsing selection ring */}
              {isSelected && !shouldReduceMotion && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={pos.r + 4}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  initial={{ opacity: 0.8, scale: 1 }}
                  animate={{ opacity: [0.8, 0.3, 0.8], scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              {isSelected && shouldReduceMotion && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={pos.r + 4}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  opacity={0.8}
                />
              )}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={pos.r}
                fill={color}
                fillOpacity={baseOpacity}
                stroke={isSelected ? "#78350F" : isHovered ? "#78350F" : color}
                strokeWidth={isSelected || isHovered ? 2 : 1}
                initial={
                  shouldReduceMotion
                    ? {}
                    : { r: 0, fillOpacity: 0 }
                }
                animate={{
                  r: pos.r,
                  fillOpacity: baseOpacity,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </g>
          );
        })}

        {/* Direct labels */}
        {drinks.map((drink) => {
          const placement = labelPlacements.find((p) => p.drinkId === drink.id);
          if (!placement) return null;

          return (
            <text
              key={`label-${drink.id}`}
              x={placement.x}
              y={placement.y}
              textAnchor={placement.anchor}
              dominantBaseline="middle"
              className="text-[11px] font-medium pointer-events-none"
              fill={hoveredId === drink.id ? "#78350F" : "#92400E"}
              opacity={hoveredId === drink.id ? 1 : 0.85}
            >
              {getShortName(drink)}
            </text>
          );
        })}

        {/* Annotation callouts */}
        {(() => {
          const cafecito = drinks.find((d) => d.id === ANNOTATION_CAFECITO_ID);
          const chinola = drinks.find((d) => d.id === ANNOTATION_CHINOLA_ID);
          if (!cafecito || !chinola) return null;

          const cafPos = getPosition(cafecito);
          const chiPos = getPosition(chinola);

          return (
            <>
              <Annotation
                fromX={cafPos.x + 40}
                fromY={cafPos.y - 40}
                toX={cafPos.x + cafPos.r + 2}
                toY={cafPos.y - cafPos.r - 2}
                text="Highest complexity: 9/10"
              />
              <Annotation
                fromX={chiPos.x + 40}
                fromY={chiPos.y - 35}
                toX={chiPos.x + chiPos.r + 2}
                toY={chiPos.y - chiPos.r - 2}
                text="Lightest & most refreshing"
              />
            </>
          );
        })()}
      </g>
    </svg>
  );
};

// --- Mobile Scatter (numbered dots + legend) ---

const MobileScatter = ({ onSelectDrink, selectedId }: Props) => {
  const shouldReduceMotion = useReducedMotion();
  const MOBILE_W = 360;
  const MOBILE_H = 320;
  const M_MARGIN = { top: 36, right: 20, bottom: 36, left: 36 };
  const M_PLOT_W = MOBILE_W - M_MARGIN.left - M_MARGIN.right;
  const M_PLOT_H = MOBILE_H - M_MARGIN.top - M_MARGIN.bottom;

  const getMobilePos = (drink: (typeof drinks)[0]) => {
    const { sweet, dry, weight, complexity } = drink.dimensions;
    const x = ((dry - sweet + 10) / 20) * M_PLOT_W;
    const y = (weight / 10) * M_PLOT_H;
    const r = 6 + (complexity / 10) * 8;
    return { x, y, r };
  };

  const centerX = M_PLOT_W / 2;
  const centerY = M_PLOT_H / 2;

  return (
    <div>
      <svg
        viewBox={`0 0 ${MOBILE_W} ${MOBILE_H}`}
        className="w-full max-w-[360px] mx-auto"
        role="img"
        aria-label={`Scatter plot of ${drinks.length} cocktails. X: Sweet to Dry. Y: Light to Heavy.`}
      >
        <g transform={`translate(${M_MARGIN.left}, ${M_MARGIN.top})`}>
          {/* Axis lines */}
          <line x1={0} y1={centerY} x2={M_PLOT_W} y2={centerY} stroke="#E7E5E4" strokeWidth={0.75} />
          <line x1={centerX} y1={0} x2={centerX} y2={M_PLOT_H} stroke="#E7E5E4" strokeWidth={0.75} />

          {/* Axis labels */}
          <text x={0} y={-8} className="text-[9px] font-semibold" fill="#92400E" opacity={0.6}>Sweet</text>
          <text x={M_PLOT_W} y={-8} textAnchor="end" className="text-[9px] font-semibold" fill="#92400E" opacity={0.6}>Dry</text>
          <text x={centerX + 4} y={8} className="text-[9px] font-semibold" fill="#92400E" opacity={0.6}>Light</text>
          <text x={centerX + 4} y={M_PLOT_H - 2} className="text-[9px] font-semibold" fill="#92400E" opacity={0.6}>Heavy</text>

          {/* Numbered dots */}
          {drinks.map((drink, i) => {
            const pos = getMobilePos(drink);
            const color = CATEGORY_COLORS[drink.category];
            const isSelected = selectedId === drink.id;
            const hasSelection = selectedId != null;
            const dotOpacity = hasSelection && !isSelected ? 0.3 : isSelected ? 0.9 : 0.65;

            return (
              <g
                key={drink.id}
                onClick={() => onSelectDrink?.(drink.id)}
                style={{ cursor: onSelectDrink ? "pointer" : "default" }}
              >
                {/* Invisible hit area for touch targets */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={pos.r + 8}
                  fill="transparent"
                />
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={pos.r}
                  fill={color}
                  fillOpacity={dotOpacity}
                  stroke={isSelected ? "#78350F" : color}
                  strokeWidth={isSelected ? 2 : 1}
                  initial={shouldReduceMotion ? {} : { r: 0 }}
                  animate={{ r: pos.r, fillOpacity: dotOpacity }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : i * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[9px] font-bold pointer-events-none"
                  fill="#FFFBEB"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend / key */}
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 px-2">
        {drinks.map((drink, i) => (
          <button
            key={drink.id}
            onClick={() => onSelectDrink?.(drink.id)}
            className="flex items-center gap-1.5 text-left py-0.5 hover:bg-amber-50 rounded px-1 transition-colors"
          >
            <span
              className="w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0"
              style={{
                backgroundColor: CATEGORY_COLORS[drink.category],
                color: "#FFFBEB",
              }}
            >
              {i + 1}
            </span>
            <span className="text-[11px] text-amber-900 truncate">
              {getShortName(drink)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---

export const FlavorScatter = (props: Props) => {
  const isMobile = useIsMobile(500);

  return isMobile ? <MobileScatter {...props} /> : <DesktopScatter {...props} />;
};
