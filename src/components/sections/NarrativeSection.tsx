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
          This is{" "}
          <span className="text-amber italic">El Campo</span>
          &mdash;a Dominican cocktail bar concept built from the ground up,
          not borrowed from anyone else&rsquo;s playbook.
        </p>

        <div className="w-16 h-px bg-warm-brown/30" />

        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed"
        >
          The idea is simple but specific: take the dishes, the traditions,
          the ingredients that define Dominican life&mdash;guandules con coco
          simmering in a caldero, concon scraped from the bottom of the pot,
          mab&iacute; bark fermenting in a jar on the counter, habichuela dulce
          passed around at Easter&mdash;and deconstruct them into cocktails.
          Not &ldquo;Dominican ingredients dropped into classic templates.&rdquo;
          The food comes first. The drink follows.
        </motion.p>

        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed"
        >
          My family is from{" "}
          <span className="text-amber font-medium">Saman&aacute;</span>,
          the coconut peninsula on the northeast coast, and{" "}
          <span className="text-warm-brown font-medium">Tenares</span>,
          deep in the Cibao valley where cacao, tobacco, and coffee grow in
          the same red soil. Those two places shape every drink on this menu
          &mdash;the ingredients, the stories, the reason any of it matters.
          Every recipe is an R&amp;D project: technique-forward, obsessively
          tested, and rooted in something real.
        </motion.p>
      </motion.div>
    </section>
  );
};
