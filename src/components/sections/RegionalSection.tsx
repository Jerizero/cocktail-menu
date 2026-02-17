"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { regions } from "@/data/regions";
import { drinks } from "@/data/drinks";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const RegionCard = ({
  region,
  drinkName,
  index,
}: {
  region: (typeof regions)[number];
  drinkName: string;
  index: number;
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-cream-dark rounded-2xl border border-border p-8 md:p-10"
    >
      <h3 className="font-serif text-3xl md:text-4xl text-text-primary mb-2">
        {region.name}
      </h3>

      <p className="text-amber font-semibold text-lg mb-6">{drinkName}</p>

      <div className="space-y-5">
        <div>
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
            Connection
          </p>
          <p className="text-text-secondary leading-relaxed">
            {region.connection}
          </p>
        </div>

        <div>
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
            Key Ingredient
          </p>
          <p className="text-text-primary font-medium">
            {region.keyIngredient}
          </p>
        </div>

        <div className="pt-3 border-t border-border">
          <p className="text-text-secondary text-sm leading-relaxed">
            {region.about}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const RegionalSection = () => {
  return (
    <SectionWrapper id="roots">
      <SectionHeading
        title="Our Roots"
        subtitle="Two Dominican regions, two cocktails, two stories"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {regions.map((region, i) => {
          const drink = drinks.find((d) => d.id === region.drinkId);
          return (
            <RegionCard
              key={region.id}
              region={region}
              drinkName={drink?.name ?? ""}
              index={i}
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
};
