"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Drink } from "@/data/types";
import { StatusBadge } from "./StatusBadge";
import { DrinkIllustration } from "./DrinkIllustration";
import { SPIRIT_COLORS, CATEGORY_COLORS } from "@/lib/colors";

interface Props {
  drink: Drink;
  index: number;
  onClick: () => void;
}

const DIMENSION_LABELS: Record<string, string> = {
  boozy: "boozy",
  refreshing: "refreshing",
  sweet: "sweet",
  dry: "dry",
  bitter: "bitter",
  tart: "tart",
  weight: "weight",
  complexity: "complex",
};

export const DrinkCard = ({ drink, index, onClick }: Props) => {
  const spiritColor = SPIRIT_COLORS[drink.spirits[0]] || CATEGORY_COLORS[drink.category];

  // Top 2 dimensions by score
  const topDimensions = useMemo(() => {
    return (Object.entries(drink.dimensions) as [string, number][])
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2);
  }, [drink.dimensions]);

  // Spirit names for display
  const spiritNames = drink.spirits
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" + ");

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group text-left w-full bg-white/60 border border-border/50 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-amber/5 hover:border-amber/30 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:ring-offset-2 focus:ring-offset-cream"
      aria-label={`${drink.name} — ${drink.subtitle}. ${drink.visual.garnish}`}
    >
      {/* Illustration area with drink-color wash */}
      <div
        className="relative flex items-center justify-center py-6 transition-colors duration-300"
        style={{ backgroundColor: `${drink.visual.liquidColor}05` }}
      >
        <div className="group-hover:scale-105 transition-transform duration-500 ease-out">
          <DrinkIllustration visual={drink.visual} size="card" />
        </div>
      </div>

      {/* Info area */}
      <div className="p-4 pt-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-medium tabular-nums" style={{ color: spiritColor }}>
            #{drink.id}
          </span>
          <StatusBadge status={drink.status} />
          {drink.region && (
            <span className="flex items-center gap-1 text-xs text-text-muted ml-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-amber" />
              {drink.region === "samana" ? "Samaná" : "Tenares"}
            </span>
          )}
        </div>

        <h3 className="font-serif text-lg text-text-primary mb-0.5 group-hover:text-amber transition-colors duration-200">
          {drink.name}
        </h3>
        <p className="text-sm text-text-muted mb-1.5">{drink.subtitle}</p>

        {/* Ingredients */}
        <div className="mb-3 space-y-0.5">
          <p className="text-xs text-text-primary font-medium truncate">{drink.base.split('(')[0].trim()}</p>
          {drink.modifiers.slice(0, 3).map((mod) => (
            <p key={mod} className="text-[11px] text-text-muted truncate">{mod.split('(')[0].trim()}</p>
          ))}
          {drink.modifiers.length > 3 && (
            <p className="text-[10px] text-text-muted">+{drink.modifiers.length - 3} more</p>
          )}
        </div>

        {/* Top 2 dimension bars */}
        <div className="space-y-1.5">
          {topDimensions.map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-cream-dark overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${value * 10}%`,
                    backgroundColor: spiritColor,
                    opacity: 0.5 + (value / 10) * 0.5,
                  }}
                />
              </div>
              <span className="text-[10px] text-text-muted w-[62px] text-right tabular-nums">
                {value} {DIMENSION_LABELS[key]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.button>
  );
};
