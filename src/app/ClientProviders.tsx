"use client";

import { type ReactNode } from "react";
import { DrinkNavigationProvider } from "@/hooks/useDrinkNavigation";

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  return <DrinkNavigationProvider>{children}</DrinkNavigationProvider>;
};
