"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryTabs } from "@/components/ui/CategoryTabs";
import { DrinkCard } from "@/components/ui/DrinkCard";
import { DrinkModal } from "@/components/ui/DrinkModal";
import { drinks } from "@/data/drinks";
import type { Category, Drink } from "@/data/types";
import { slugify } from "@/lib/utils";
import { useDrinkNavigation } from "@/hooks/useDrinkNavigation";

export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("aperitivos");
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const { pendingDrinkId, clearPendingDrink } = useDrinkNavigation();

  const filtered = drinks.filter((d) => d.category === activeCategory);

  const openDrink = useCallback((drink: Drink) => {
    setSelectedDrink(drink);
    window.history.replaceState(null, "", `#drink-${drink.slug}`);
  }, []);

  const closeDrink = useCallback(() => {
    setSelectedDrink(null);
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  // Handle cross-section navigation: when another section requests a drink modal
  useEffect(() => {
    if (pendingDrinkId === null) return;
    const drink = drinks.find((d) => d.id === pendingDrinkId);
    if (drink) {
      setActiveCategory(drink.category);
      // Small delay so category switch renders before modal opens
      setTimeout(() => {
        openDrink(drink);
        clearPendingDrink();
      }, 100);
    } else {
      clearPendingDrink();
    }
  }, [pendingDrinkId, clearPendingDrink, openDrink]);

  // Navigate between drinks within the same category
  const currentIndex = selectedDrink ? filtered.findIndex(d => d.id === selectedDrink.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < filtered.length - 1;

  const goToPrev = useCallback(() => {
    if (hasPrev) {
      const prev = filtered[currentIndex - 1];
      setSelectedDrink(prev);
      window.history.replaceState(null, "", `#drink-${prev.slug}`);
    }
  }, [filtered, currentIndex, hasPrev]);

  const goToNext = useCallback(() => {
    if (hasNext) {
      const next = filtered[currentIndex + 1];
      setSelectedDrink(next);
      window.history.replaceState(null, "", `#drink-${next.slug}`);
    }
  }, [filtered, currentIndex, hasNext]);

  // URL hash → open modal on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#drink-")) {
      const slug = hash.replace("#drink-", "");
      const drink = drinks.find((d) => d.slug === slug || slugify(d.name) === slug);
      if (drink) {
        setActiveCategory(drink.category);
        setSelectedDrink(drink);
      }
    }
  }, []);

  return (
    <SectionWrapper id="menu" variant="wide">
      <SectionHeading
        title={`The ${drinks.length}-Drink Menu`}
        subtitle="Dominican food culture deconstructed into liquid form"
      />

      {/* Sticky tabs — stays below fixed header on mobile so you don't have to scroll up to switch categories */}
      <div className="sticky top-[calc(3rem+env(safe-area-inset-top))] lg:static z-20 bg-cream -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 py-2 lg:py-0">
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((drink, i) => (
          <DrinkCard
            key={drink.id}
            drink={drink}
            index={i}
            onClick={() => openDrink(drink)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedDrink && (
          <DrinkModal
            drink={selectedDrink}
            onClose={closeDrink}
            onPrev={goToPrev}
            onNext={goToNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};
