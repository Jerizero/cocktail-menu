"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DRMap, RegionSelector } from "@/components/ui/DRMap";
import { DrinkIllustration } from "@/components/ui/DrinkIllustration";
import { regions } from "@/data/regions";
import { drinks } from "@/data/drinks";
import type { Region } from "@/data/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const RegionDetail = ({ regionId }: { regionId: Region }) => {
  const shouldReduceMotion = useReducedMotion();
  const region = regions.find(r => r.id === regionId)!;
  const drink = drinks.find(d => d.id === region.drinkId)!;

  return (
    <motion.div
      key={regionId}
      initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      <div className="flex items-start gap-4">
        <DrinkIllustration visual={drink.visual} size="card" className="shrink-0" />
        <div>
          <h3 className="font-serif text-2xl md:text-3xl text-text-primary mb-1">
            {region.name}
          </h3>
          <p className="text-amber font-semibold">{drink.name}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Connection</p>
          <p className="text-text-secondary leading-relaxed">{region.connection}</p>
        </div>
        <div>
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Key Ingredient</p>
          <p className="text-text-primary font-medium">{region.keyIngredient}</p>
        </div>
        <div className="pt-3 border-t border-border">
          <p className="text-text-secondary text-sm leading-relaxed">{region.about}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Default view when no region is selected
const DefaultDetail = () => (
  <div className="flex flex-col items-center justify-center h-full text-center py-8">
    <p className="text-text-muted text-sm mb-2">Click a region to explore</p>
    <p className="text-text-secondary text-sm max-w-xs">
      Two Dominican regions, two cocktails, two stories of family heritage.
    </p>
  </div>
);

export const RegionalSection = () => {
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);

  return (
    <SectionWrapper id="roots" variant="full-bleed" padding="xl" entrance="none" bg="bg-gradient-to-b from-transparent via-cream-dark/30 to-transparent">
      {/* Decorative topographic lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" fill="none">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <path
              key={i}
              d={`M0,${80 + i * 50} C200,${60 + i * 50 + (i % 2 === 0 ? 30 : -20)} 400,${90 + i * 50 + (i % 2 === 0 ? -20 : 30)} 600,${75 + i * 50} C700,${70 + i * 50 + (i % 2 === 0 ? 15 : -15)} 800,${85 + i * 50}`}
              stroke="#78350F"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <SectionHeading
        title="Our Roots"
        subtitle="Two Dominican regions, two cocktails, two stories"
      />

      {/* Mobile: card-based selector */}
      <RegionSelector activeRegion={activeRegion} onSelectRegion={setActiveRegion} />

      {/* Desktop: map + detail panel */}
      <div className="hidden md:grid md:grid-cols-[55%_45%] gap-8 items-start mt-8">
        {/* Map */}
        <div className="flex items-center justify-center">
          <DRMap activeRegion={activeRegion} onSelectRegion={setActiveRegion} />
        </div>

        {/* Detail panel */}
        <div className="min-h-[320px]">
          <AnimatePresence mode="wait">
            {activeRegion ? (
              <RegionDetail key={activeRegion} regionId={activeRegion} />
            ) : (
              <DefaultDetail key="default" />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: detail panel */}
      <div className="md:hidden mt-4">
        <AnimatePresence mode="wait">
          {activeRegion && (
            <RegionDetail key={activeRegion} regionId={activeRegion} />
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
};
