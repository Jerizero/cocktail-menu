"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WatercolorBlob } from "@/components/ui/WatercolorBlob";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Section-level shrink transforms — the whole block compresses
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.82]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -40]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.8], [0, 32]);
  const paddingInline = useTransform(scrollYProgress, [0, 0.8], [0, 48]);

  // Inner content fade — text fades out as section shrinks
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Reduced motion: no scroll-linked transforms
  const sectionStyle = shouldReduceMotion
    ? {}
    : { scale, y, borderRadius, paddingInline };

  const contentStyle = shouldReduceMotion ? {} : { opacity };

  return (
    <motion.div
      ref={sectionRef}
      style={sectionStyle}
      id="hero"
      className="relative min-h-[75vh] flex items-center justify-center overflow-hidden px-4"
    >
      {/* Watercolor blobs — now shrink with the section */}
      <WatercolorBlob
        color="#B45309"
        className="top-10 -left-32 w-[500px] h-[500px]"
      />
      <WatercolorBlob
        color="#166534"
        className="bottom-20 -right-24 w-[400px] h-[400px]"
        variant={1}
      />
      <WatercolorBlob
        color="#DC2626"
        className="top-1/3 right-1/4 w-[300px] h-[300px]"
        variant={2}
        opacity={0.08}
      />

      <motion.div
        style={contentStyle}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <motion.h1
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary leading-tight mb-4"
        >
          <span className="text-amber">El Campo</span>
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-serif text-2xl sm:text-3xl text-text-secondary/80 mb-8 tracking-tight"
        >
          A Dominican Cocktail Bar
        </motion.p>

        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-base sm:text-lg text-text-muted max-w-xl mx-auto mb-8"
        >
          14 drinks rooted in family heritage from{" "}
          <span className="text-amber font-medium">Samaná</span> &amp;{" "}
          <span className="text-warm-brown font-medium">Tenares</span>.
          <br />
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
          <span>14 Drinks</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
