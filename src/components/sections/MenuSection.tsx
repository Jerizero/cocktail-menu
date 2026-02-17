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

export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("aperitivos");
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);

  const filtered = drinks.filter((d) => d.category === activeCategory);

  const openDrink = useCallback((drink: Drink) => {
    setSelectedDrink(drink);
    window.history.replaceState(null, "", `#drink-${drink.slug}`);
  }, []);

  const closeDrink = useCallback(() => {
    setSelectedDrink(null);
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

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
        title="The 12-Drink Menu"
        subtitle="Dominican food culture deconstructed into liquid form"
      />

      <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

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
          <DrinkModal drink={selectedDrink} onClose={closeDrink} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};
