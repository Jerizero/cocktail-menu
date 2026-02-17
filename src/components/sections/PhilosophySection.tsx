"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InspirationCard } from "@/components/ui/InspirationCard";
import { inspirations } from "@/data/inspirations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionWrapper id="philosophy">
      <SectionHeading
        title="Philosophy & Inspiration"
        subtitle="Dominican food culture reinterpreted as cocktail architecture"
      />

      <motion.div
        ref={ref}
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-12"
      >
        <p className="text-text-secondary text-lg leading-relaxed">
          Not &ldquo;Dominican ingredients dropped into classic templates&rdquo;
          &mdash; Dominican{" "}
          <em className="text-text-primary font-medium">
            dishes and traditions
          </em>{" "}
          deconstructed into liquid form. Technique-forward but never
          technique-for-technique&rsquo;s-sake. Every technique serves the
          flavor.
        </p>
      </motion.div>

      {/* Horizontal scrolling inspiration cards */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 snap-x snap-mandatory scrollbar-hide">
          {inspirations.map((inspiration, i) => (
            <InspirationCard
              key={inspiration.name}
              inspiration={inspiration}
              index={i}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
