"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpiritBars } from "@/components/charts/SpiritBars";
import { DrinkIllustration } from "@/components/ui/DrinkIllustration";
import { drinks } from "@/data/drinks";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDrinkNavigation } from "@/hooks/useDrinkNavigation";
import type { Spirit, Drink } from "@/data/types";

export const SpiritSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const { openDrinkModal } = useDrinkNavigation();
  const [highlightedSpirit, setHighlightedSpirit] = useState<Spirit | null>(
    null,
  );

  const drinksBySpirit = useMemo(() => {
    const grouped = new Map<Spirit, Drink[]>();
    for (const drink of drinks) {
      for (const spirit of drink.spirits) {
        const existing = grouped.get(spirit) ?? [];
        existing.push(drink);
        grouped.set(spirit, existing);
      }
    }
    return grouped;
  }, []);

  const connectedDrinks = highlightedSpirit
    ? drinksBySpirit.get(highlightedSpirit) ?? []
    : [];

  return (
    <SectionWrapper id="spirits" variant="contained" padding="md" drift="left">
      <SectionHeading
        title="Spirit Distribution"
        subtitle="The base spirits that anchor each drink"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Donut chart */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <SpiritBars onHighlight={setHighlightedSpirit} highlightSpirit={highlightedSpirit ?? undefined} />
          </div>
        </div>

        {/* Right: Narrative sidebar + connected drinks */}
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-amber-900 font-semibold leading-snug">
              Rum Anchors the Menu
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Dominican heritage runs through every pour. Rum appears in more
              drinks than any other spirit, grounding the menu in Caribbean
              warmth before branching into cognac, gin, and beyond.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {highlightedSpirit && connectedDrinks.length > 0 && (
              <motion.div
                key={highlightedSpirit}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-text-muted text-sm uppercase tracking-wider mb-3">
                  Drinks using{" "}
                  <span className="text-amber font-semibold capitalize">
                    {highlightedSpirit}
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {connectedDrinks.map((drink) => (
                    <button
                      key={drink.id}
                      type="button"
                      onClick={() => openDrinkModal(drink.id)}
                      className="group flex flex-col items-center gap-1.5 w-[72px] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-lg p-1"
                      aria-label={`View ${drink.name}`}
                    >
                      <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-cream-dark/60 border border-border/50 group-hover:border-amber-400/50 transition-colors duration-200">
                        <DrinkIllustration
                          visual={drink.visual}
                          size="card"
                          className="w-10 h-10"
                        />
                      </div>
                      <span className="text-[10px] text-text-primary font-medium leading-tight text-center line-clamp-2">
                        {drink.name}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!highlightedSpirit && (
            <p className="text-text-muted text-sm">
              Click a spirit arc to see which drinks use it.
            </p>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};
