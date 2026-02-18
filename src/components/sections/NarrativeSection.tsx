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
          <span className="text-amber italic">El Campo</span> is Dominican
          tradition deconstructed into liquid form.
        </p>

        <div className="w-16 h-px bg-warm-brown/30" />

        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed"
        >
          Concon scraped from the caldero becomes a toasted rice syrup.
          Mab&iacute; bark fermenting in a jar becomes a bone-dry highball.
          Morir so&ntilde;ando becomes a clarified punch. Mamajuana becomes
          a spritz. Dominican food and drink traditions, deconstructed
          through modern technique.
        </motion.p>

        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed"
        >
          The whole island is in the glass, but two places hold special
          weight.{" "}
          <span className="text-amber font-medium">Saman&aacute;</span>&mdash;coconut
          palms, salt air, a community of freed Black Americans who arrived
          in 1824 and wove their foodways into the peninsula.{" "}
          <span className="text-warm-brown font-medium">Tenares</span>&mdash;red
          soil, tobacco, cacao, coffee at altitude.
        </motion.p>
      </motion.div>
    </section>
  );
};
