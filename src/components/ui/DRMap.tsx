"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import type { Region } from "@/data/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  activeRegion: Region | null;
  onSelectRegion: (region: Region | null) => void;
}

// Simplified DR map paths — viewBox 0 0 500 280
const DR_OUTLINE = "M80,140 Q90,110 120,95 Q150,80 185,85 Q210,75 240,78 Q265,70 290,75 Q315,68 340,78 Q365,82 385,95 Q400,108 405,125 Q408,145 395,155 Q375,168 345,172 Q320,175 295,170 Q275,178 255,175 Q230,180 205,178 Q180,182 155,175 Q135,172 115,178 Q95,175 80,165 Q72,155 80,140 Z";

// Haiti fill (low-contrast, just for shape context)
const HAITI = "M55,140 Q60,115 75,105 Q85,98 80,140 Q78,155 72,160 Q65,165 58,158 Q52,152 55,140 Z";

// Samaná peninsula — NE bump
const SAMANA_PATH = "M340,72 Q355,62 375,68 Q388,75 382,85 Q370,88 355,82 Q342,78 340,72 Z";

// Tenares region — interior area near center
const TENARES_PATH = "M220,105 Q235,95 255,98 Q268,102 270,115 Q268,128 255,132 Q238,135 225,128 Q215,118 220,105 Z";

export const DRMap = ({ activeRegion, onSelectRegion }: Props) => {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const animate = isInView && !shouldReduceMotion;

  const handleClick = useCallback((region: Region) => {
    onSelectRegion(activeRegion === region ? null : region);
  }, [activeRegion, onSelectRegion]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, region: Region) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(region);
    }
    if (e.key === "Escape") {
      onSelectRegion(null);
    }
  }, [handleClick, onSelectRegion]);

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

      {/* Samaná region */}
      <motion.path
        d={SAMANA_PATH}
        fill={activeRegion === "samana" ? "#B45309" : "#B45309"}
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
        style={{ transformOrigin: "362px 75px" }}
      />

      {/* Tenares region */}
      <motion.path
        d={TENARES_PATH}
        fill={activeRegion === "tenares" ? "#78350F" : "#78350F"}
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
        style={{ transformOrigin: "245px 115px" }}
      />

      {/* Labels */}
      <motion.g
        initial={animate ? { opacity: 0 } : {}}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: animate ? 1.8 : 0, duration: 0.4 }}
      >
        {/* DR label */}
        <text x="220" y="195" fill="#78350F" fillOpacity={0.5} fontSize="11" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="middle" letterSpacing="2">
          DOMINICAN REPUBLIC
        </text>

        {/* Samaná label */}
        <text x="370" y="58" fill="#B45309" fillOpacity={activeRegion === "samana" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
          Samaná
        </text>

        {/* Tenares label */}
        <text x="245" y="150" fill="#78350F" fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
          Tenares
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
  const regions: { id: Region; name: string; drink: string; color: string }[] = [
    { id: "samana", name: "Samaná", drink: "Coco Concon Refrescante", color: "#B45309" },
    { id: "tenares", name: "Tenares", drink: "El Tabaquero Francés", color: "#78350F" },
  ];

  return (
    <div className="flex gap-3 md:hidden">
      {regions.map(r => (
        <button
          key={r.id}
          onClick={() => onSelectRegion(activeRegion === r.id ? null : r.id)}
          className={`flex-1 p-4 rounded-xl border-2 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber/40 ${
            activeRegion === r.id
              ? "border-amber bg-amber/5"
              : "border-border/50 bg-white/40 hover:border-amber/30"
          }`}
          aria-pressed={activeRegion === r.id}
        >
          <div className="w-2 h-2 rounded-full mb-2" style={{ backgroundColor: r.color }} />
          <p className="font-serif text-lg text-text-primary">{r.name}</p>
          <p className="text-xs text-text-muted mt-0.5">{r.drink}</p>
        </button>
      ))}
    </div>
  );
};
