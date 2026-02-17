"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpiritBars } from "@/components/charts/SpiritBars";
import { drinks } from "@/data/drinks";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Spirit } from "@/data/types";

export const SpiritSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const [highlightedSpirit, setHighlightedSpirit] = useState<Spirit | null>(
    null,
  );

  const drinksBySpirit = useMemo(() => {
    const grouped = new Map<Spirit, string[]>();
    for (const drink of drinks) {
      for (const spirit of drink.spirits) {
        const existing = grouped.get(spirit) ?? [];
        existing.push(drink.name);
        grouped.set(spirit, existing);
      }
    }
    return grouped;
  }, []);

  return (
    <SectionWrapper id="spirits">
      <SectionHeading
        title="Spirit Distribution"
        subtitle="The base spirits that anchor each drink"
      />

      <div className="max-w-2xl mx-auto mb-12">
        <SpiritBars onHighlight={setHighlightedSpirit} />
      </div>

      <AnimatePresence mode="wait">
        {highlightedSpirit && drinksBySpirit.has(highlightedSpirit) && (
          <motion.div
            key={highlightedSpirit}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-text-muted text-sm uppercase tracking-wider mb-3">
              Drinks using{" "}
              <span className="text-amber font-semibold capitalize">
                {highlightedSpirit}
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              {drinksBySpirit.get(highlightedSpirit)!.map((name) => (
                <span
                  key={name}
                  className="px-3 py-1.5 bg-cream-dark border border-border rounded-full text-sm text-text-primary"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!highlightedSpirit && (
        <p className="max-w-2xl mx-auto text-text-muted text-sm text-center">
          Hover or tap a spirit bar above to see which drinks use it.
        </p>
      )}
    </SectionWrapper>
  );
};
