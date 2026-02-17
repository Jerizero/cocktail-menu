"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { drinks } from "@/data/drinks";
import type { Drink } from "@/data/types";

interface DrinkNavigationContextValue {
  /** The drink currently requested to be opened from outside MenuSection */
  pendingDrinkId: number | null;
  /** Call from any section to scroll to menu and open a drink modal */
  openDrinkModal: (drinkId: number) => void;
  /** Called by MenuSection after consuming the pending drink */
  clearPendingDrink: () => void;
}

const DrinkNavigationContext = createContext<DrinkNavigationContextValue | null>(null);

export const DrinkNavigationProvider = ({ children }: { children: ReactNode }) => {
  const [pendingDrinkId, setPendingDrinkId] = useState<number | null>(null);

  const openDrinkModal = useCallback((drinkId: number) => {
    const drink = drinks.find((d) => d.id === drinkId);
    if (!drink) return;

    setPendingDrinkId(drinkId);

    // Scroll to menu section
    const menuEl = document.getElementById("menu");
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const clearPendingDrink = useCallback(() => {
    setPendingDrinkId(null);
  }, []);

  return (
    <DrinkNavigationContext.Provider value={{ pendingDrinkId, openDrinkModal, clearPendingDrink }}>
      {children}
    </DrinkNavigationContext.Provider>
  );
};

export const useDrinkNavigation = (): DrinkNavigationContextValue => {
  const ctx = useContext(DrinkNavigationContext);
  if (!ctx) {
    throw new Error("useDrinkNavigation must be used within DrinkNavigationProvider");
  }
  return ctx;
};
