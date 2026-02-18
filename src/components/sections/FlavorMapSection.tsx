"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlavorScatter } from "@/components/charts/FlavorScatter";
import { DrinkRadar } from "@/components/charts/DrinkRadar";
import { drinks } from "@/data/drinks";
import { CATEGORY_COLORS } from "@/lib/colors";
import { useDrinkNavigation } from "@/hooks/useDrinkNavigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { DimensionalScores } from "@/data/types";

const DIMENSION_LABELS: Record<keyof DimensionalScores, string> = {
  boozy: "Boozy",
  refreshing: "Refreshing",
  sweet: "Sweet",
  dry: "Dry",
  bitter: "Bitter",
  tart: "Tart",
  weight: "Weight",
  complexity: "Complexity",
};

/** Return the top 3 dimensional scores, sorted descending. */
const getTopScores = (dimensions: DimensionalScores) =>
  (Object.entries(dimensions) as [keyof DimensionalScores, number][])
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

const panelVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const mobilePanelVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const FlavorMapSection = () => {
  const [selectedDrinkId, setSelectedDrinkId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { openDrinkModal } = useDrinkNavigation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const selectedDrink = selectedDrinkId
    ? drinks.find((d) => d.id === selectedDrinkId) ?? null
    : null;

  const handleSelectDrink = (drinkId: number) => {
    setSelectedDrinkId((prev) => (prev === drinkId ? null : drinkId));
  };

  const detailContent = selectedDrink ? (
    <>
      {/* Drink name + subtitle */}
      <h3 className="font-serif text-2xl text-amber-900 tracking-tight leading-tight">
        {selectedDrink.name}
      </h3>
      <p className="text-sm text-amber-700/70 mt-1 leading-relaxed">
        {selectedDrink.subtitle}
      </p>

      {/* Radar chart */}
      <div className="mt-6 flex justify-center">
        <DrinkRadar
          dimensions={selectedDrink.dimensions}
          color={CATEGORY_COLORS[selectedDrink.category]}
          animate={!shouldReduceMotion}
        />
      </div>

      {/* Top dimensional scores */}
      <div className="mt-5 flex flex-wrap gap-2">
        {getTopScores(selectedDrink.dimensions).map(([key, value]) => (
          <span
            key={key}
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/60 px-3 py-1 text-xs font-medium text-amber-800 tabular-nums"
          >
            {DIMENSION_LABELS[key]}
            <span className="font-semibold">{value}/10</span>
          </span>
        ))}
      </div>

      {/* View full recipe button */}
      <button
        type="button"
        onClick={() => openDrinkModal(selectedDrink.id)}
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-amber-800 hover:text-amber-950 transition-colors duration-150"
        style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        View full recipe
        <span aria-hidden="true" className="ml-0.5">&rarr;</span>
      </button>
    </>
  ) : (
    <div className="flex items-center justify-center h-full min-h-[200px]">
      <p className="text-sm text-amber-700/50 italic text-center">
        Click a dot to explore its flavor profile
      </p>
    </div>
  );

  return (
    <SectionWrapper id="flavor-map" padding="md" entrance="scale-up" drift="right">
      <SectionHeading
        title="Flavor Map"
        subtitle="Where each drink lives on the sweet-dry and light-heavy spectrum"
      />

      <p className="text-text-secondary max-w-2xl mb-10 leading-relaxed">
        The horizontal axis maps each drink from sweet to dry. The
        vertical axis maps from light and refreshing to heavy and rich. Drinks
        that cluster together share a sensory neighborhood; outliers fill
        deliberate gaps in the menu.
      </p>

      {/* Desktop: 60/40 grid */}
      {!isMobile && (
        <div className="grid grid-cols-[3fr_2fr] gap-8 items-start">
          <div className="flex justify-center">
            <FlavorScatter
              onSelectDrink={handleSelectDrink}
              selectedId={selectedDrinkId}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDrinkId ?? "empty"}
              variants={shouldReduceMotion ? undefined : panelVariants}
              initial={shouldReduceMotion ? {} : "initial"}
              animate={shouldReduceMotion ? {} : "animate"}
              exit={shouldReduceMotion ? {} : "exit"}
              transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
              className="rounded-2xl border border-amber-200/40 bg-amber-50/30 p-6"
            >
              {detailContent}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Mobile: stacked layout */}
      {isMobile && (
        <div className="space-y-6">
          <div className="flex justify-center">
            <FlavorScatter
              onSelectDrink={handleSelectDrink}
              selectedId={selectedDrinkId}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDrinkId ?? "empty"}
              variants={shouldReduceMotion ? undefined : mobilePanelVariants}
              initial={shouldReduceMotion ? {} : "initial"}
              animate={shouldReduceMotion ? {} : "animate"}
              exit={shouldReduceMotion ? {} : "exit"}
              transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
              className="rounded-2xl border border-amber-200/40 bg-amber-50/30 p-5"
            >
              {detailContent}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </SectionWrapper>
  );
};
