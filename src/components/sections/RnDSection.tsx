"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { drinks } from "@/data/drinks";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDrinkNavigation } from "@/hooks/useDrinkNavigation";
import type { RnDStatus } from "@/data/types";

const STATUS_CONFIG: Record<
  RnDStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  tested: {
    label: "Tested",
    bg: "bg-green-100",
    text: "text-green-800",
    dot: "bg-green-500",
  },
  "partially-tested": {
    label: "Partially Tested",
    bg: "bg-amber-100",
    text: "text-amber-800",
    dot: "bg-amber-500",
  },
  specced: {
    label: "Specced",
    bg: "bg-blue-100",
    text: "text-blue-800",
    dot: "bg-blue-500",
  },
  concept: {
    label: "Concept",
    bg: "bg-stone-100",
    text: "text-stone-600",
    dot: "bg-stone-400",
  },
};

const STATUS_ORDER: RnDStatus[] = [
  "tested",
  "partially-tested",
  "specced",
  "concept",
];

const StatusBadge = ({ status }: { status: RnDStatus }) => {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

export const RnDSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const { openDrinkModal } = useDrinkNavigation();

  const groupedDrinks = useMemo(() => {
    const groups = new Map<RnDStatus, typeof drinks>();
    for (const status of STATUS_ORDER) {
      const filtered = drinks.filter((d) => d.status === status);
      if (filtered.length > 0) {
        groups.set(status, filtered);
      }
    }
    return groups;
  }, []);

  return (
    <SectionWrapper id="rnd" drift="left">
      {/* Lab grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lab-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#78350F" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lab-grid)" />
        </svg>
      </div>

      <SectionHeading
        title="R&D Lab"
        subtitle="Where each drink stands in development"
      />

      {/* Status Tracker */}
      <div className="mb-16">
        <h3 className="font-serif text-xl text-text-primary mb-6">
          Menu Status
        </h3>

        <div className="space-y-8">
          {STATUS_ORDER.map((status) => {
            const group = groupedDrinks.get(status);
            if (!group) return null;
            return (
              <div key={status}>
                <div className="flex items-center gap-3 mb-3">
                  <StatusBadge status={status} />
                  <span className="text-text-muted text-sm">
                    ({group.length})
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.map((drink) => (
                    <motion.div
                      key={drink.id}
                      initial={shouldReduceMotion ? {} : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      className="bg-cream-dark border border-border rounded-lg px-4 py-3"
                    >
                      <button
                        type="button"
                        onClick={() => openDrinkModal(drink.id)}
                        className="font-serif text-text-primary text-sm hover:text-amber transition-colors text-left cursor-pointer"
                      >
                        {drink.name} →
                      </button>
                      <p className="text-text-muted text-xs mt-0.5">
                        {drink.subtitle}
                      </p>
                      {drink.testedNotes && (
                        <p className="text-text-secondary text-xs mt-2 leading-relaxed">
                          {drink.testedNotes}
                        </p>
                      )}
                      {drink.openQuestions && (
                        <p className="text-amber/80 text-xs mt-1">
                          Open: {drink.openQuestions}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};
