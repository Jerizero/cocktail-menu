"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Drink } from "@/data/types";
import { DrinkRadar } from "@/components/charts/DrinkRadar";
import { DrinkIllustration } from "./DrinkIllustration";
import { StatusBadge } from "./StatusBadge";
import { SPIRIT_COLORS, CATEGORY_COLORS } from "@/lib/colors";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  drink: Drink;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export const DrinkModal = ({ drink, onClose, onPrev, onNext, hasPrev, hasNext }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(0);
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
  }, [drink.id]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev && onPrev) {
        setDirection(-1);
        onPrev();
      }
      if (e.key === "ArrowRight" && hasNext && onNext) {
        setDirection(1);
        onNext();
      }
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handlePrev = () => {
    if (hasPrev && onPrev) {
      setDirection(-1);
      onPrev();
    }
  };

  const handleNext = () => {
    if (hasNext && onNext) {
      setDirection(1);
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-text-primary/60 backdrop-blur-md" />

      {/* Navigation arrows */}
      {hasPrev && onPrev && (
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-cream/80 backdrop-blur-sm border border-border/50 text-text-secondary hover:text-text-primary hover:bg-cream transition-all duration-200 shadow-lg"
          aria-label="Previous drink"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 4l-6 6 6 6" />
          </svg>
        </button>
      )}
      {hasNext && onNext && (
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-cream/80 backdrop-blur-sm border border-border/50 text-text-secondary hover:text-text-primary hover:bg-cream transition-all duration-200 shadow-lg"
          aria-label="Next drink"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 4l6 6-6 6" />
          </svg>
        </button>
      )}

      {/* Modal — editorial slideshow card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={drink.id}
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={drink.name}
          custom={direction}
          variants={shouldReduceMotion ? undefined : SLIDE_VARIANTS}
          initial={shouldReduceMotion ? {} : "enter"}
          animate="center"
          exit={shouldReduceMotion ? {} : "exit"}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 bg-cream border border-border/30 rounded-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-text-muted hover:text-text-primary transition-colors duration-200 rounded-full hover:bg-cream-dark focus:outline-none focus:ring-2 focus:ring-amber/40"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4l12 12M4 16L16 4" />
            </svg>
          </button>

          {/* Hero area — large illustration + identity */}
          <div
            className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10 p-8 md:p-12 pb-6"
            style={{ background: `linear-gradient(135deg, ${drink.visual.liquidColor}08 0%, ${drink.visual.liquidColor}04 100%)` }}
          >
            {/* Decorative ring behind illustration */}
            <div className="relative shrink-0">
              <div
                className="absolute inset-0 -m-4 rounded-full opacity-10"
                style={{ border: `2px solid ${drink.visual.liquidColor}` }}
              />
              <DrinkIllustration visual={drink.visual} size="modal" />
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <span className="text-sm font-medium tabular-nums" style={{ color: spiritColor }}>
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
              <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-2 leading-tight">
                {drink.name}
              </h2>
              <p className="text-text-muted text-lg">{drink.subtitle}</p>

              {/* Service style + glass */}
              <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-sm text-text-secondary">
                <span className="capitalize">{drink.serviceStyle.replace(/-/g, ' ')}</span>
                <span className="w-1 h-1 rounded-full bg-text-muted" />
                <span className="capitalize">{drink.visual.glassType.replace(/-/g, ' ')} glass</span>
                {drink.visual.garnish && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-text-muted" />
                    <span className="text-text-muted text-xs">{drink.visual.garnish}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content — two-column editorial layout */}
          <div className="p-8 md:p-12 pt-6 space-y-8">
            <div className="grid md:grid-cols-[1fr_auto] gap-10">
              {/* Left: recipe breakdown */}
              <div className="space-y-6">
                {/* Base */}
                <div>
                  <h4 className="text-xs font-semibold text-text-muted uppercase tracking-[0.15em] mb-2">
                    Base
                  </h4>
                  <p className="text-text-primary font-medium">{drink.base}</p>
                </div>

                {/* Modifiers */}
                <div>
                  <h4 className="text-xs font-semibold text-text-muted uppercase tracking-[0.15em] mb-2">
                    Modifiers
                  </h4>
                  <ul className="space-y-1">
                    {drink.modifiers.map((m) => (
                      <li key={m} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-amber/50 mt-2 shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technique */}
                <div>
                  <h4 className="text-xs font-semibold text-text-muted uppercase tracking-[0.15em] mb-2">
                    Technique
                  </h4>
                  <p className="text-sm text-text-primary leading-relaxed">{drink.technique}</p>
                </div>

                {drink.batchSpecs && (
                  <div className="bg-cream-dark/60 rounded-lg p-4">
                    <h4 className="text-xs font-semibold text-text-muted uppercase tracking-[0.15em] mb-2">
                      Batch Specs
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-mono">
                      {drink.batchSpecs}
                    </p>
                  </div>
                )}
              </div>

              {/* Right: radar chart */}
              <div className="flex flex-col items-center justify-start">
                <DrinkRadar
                  dimensions={drink.dimensions}
                  color={spiritColor}
                  animate={true}
                />
              </div>
            </div>

            {/* Notes */}
            {drink.notes.length > 0 && (
              <div className="border-t border-border/50 pt-6">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-[0.15em] mb-3">
                  Notes
                </h4>
                <ul className="space-y-2">
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

            {/* Status cards */}
            <div className="flex flex-col sm:flex-row gap-4">
              {drink.testedNotes && (
                <div className="flex-1 bg-green-50 border border-green-200/50 rounded-xl p-5">
                  <h4 className="text-xs font-semibold text-green-800 uppercase tracking-[0.15em] mb-2">
                    Tasting Notes
                  </h4>
                  <p className="text-sm text-green-700 leading-relaxed">{drink.testedNotes}</p>
                </div>
              )}

              {drink.openQuestions && (
                <div className="flex-1 bg-amber/5 border border-amber/20 rounded-xl p-5">
                  <h4 className="text-xs font-semibold text-amber uppercase tracking-[0.15em] mb-2">
                    Open Questions
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {drink.openQuestions}
                  </p>
                </div>
              )}
            </div>

            {drink.regionNote && (
              <div className="bg-cream-dark rounded-xl p-5 border border-border/30">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-[0.15em] mb-2">
                  Regional Connection
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">{drink.regionNote}</p>
              </div>
            )}

            {/* Navigation hint */}
            {(hasPrev || hasNext) && (
              <p className="text-center text-text-muted text-xs pt-2">
                Use <kbd className="px-1.5 py-0.5 bg-cream-dark rounded text-[10px] font-mono">←</kbd> <kbd className="px-1.5 py-0.5 bg-cream-dark rounded text-[10px] font-mono">→</kbd> to browse drinks
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
