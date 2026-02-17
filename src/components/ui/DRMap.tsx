"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import type { Region } from "@/data/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  activeRegion: Region | null;
  onSelectRegion: (region: Region | null) => void;
}

// ─── Geographically accurate SVG paths ───────────────────────────────
// Coordinate system: viewBox "0 0 500 280"
// Mapped from real Hispaniola coordinates:
//   lon 74.5W → x≈30,  lon 68.3W → x≈470
//   lat 20.0N → y≈30,  lat 17.6N → y≈250
// Scale: ~71 px/°lon, ~92 px/°lat

// Dominican Republic outline — eastern 2/3 of Hispaniola
// Traced from: north coast (Puerto Plata → Samaná → east), south coast (Pedernales → Santo Domingo → east tip), Haiti border
const DR_OUTLINE =
  "M152,108 " + // Haiti-DR border start (north: Dajabón ~71.7W, 19.7N)
  "L160,95 L175,80 L195,68 " + // North coast: Monte Cristi, Puerto Plata approach
  "L220,55 L248,48 " + // North coast: Puerto Plata to Sosúa
  "L275,42 L300,38 " + // Cabarete, Nagua coast
  "L320,36 L338,38 " + // Approaching Samaná peninsula
  // Samaná peninsula — juts northeast
  "L355,32 L375,28 L392,30 L405,36 " + // Peninsula tip (Cabo Samaná ~69.0W, 19.3N)
  "L400,44 L388,50 " + // South side of peninsula
  "L370,54 L355,58 L340,56 " + // Samaná Bay north shore
  // Continue south side — Samaná Bay opening
  "L330,62 L340,72 " + // Bay curves south
  "L355,78 L370,88 " + // East coast: Miches, Sabana de la Mar approach
  // Eastern coast — south of Samaná
  "L385,98 L400,112 " + // Hato Mayor, El Seibo coast
  "L420,120 L440,132 " + // Higüey, approaching Punta Cana
  "L458,145 L465,158 " + // Punta Cana area (~68.4W, 18.5N)
  "L462,172 L455,185 " + // East tip curves south — Cap Cana, Bávaro
  // South coast — east to west
  "L440,195 L420,202 " + // La Romana coast
  "L395,208 L375,212 " + // San Pedro de Macorís
  "L350,218 L325,220 " + // Boca Chica approach
  "L305,218 " + // Santo Domingo (~69.9W, 18.47N) — x≈327, y≈141 but south coast
  "L280,222 L258,225 " + // Baní, Azua
  "L235,228 L215,232 " + // Azua to Barahona approach
  "L195,238 L178,242 " + // Barahona
  "L162,240 L150,232 " + // Pedernales approach
  "L140,220 L135,205 " + // Pedernales (~71.75W, 18.03N)
  // Haiti-DR border — south to north (irregular line)
  "L138,190 L142,175 " + // Border going north
  "L148,160 L150,145 " + // Mid-border (Jimani area)
  "L152,130 L150,118 " + // Approaching Dajabón
  "L152,108 Z"; // Close at start

// Haiti — western 1/3 of Hispaniola (low-contrast context shape)
const HAITI =
  "M152,108 " + // Border start (shared with DR)
  "L150,118 L152,130 " + // Border south
  "L150,145 L148,160 " + // Mid-border
  "L142,175 L138,190 " + // Border south
  "L135,205 L140,220 " + // Border near Pedernales
  // Haiti south coast — west from border
  "L128,228 L112,235 " + // Anse-à-Pitre to Jacmel approach
  "L92,240 L75,238 " + // Southern peninsula base
  "L58,232 L42,225 " + // Tiburon peninsula
  "L30,218 L22,208 " + // Tip of Tiburon (~74.5W)
  "L28,195 L38,185 " + // North side of southern peninsula
  "L55,178 L68,172 " + // Approaching Port-au-Prince
  "L78,162 L82,150 " + // Gonâve channel
  "L75,138 L65,128 " + // Gulf of Gonâve
  // Haiti north coast
  "L58,118 L52,108 " + // Saint-Marc area
  "L48,95 L52,82 " + // Gonaïves
  "L60,70 L72,60 " + // Northern coast
  "L88,52 L105,48 " + // Cap-Haïtien approach
  "L120,50 L135,55 " + // Cap-Haïtien to Ouanaminthe
  "L148,65 L155,78 " + // Approaching border
  "L158,90 L152,108 Z"; // Close at border

// Samaná peninsula — the distinct NE jut with the bay beneath
// This is the clickable region, slightly expanded from the coastline for interaction
const SAMANA_PATH =
  "M330,36 " + // West base of peninsula on north coast
  "L338,34 L355,30 L375,26 L392,28 L408,35 " + // North shore of peninsula to tip
  "L402,44 L390,50 " + // Around the tip, south side
  "L372,55 L355,58 L340,56 " + // South shore of peninsula
  "L332,52 L328,44 " + // Bay entrance, back to base
  "L330,36 Z";

// Tenares region — Cibao valley, north-central interior
// Between Santiago (~70.7W,19.45N) and San Francisco de Macorís (~70.25W,19.3N)
// Tenares is at ~70.35W, 19.38N — x≈295, y≈57
const TENARES_PATH =
  "M272,52 " +
  "L285,46 L302,44 L318,48 " + // Northern edge
  "L322,58 L318,68 L308,75 " + // Eastern edge
  "L292,78 L278,74 L268,66 " + // Southern edge
  "L268,56 L272,52 Z"; // Western edge back to start

// Santo Domingo position (~69.9W, 18.47N)
// svgX = (74.5 - 69.9) / 6.2 * 440 + 30 ≈ 357
// svgY = (20.0 - 18.47) / 2.4 * 220 + 30 ≈ 170
const SANTO_DOMINGO = { x: 318, y: 218 };

// Cordillera Central — mountain range running through center of island
// From near Haiti border (~71.5W, 19.0N) east to (~69.5W, 18.8N)
const CORDILLERA_PATH =
  "M155,142 " +
  "C175,135 195,130 215,128 " +
  "C235,126 255,130 275,132 " +
  "C295,134 315,138 335,142 " +
  "C350,145 365,148 380,155";

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
        transition={{ delay: animate ? 1.0 : 0, duration: 0.8, ease: "easeInOut" }}
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
        style={{ transformOrigin: "370px 42px" }}
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
        style={{ transformOrigin: "295px 60px" }}
      />

      {/* Labels */}
      <motion.g
        initial={animate ? { opacity: 0 } : {}}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: animate ? 1.8 : 0, duration: 0.4 }}
      >
        {/* DR label */}
        <text x="300" y="185" fill="#78350F" fillOpacity={0.5} fontSize="11" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="middle" letterSpacing="2">
          DOMINICAN REPUBLIC
        </text>

        {/* Samaná label */}
        <text x="380" y="20" fill="#B45309" fillOpacity={activeRegion === "samana" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
          Samaná
        </text>

        {/* Tenares label */}
        <text x="295" y="92" fill="#78350F" fillOpacity={activeRegion === "tenares" ? 0.9 : 0.6} fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" textAnchor="middle">
          Tenares
        </text>

        {/* Santo Domingo marker */}
        <circle cx={SANTO_DOMINGO.x} cy={SANTO_DOMINGO.y} r={3} fill="#78350F" fillOpacity={0.4} />
        <circle cx={SANTO_DOMINGO.x} cy={SANTO_DOMINGO.y} r={1.5} fill="#78350F" fillOpacity={0.7} />
        <text x={SANTO_DOMINGO.x + 8} y={SANTO_DOMINGO.y + 4} fill="#78350F" fillOpacity={0.45} fontSize="7.5" fontFamily="var(--font-sans)" fontWeight="500">
          Santo Domingo
        </text>

        {/* Cordillera Central label — tiny, near the dashed line */}
        <text x="265" y="122" fill="#A89F91" fillOpacity={0.35} fontSize="6" fontFamily="var(--font-sans)" fontWeight="400" fontStyle="italic" textAnchor="middle">
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
