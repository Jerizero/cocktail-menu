"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "philosophy", label: "Philosophy" },
  { id: "menu", label: "The Menu" },
  { id: "dimensions", label: "Analysis" },
  { id: "flavor-map", label: "Flavor Map" },
  { id: "spirits", label: "Spirits" },
  { id: "roots", label: "Our Roots" },
  { id: "techniques", label: "Techniques" },
  { id: "rnd", label: "R&D Lab" },
  { id: "side-projects", label: "Side Projects" },
];

export const SiteHeader = () => {
  const activeSection = useScrollSpy(NAV_ITEMS.map((item) => item.id));
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-border/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center h-14 gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3 py-2 text-sm transition-colors duration-200 rounded-md ${
                  activeSection === item.id
                    ? "text-amber font-medium"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile nav trigger */}
          <div className="flex lg:hidden items-center justify-between h-12">
            <span className="font-serif text-lg text-text-primary">Menu</span>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-text-secondary"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-cream/95 backdrop-blur-md lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-xl transition-colors ${
                    activeSection === item.id
                      ? "text-amber font-serif font-semibold"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
