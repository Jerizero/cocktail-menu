"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import type { Drink } from "@/data/types";
import { DrinkRadar } from "@/components/charts/DrinkRadar";
import { StatusBadge } from "./StatusBadge";
import { SPIRIT_COLORS, CATEGORY_COLORS } from "@/lib/colors";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  drink: Drink;
  onClose: () => void;
}

export const DrinkModal = ({ drink, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  useScrollLock(true);

  const spiritColor =
    SPIRIT_COLORS[drink.spirits[0]] || CATEGORY_COLORS[drink.category];

  // Focus trap
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusables = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    first?.focus();
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  // Escape to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-text-primary/40 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={drink.name}
        initial={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 bg-cream border border-border/50 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-amber/40"
          aria-label="Close"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4l12 12M4 16L16 4" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-sm font-medium tabular-nums"
                style={{ color: spiritColor }}
              >
                #{drink.id}
              </span>
              <StatusBadge status={drink.status} />
              {drink.region && (
                <span className="inline-flex items-center gap-1.5 text-xs text-amber font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                  {drink.region === "samana" ? "Samaná" : "Tenares"} Homage
                </span>
              )}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-text-primary mb-1">
              {drink.name}
            </h2>
            <p className="text-text-muted">{drink.subtitle}</p>
          </div>

          {/* Content grid */}
          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            {/* Specs */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
                  Base
                </h4>
                <p className="text-sm text-text-primary">{drink.base}</p>
              </div>

              <div>
                <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
                  Modifiers
                </h4>
                <ul className="space-y-0.5">
                  {drink.modifiers.map((m) => (
                    <li key={m} className="text-sm text-text-secondary">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
                  Technique
                </h4>
                <p className="text-sm text-text-primary">{drink.technique}</p>
              </div>

              {drink.batchSpecs && (
                <div>
                  <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
                    Batch Specs
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {drink.batchSpecs}
                  </p>
                </div>
              )}
            </div>

            {/* Radar chart */}
            <div className="flex flex-col items-center">
              <DrinkRadar
                dimensions={drink.dimensions}
                color={spiritColor}
                animate={true}
              />
            </div>
          </div>

          {/* Notes */}
          {drink.notes.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
                Notes
              </h4>
              <ul className="space-y-1.5">
                {drink.notes.map((note, i) => (
                  <li
                    key={i}
                    className="text-sm text-text-secondary pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-border"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Status-specific info */}
          {drink.testedNotes && (
            <div className="bg-green-50 border border-green-200/50 rounded-lg p-4 mb-4">
              <h4 className="text-xs font-medium text-green-800 uppercase tracking-wider mb-1">
                Tasting Notes
              </h4>
              <p className="text-sm text-green-700">{drink.testedNotes}</p>
            </div>
          )}

          {drink.openQuestions && (
            <div className="bg-amber/5 border border-amber/20 rounded-lg p-4">
              <h4 className="text-xs font-medium text-amber uppercase tracking-wider mb-1">
                Open Questions
              </h4>
              <p className="text-sm text-text-secondary">
                {drink.openQuestions}
              </p>
            </div>
          )}

          {drink.regionNote && (
            <div className="mt-4 bg-cream-dark rounded-lg p-4">
              <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
                Regional Connection
              </h4>
              <p className="text-sm text-text-secondary">{drink.regionNote}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
