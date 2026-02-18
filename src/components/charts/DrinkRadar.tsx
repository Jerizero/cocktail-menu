"use client";

import { motion } from "framer-motion";
import type { DimensionalScores } from "@/data/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  dimensions: DimensionalScores;
  color: string;
  animate?: boolean;
}

const AXES: { key: keyof DimensionalScores; label: string }[] = [
  { key: "boozy", label: "Boozy" },
  { key: "refreshing", label: "Refreshing" },
  { key: "sweet", label: "Sweet" },
  { key: "dry", label: "Dry" },
  { key: "bitter", label: "Bitter" },
  { key: "tart", label: "Tart" },
  { key: "weight", label: "Weight" },
  { key: "complexity", label: "Complexity" },
];

const SIZE = 280;
const CENTER = SIZE / 2;
const RADIUS = 110;
const RINGS = [2, 4, 6, 8, 10];

const polarToCartesian = (
  angle: number,
  radius: number
): { x: number; y: number } => ({
  x: CENTER + radius * Math.cos(angle - Math.PI / 2),
  y: CENTER + radius * Math.sin(angle - Math.PI / 2),
});

export const DrinkRadar = ({ dimensions, color, animate = true }: Props) => {
  const shouldReduceMotion = useReducedMotion();
  const angleStep = (2 * Math.PI) / AXES.length;

  // Build polygon points
  const points = AXES.map((axis, i) => {
    const value = dimensions[axis.key];
    const r = (value / 10) * RADIUS;
    return polarToCartesian(i * angleStep, r);
  });

  const polygonPath =
    points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") +
    " Z";

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="w-full max-w-[280px]"
      role="img"
      aria-label={`Radar chart showing dimensional profile: ${AXES.map(
        (a) => `${a.label} ${dimensions[a.key]}/10`
      ).join(", ")}`}
    >
      {/* Grid rings */}
      {RINGS.map((ring) => (
        <polygon
          key={ring}
          points={AXES.map((_, i) => {
            const p = polarToCartesian(i * angleStep, (ring / 10) * RADIUS);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="#E7E5E4"
          strokeWidth={ring === 10 ? 1 : 0.5}
          opacity={0.6}
        />
      ))}

      {/* Axis lines */}
      {AXES.map((_, i) => {
        const end = polarToCartesian(i * angleStep, RADIUS);
        return (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={end.x}
            y2={end.y}
            stroke="#E7E5E4"
            strokeWidth={0.5}
          />
        );
      })}

      {/* Data polygon */}
      <motion.path
        d={polygonPath}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={2}
        initial={
          animate && !shouldReduceMotion
            ? {
                pathLength: 0,
                fillOpacity: 0,
              }
            : {}
        }
        animate={{ pathLength: 1, fillOpacity: 0.2 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Axis labels + values */}
      {AXES.map((axis, i) => {
        const labelR = RADIUS + 24;
        const pos = polarToCartesian(i * angleStep, labelR);
        const value = dimensions[axis.key];
        const valuePos = polarToCartesian(
          i * angleStep,
          (value / 10) * RADIUS + 12
        );

        return (
          <g key={axis.key}>
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] fill-text-secondary"
            >
              {axis.label}
            </text>
            <text
              x={valuePos.x}
              y={valuePos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[11px] font-medium tabular-nums"
              fill={color}
            >
              {value}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
