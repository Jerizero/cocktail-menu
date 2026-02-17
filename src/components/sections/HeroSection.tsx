"use client";

import { motion } from "framer-motion";
import { WatercolorBlob } from "@/components/ui/WatercolorBlob";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4"
    >
      {/* Watercolor blobs */}
      <WatercolorBlob
        color="#B45309"
        className="top-10 -left-32 w-[500px] h-[500px]"
      />
      <WatercolorBlob
        color="#166534"
        className="bottom-20 -right-24 w-[400px] h-[400px]"
      />
      <WatercolorBlob
        color="#DC2626"
        className="top-1/3 right-1/4 w-[300px] h-[300px] opacity-[0.08]"
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.h1
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary leading-tight mb-6"
        >
          Dominican-Inspired
          <br />
          <span className="text-amber">Cocktail Menu</span>
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto mb-8"
        >
          12 drinks rooted in family heritage from{" "}
          <span className="text-amber font-medium">Samaná</span> &amp;{" "}
          <span className="text-warm-brown font-medium">Tenares</span>.
          Technique-forward, story-driven.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-8 text-sm text-text-muted"
        >
          <span>R&amp;D Collection</span>
          <span className="w-1 h-1 rounded-full bg-text-muted" />
          <span>12 Drinks</span>
          <span className="w-1 h-1 rounded-full bg-text-muted" />
          <span>3 Side Projects</span>
        </motion.div>
      </div>
    </section>
  );
};
