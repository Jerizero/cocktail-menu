"use client";

import { motion } from "framer-motion";
import type { Drink } from "@/data/types";
import { StatusBadge } from "./StatusBadge";
import { SPIRIT_COLORS, CATEGORY_COLORS } from "@/lib/colors";

interface Props {
  drink: Drink;
  index: number;
  onClick: () => void;
}

export const DrinkCard = ({ drink, index, onClick }: Props) => {
  const spiritColor = SPIRIT_COLORS[drink.spirits[0]] || CATEGORY_COLORS[drink.category];

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
      className="group text-left w-full bg-white/60 border border-border/50 rounded-lg p-5 transition-all duration-200 hover:shadow-lg hover:shadow-amber/5 hover:border-amber/30 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:ring-offset-2 focus:ring-offset-cream"
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className="text-xs font-medium tabular-nums"
          style={{ color: spiritColor }}
        >
          #{drink.id}
        </span>
        <StatusBadge status={drink.status} />
      </div>

      <h3 className="font-serif text-lg text-text-primary mb-1 group-hover:text-amber transition-colors">
        {drink.name}
      </h3>
      <p className="text-sm text-text-muted mb-3">{drink.subtitle}</p>

      <p className="text-sm text-text-secondary line-clamp-2 mb-4">
        {drink.base}
      </p>

      {/* Dimensional mini-bars */}
      <div className="flex gap-1">
        {(
          Object.entries(drink.dimensions) as [string, number][]
        ).map(([key, value]) => (
          <div
            key={key}
            className="flex-1 h-1.5 rounded-full bg-cream-dark overflow-hidden"
            title={`${key}: ${value}/10`}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${value * 10}%`,
                backgroundColor: spiritColor,
                opacity: 0.4 + (value / 10) * 0.6,
              }}
            />
          </div>
        ))}
      </div>

      {drink.region && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-amber" />
          {drink.region === "samana" ? "Samaná" : "Tenares"} Homage
        </div>
      )}
    </motion.button>
  );
};
