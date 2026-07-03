"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import type { Region } from "@/data/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  activeRegion: Region | null;
  onSelectRegion: (region: Region | null) => void;
}

// ─── SVG paths projected from real lat/lon coordinates ───────────────
// viewBox "0 0 500 280"
// x = ((lon+74.5)/6.2)*440+30, y = ((20.0-lat)/2.4)*220+30

// Dominican Republic — ~55 coastline points, clockwise from border north
const DR_OUTLINE =
  "M228,71 L230,58 L232,44 L241,39 L257,40 L271,41 L282,39" +
  " L294,46 L300,49 L312,52 L325,55 L339,61 L353,76 L360,85" +
  " L369,90 L381,95 L393,97 L410,102 L419,103" +
  " L408,111 L395,114 L381,118" +
  " L385,124 L399,133 L413,142 L427,151 L442,158 L456,164" +
  " L465,168 L469,172 L466,181 L461,190" +
  " L445,193 L427,188 L422,175 L399,173 L378,171 L356,170" +
  " L339,177 L326,188 L312,186 L298,179" +
  " L285,193 L271,195 L261,220 L250,232 L239,230 L230,218 L226,210" +
  " L224,193 L223,172 L220,156 L223,140 L227,122 L227,103 L228,87 L228,71 Z";

// Haiti — simplified context shape
const HAITI =
  "M228,71 L228,87 L227,103 L227,122 L223,140 L220,156 L223,172 L224,193 L226,210" +
  " L215,211 L197,197 L170,193 L147,197 L119,197 L83,195" +
  " L60,193 L41,197" +
  " L48,175 L58,163 L83,156 L108,163" +
  " L129,154 L147,149 L161,166 L183,164" +
  " L186,149 L179,131 L172,112 L159,94" +
  " L147,76 L129,67 L109,48" +
  " L129,46 L151,50 L172,52 L193,52 L207,56 L218,62 L228,71 Z";

// Samaná peninsula — narrow finger, not the bay
const SAMANA_PATH =
  "M362,86 L369,89 L381,93 L393,96 L406,100 L419,103" +
  " L417,109 L404,107 L393,104 L381,100 L369,96 L362,93 L362,86 Z";

// Tenares — Cibao Valley, north-interior
const TENARES_PATH =
  "M300,62 L314,58 L330,62 L336,70 L334,79 L322,84 L308,81 L300,73 L300,62 Z";

// Santo Domingo (~69.9W, 18.47N)
const SANTO_DOMINGO = { x: 356, y: 170 };

// Cordillera Central — faint mountain range
const CORDILLERA_PATH =
  "M236,117 L261,123 L285,129 L310,133 L335,138 L364,142 L385,145";

export const DRMap = ({ activeRegion, onSelectRegion }: Props) => {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const animate = isInView && !shouldReduceMotion;

  const handleClick = useCallback(
    (region: Region) => {
      onSelectRegion(activeRegion === region ? null : region);
    },
    [activeRegion, onSelectRegion],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, region: Region) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick(region);
      }
      if (e.key === "Escape") {
        onSelectRegion(null);
      }
    },
    [handleClick, onSelectRegion],
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 500 280"
      className="w-full h-auto max-w-[550px]"
      role="group"
      aria-label="Interactive map of Dominican Republic showing Samaná and Tenares regions"
    >
      {/* Haiti — context shape */}
      <path d={HAITI} fill="#D6D3D1" fillOpacity={0.3} stroke="none" />

      {/* DR outline — draw-on animation */}
      <motion.path
        d={DR_OUTLINE}
        fill="#F5F0E8"
        fillOpacity={0.5}
        stroke="#A89F91"
        strokeWidth={1.5}
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0 } : {}}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Cordillera Central — faint mountain range line */}
      <motion.path
        d={CORDILLERA_PATH}
        fill="none"
        stroke="#A89F91"
        strokeWidth={0.8}
        strokeOpacity={0.25}
        strokeDasharray="4 3"
        strokeLinecap="round"
        initial={animate ? { pathLength: 0 } : {}}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{
          delay: animate ? 1.0 : 0,
          duration: 0.8,
          ease: "easeInOut",
        }}
      />

      {/* Samaná region */}
      <motion.path
        d={SAMANA_PATH}
        fill="#B45309"
        fillOpacity={activeRegion === "samana" ? 0.35 : 0.15}
        stroke={activeRegion === "samana" ? "#B45309" : "#A89F91"}
        strokeWidth={activeRegion === "samana" ? 2 : 1}
        className="cursor-pointer outline-none"
        tabIndex={0}
        role="button"
        aria-label="Samaná region — Coco Concon Refrescante"
        aria-pressed={activeRegion === "samana"}
        onClick={() => handleClick("samana")}
        onKeyDown={(e) => handleKeyDown(e, "samana")}
        whileHover={{ fillOpacity: 0.3, scale: 1.05 }}
        whileFocus={{ stroke: "#B45309", strokeWidth: 2 }}
        initial={animate ? { opacity: 0 } : {}}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: animate ? 1.3 : 0, duration: 0.5 }}
        style={{ transformOrigin: "392px 97px" }}
      />

      {/* Tenares region */}
      <motion.path
        d={TENARES_PATH}
        fill="#78350F"
        fillOpacity={activeRegion === "tenares" ? 0.35 : 0.15}
        stroke={activeRegion === "tenares" ? "#78350F" : "#A89F91"}
        strokeWidth={activeRegion === "tenares" ? 2 : 1}
        className="cursor-pointer outline-none"
        tabIndex={0}
        role="button"
        aria-label="Tenares region — El Tabaquero Francés"
        aria-pressed={activeRegion === "tenares"}
        onClick={() => handleClick("tenares")}
        onKeyDown={(e) => handleKeyDown(e, "tenares")}
        whileHover={{ fillOpacity: 0.3, scale: 1.05 }}
        whileFocus={{ stroke: "#78350F", strokeWidth: 2 }}
        initial={animate ? { opacity: 0 } : {}}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: animate ? 1.5 : 0, duration: 0.5 }}
        style={{ transformOrigin: "318px 71px" }}
      />

      {/* Labels */}
      <motion.g
        initial={animate ? { opacity: 0 } : {}}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: animate ? 1.8 : 0, duration: 0.4 }}
      >
        {/* DR label */}
        <text
          x="340"
          y="155"
          fill="#78350F"
          fillOpacity={0.5}
          fontSize="11"
          fontFamily="var(--font-sans)"
          fontWeight="500"
          textAnchor="middle"
          letterSpacing="2"
        >
          DOMINICAN REPUBLIC
        </text>

        {/* Samaná label */}
        <text
          x="399"
          y="80"
          fill="#B45309"
          fillOpacity={activeRegion === "samana" ? 0.9 : 0.6}
          fontSize="9"
          fontFamily="var(--font-sans)"
          fontWeight="600"
          textAnchor="middle"
        >
          Samaná
        </text>

        {/* Tenares label */}
        <text
          x="318"
          y="96"
          fill="#78350F"
          fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6}
          fontSize="9"
          fontFamily="var(--font-sans)"
          fontWeight="600"
          textAnchor="middle"
        >
          Tenares
        </text>

        {/* Santo Domingo marker */}
        <circle
          cx={SANTO_DOMINGO.x}
          cy={SANTO_DOMINGO.y}
          r={3}
          fill="#78350F"
          fillOpacity={0.4}
        />
        <circle
          cx={SANTO_DOMINGO.x}
          cy={SANTO_DOMINGO.y}
          r={1.5}
          fill="#78350F"
          fillOpacity={0.7}
        />
        <text
          x={SANTO_DOMINGO.x + 8}
          y={SANTO_DOMINGO.y + 4}
          fill="#78350F"
          fillOpacity={0.45}
          fontSize="7.5"
          fontFamily="var(--font-sans)"
          fontWeight="500"
        >
          Santo Domingo
        </text>

        {/* Cordillera Central label */}
        <text
          x="310"
          y="130"
          fill="#A89F91"
          fillOpacity={0.35}
          fontSize="6"
          fontFamily="var(--font-sans)"
          fontWeight="400"
          fontStyle="italic"
          textAnchor="middle"
        >
          Cordillera Central
        </text>
      </motion.g>
    </svg>
  );
};

// Mobile-only card-based region selector
export const RegionSelector = ({
  activeRegion,
  onSelectRegion,
}: {
  activeRegion: Region | null;
  onSelectRegion: (region: Region | null) => void;
}) => {
  const regions: {
    id: Region;
    name: string;
    drink: string;
    color: string;
  }[] = [
    {
      id: "samana",
      name: "Samaná",
      drink: "Coco Concon Refrescante",
      color: "#B45309",
    },
    {
      id: "tenares",
      name: "Tenares",
      drink: "El Tabaquero Francés",
      color: "#78350F",
    },
  ];

  return (
    <div className="flex gap-3 md:hidden">
      {regions.map((r) => (
        <button
          key={r.id}
          onClick={() =>
            onSelectRegion(activeRegion === r.id ? null : r.id)
          }
          className={`flex-1 p-4 rounded-xl border-2 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber/40 ${
            activeRegion === r.id
              ? "border-amber bg-amber/5"
              : "border-border/50 bg-white/40 hover:border-amber/30"
          }`}
          aria-pressed={activeRegion === r.id}
        >
          <div
            className="w-2 h-2 rounded-full mb-2"
            style={{ backgroundColor: r.color }}
          />
          <p className="font-serif text-lg text-text-primary">{r.name}</p>
          <p className="text-xs text-text-muted mt-0.5">{r.drink}</p>
        </button>
      ))}
    </div>
  );
};
