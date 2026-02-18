"use client";

import { motion } from "framer-motion";
import type { Category } from "@/data/types";
import { CATEGORY_COLORS } from "@/lib/colors";

interface Props {
  active: Category;
  onChange: (cat: Category) => void;
}

const TABS: { id: Category; label: string }[] = [
  { id: "aperitivos", label: "Aperitivos" },
  { id: "caracter", label: "Carácter" },
  { id: "fuertes", label: "Fuertes" },
  { id: "refrescantes", label: "Refrescantes" },
];

export const CategoryTabs = ({ active, onChange }: Props) => (
  <div
    className="flex gap-1 p-1 bg-cream-dark rounded-lg w-full md:w-fit mb-8 overflow-x-auto"
    style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
  >
    {TABS.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`relative shrink-0 px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
          active === tab.id ? "text-white" : "text-text-secondary hover:text-text-primary"
        }`}
      >
        {active === tab.id && (
          <motion.div
            layoutId="categoryTab"
            className="absolute inset-0 rounded-md"
            style={{ backgroundColor: CATEGORY_COLORS[tab.id] }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">{tab.label}</span>
      </button>
    ))}
  </div>
);
