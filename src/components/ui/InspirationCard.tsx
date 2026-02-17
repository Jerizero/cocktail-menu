"use client";

import { motion } from "framer-motion";
import type { Inspiration } from "@/data/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  inspiration: Inspiration;
  index: number;
}

export const InspirationCard = ({ inspiration, index }: Props) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex-shrink-0 w-72 snap-start bg-white/60 border border-border/50 rounded-lg p-5 hover:border-amber/30 transition-colors duration-200"
    >
      <p className="font-serif text-lg text-text-primary mb-1">
        {inspiration.name}
      </p>
      {inspiration.handle && (
        <p className="text-sm text-amber mb-3">{inspiration.handle}</p>
      )}
      <p className="text-sm text-text-secondary leading-relaxed">
        {inspiration.description}
      </p>
      {inspiration.highlight && (
        <p className="text-xs text-text-muted mt-3 italic">
          {inspiration.highlight}
        </p>
      )}
    </motion.div>
  );
};
