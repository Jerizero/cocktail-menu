"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const NarrativeSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="narrative"
      className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24"
    >
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="space-y-8"
      >
        {/* Pull quote */}
        <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-text-primary leading-snug tracking-tight">
          <span className="text-amber italic">El Campo</span> marries
          Dominican cuisine with modern mixology&mdash;not as a gimmick,
          but as a language.
        </p>

        <div className="w-16 h-px bg-warm-brown/30" />

        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed"
        >
          Every drink on this menu begins in the kitchen, not behind the bar.
          Guandules con coco simmering in a caldero becomes a coconut-forward
          base. Concon scraped from the bottom of the pot becomes a toasted
          rice syrup. Mab&iacute; bark fermenting in a jar on the counter
          becomes a bitter, dry refresher. The fusion is literal: Dominican
          food traditions deconstructed through the lens of modern cocktail
          technique&mdash;milk clarification, oleo-saccharum, acid adjustment,
          fat-washing&mdash;to create something that belongs to neither world
          alone.
        </motion.p>

        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed"
        >
          The roots run through two places.{" "}
          <span className="text-amber font-medium">Saman&aacute;</span> is
          the peninsula on the northeast coast where coconut palms outnumber
          people, where a community of descendants of freed Black Americans
          who arrived in 1824 built churches, kept English alive, and wove
          their foodways into the local fabric. Its drinks taste like salt
          air and coco water.{" "}
          <span className="text-warm-brown font-medium">Tenares</span> sits
          in the heart of the Cibao valley&mdash;red soil, tobacco fields,
          cacao drying in the sun, coffee picked at altitude. Its drinks are
          earthy, bitter, and layered. Between these two poles, thirteen
          cocktails map an entire island&rsquo;s worth of flavor.
        </motion.p>
      </motion.div>
    </section>
  );
};
