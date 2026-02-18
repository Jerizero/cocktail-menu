"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techniques } from "@/data/techniques";
import { drinks } from "@/data/drinks";
import { useDrinkNavigation } from "@/hooks/useDrinkNavigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { TechniqueCategory } from "@/data/types";

/* ─── Category metadata ──────────────────────────────────────────────── */

const CATEGORY_META: Record<
  TechniqueCategory,
  { label: string; icon: React.ReactNode }
> = {
  clarification: {
    label: "Clarification",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 1.5C8 1.5 6 4 6 7c0 1.5.5 3 2 4.5C9.5 10 10 8.5 10 7c0-3-2-5.5-2-5.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 13h6M6 14.5h4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  infusion: {
    label: "Infusion",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 2v3l-2 5.5a1.5 1.5 0 0 0 1.4 2h5.2a1.5 1.5 0 0 0 1.4-2L10 5V2"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 2h6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M4.5 8.5h7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="1.5 1.5"
        />
      </svg>
    ),
  },
  preparation: {
    label: "Preparation",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="8"
          cy="10"
          r="4.5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M10.5 5.5 12 2M5.5 5.5 4 2"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M6 10h4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
};

const CATEGORY_ORDER: TechniqueCategory[] = [
  "clarification",
  "infusion",
  "preparation",
];

/* ─── Technique card ─────────────────────────────────────────────────── */

interface TechniqueCardProps {
  technique: (typeof techniques)[number];
  isOpen: boolean;
  onToggle: () => void;
  drinkNames: { id: number; name: string }[];
}

const TechniqueCard = ({
  technique,
  isOpen,
  onToggle,
  drinkNames,
}: TechniqueCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { openDrinkModal } = useDrinkNavigation();
  const meta = CATEGORY_META[technique.category];

  return (
    <div
      className={`bg-cream-dark/50 border rounded-xl transition-shadow duration-200 ${
        isOpen
          ? "border-amber-300/60 shadow-md"
          : "border-border hover:shadow-sm"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 px-5 py-4 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:ring-offset-2 rounded-xl"
        aria-expanded={isOpen}
      >
        <div className="flex-1 min-w-0">
          <span className="font-serif text-lg text-text-primary block leading-tight">
            {technique.name}
          </span>
          <span className="flex items-center gap-1.5 mt-1.5 text-text-muted">
            <span className="flex-shrink-0">{meta.icon}</span>
            <span className="text-xs uppercase tracking-wider">
              {meta.label}
            </span>
          </span>
        </div>
        <span className="flex-shrink-0 mt-1 px-2.5 py-0.5 bg-amber-50 text-amber-800 text-xs font-medium rounded-full tabular-nums">
          {technique.usedIn.length} drink{technique.usedIn.length !== 1 && "s"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
            }
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 space-y-3">
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                  Key Notes
                </p>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {technique.keyNotes}
                </p>
              </div>

              {drinkNames.length > 0 && (
                <div>
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-2">
                    Used in
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {drinkNames.map(({ id, name }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => openDrinkModal(id)}
                        className="px-3 py-1 bg-cream border border-border rounded-full text-sm text-text-primary hover:border-amber-300 hover:bg-amber-50/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Section ────────────────────────────────────────────────────────── */

export const TechniqueSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const drinkLookup = useMemo(() => {
    const map = new Map<string, { id: number; name: string }[]>();
    for (const technique of techniques) {
      const resolved = technique.usedIn
        .map((id) => {
          const drink = drinks.find((d) => d.id === id);
          return drink ? { id: drink.id, name: drink.name } : null;
        })
        .filter((d): d is { id: number; name: string } => d !== null);
      map.set(technique.id, resolved);
    }
    return map;
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<TechniqueCategory, (typeof techniques)[number][]>();
    for (const cat of CATEGORY_ORDER) {
      map.set(
        cat,
        techniques.filter((t) => t.category === cat),
      );
    }
    return map;
  }, []);

  return (
    <SectionWrapper id="techniques" variant="contained" padding="md" drift="right">
      <SectionHeading
        title="Technique Library"
        subtitle="The methods behind the menu"
      />

      <div className="space-y-10">
        {CATEGORY_ORDER.map((category) => {
          const items = grouped.get(category);
          if (!items || items.length === 0) return null;
          const meta = CATEGORY_META[category];

          return (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
                {meta.label}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((technique) => (
                  <TechniqueCard
                    key={technique.id}
                    technique={technique}
                    isOpen={openId === technique.id}
                    onToggle={() =>
                      setOpenId((prev) =>
                        prev === technique.id ? null : technique.id,
                      )
                    }
                    drinkNames={drinkLookup.get(technique.id) ?? []}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
