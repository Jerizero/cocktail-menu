"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { drinks } from "@/data/drinks";
import { decisions } from "@/data/decisions";
import { useReducedMotion } from "@/hooks/useReducedMotion";
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

  const sortedDecisions = useMemo(() => {
    return [...decisions].sort((a, b) => {
      if (a.date === b.date) return 0;
      if (a.date === "Pre-2026") return 1;
      if (b.date === "Pre-2026") return -1;
      return b.date.localeCompare(a.date);
    });
  }, []);

  return (
    <SectionWrapper id="rnd">
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
                      <p className="font-serif text-text-primary text-sm">
                        {drink.name}
                      </p>
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

      {/* Decisions Timeline */}
      <div>
        <h3 className="font-serif text-xl text-text-primary mb-6">
          Decisions Timeline
        </h3>

        <div className="relative ml-4">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />

          <div className="space-y-6">
            {sortedDecisions.map((decision, i) => (
              <motion.div
                key={`${decision.date}-${decision.decision}`}
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="relative pl-8"
              >
                {/* Dot marker */}
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-amber -translate-x-[3.5px]" />

                <p className="text-text-muted text-xs tabular-nums mb-1">
                  {decision.date}
                </p>
                <p className="text-text-primary font-medium text-sm">
                  {decision.decision}
                </p>
                <p className="text-text-secondary text-sm mt-1 leading-relaxed">
                  {decision.rationale}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
