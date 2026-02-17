"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techniques } from "@/data/techniques";
import { drinks } from "@/data/drinks";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TechniqueCard = ({
  technique,
  isOpen,
  onToggle,
  drinkNames,
}: {
  technique: (typeof techniques)[number];
  isOpen: boolean;
  onToggle: () => void;
  drinkNames: string[];
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-cream-dark/50">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-cream-dark transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-lg text-text-primary">
          {technique.name}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
          className="text-text-muted text-xl flex-shrink-0 ml-4"
        >
          {"\u25BE"}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { height: "auto" } : { height: 0 }}
            animate={{ height: "auto" }}
            exit={shouldReduceMotion ? { height: 0 } : { height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 space-y-4">
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                  Key Notes
                </p>
                <p className="text-text-secondary leading-relaxed">
                  {technique.keyNotes}
                </p>
              </div>

              {drinkNames.length > 0 && (
                <div>
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-2">
                    Used in
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {drinkNames.map((name) => (
                      <span
                        key={name}
                        className="px-3 py-1 bg-cream border border-border rounded-full text-sm text-text-primary"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const TechniqueSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const drinkNameMap = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const technique of techniques) {
      const names = technique.usedIn
        .map((id) => drinks.find((d) => d.id === id)?.name)
        .filter((n): n is string => Boolean(n));
      map.set(technique.id, names);
    }
    return map;
  }, []);

  return (
    <SectionWrapper id="techniques" variant="narrow" padding="md">
      <SectionHeading
        title="Technique Library"
        subtitle="The methods behind the menu"
      />

      <div className="max-w-3xl mx-auto space-y-3">
        {techniques.map((technique) => (
          <TechniqueCard
            key={technique.id}
            technique={technique}
            isOpen={openId === technique.id}
            onToggle={() =>
              setOpenId((prev) =>
                prev === technique.id ? null : technique.id,
              )
            }
            drinkNames={drinkNameMap.get(technique.id) ?? []}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};
