"use client";

import { motion, useScroll } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { WatercolorIngredient } from "@/components/ui/WatercolorIngredient";

export const NarrativeSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  // Single scroll listener shared by all ingredients
  const { scrollY } = useScroll();

  return (
    <section
      id="narrative"
      className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24"
    >
      {/* Watercolor ingredient illustrations — desktop only, atmospheric */}
      <WatercolorIngredient
        type="coconut"
        className="top-[8%] -right-[4%]"
        size={110}
        parallaxSpeed={0.4}
        scrollY={scrollY}
      />
      <WatercolorIngredient
        type="orange"
        className="top-[12%] -left-[6%]"
        size={90}
        parallaxSpeed={0.3}
        scrollY={scrollY}
      />
      <WatercolorIngredient
        type="mabi-bark"
        className="top-[38%] -left-[5%]"
        size={100}
        parallaxSpeed={0.5}
        scrollY={scrollY}
      />
      <WatercolorIngredient
        type="mamajuana"
        className="top-[42%] -right-[3%]"
        size={120}
        parallaxSpeed={0.6}
        scrollY={scrollY}
      />
      <WatercolorIngredient
        type="sugarcane"
        className="bottom-[12%] -left-[4%]"
        size={130}
        parallaxSpeed={0.7}
        scrollY={scrollY}
      />
      <WatercolorIngredient
        type="caldero"
        className="bottom-[8%] -right-[5%]"
        size={120}
        parallaxSpeed={0.5}
        scrollY={scrollY}
      />

      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="relative z-10 space-y-8"
      >
        {/* Pull quote */}
        <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-text-primary leading-snug tracking-tight">
          <span className="text-amber italic">El Campo</span> is Dominican
          heritage in a cold glass&mdash;tradition that keeps moving.
        </p>

        <div className="w-16 h-px bg-warm-brown/30" />

        {/* Transformation paragraph */}
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed"
        >
          A caldero full of rice, left to stick and char&mdash;that concon
          becomes a toasted syrup in a swizzle. Mab&iacute; bark sits in a jar
          fermenting for days, then meets rye and lime. Morir
          so&ntilde;ando&mdash;the orange-and-milk drink every Dominican kid
          grew up on&mdash;gets clarified and fortified. Every drink starts in
          the same place: something your mami made, something your
          t&iacute;a poured, something that smelled like home.
        </motion.p>

        {/* Place paragraph */}
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed"
        >
          Two towns anchor the whole menu.{" "}
          <span className="text-amber font-medium">Saman&aacute;</span>&mdash;coconut
          palms, salt air, fishing boats, and a trace of African-American
          heritage from freed people who arrived in 1824.{" "}
          <span className="text-warm-brown font-medium">Tenares</span>&mdash;red
          earth, cacao, tobacco, coffee at altitude.
        </motion.p>
      </motion.div>
    </section>
  );
};
