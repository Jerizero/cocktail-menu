"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WatercolorBlob } from "@/components/ui/WatercolorBlob";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

export const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Content-level collapse transforms — text and spacing compress, blobs stay put
  const contentScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.82]);
  const contentY = useTransform(scrollYProgress, [0, 0.8], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  // Collapse vertical gaps between text elements
  const contentGap = useTransform(scrollYProgress, [0, 0.8], [32, 8]);
  // Collapse the container's bottom margin so dead space closes as content fades
  const heroMargin = useTransform(scrollYProgress, [0, 0.7], [0, -180]);

  const contentStyle = shouldReduceMotion
    ? {}
    : { scale: contentScale, y: contentY, opacity: contentOpacity, gap: contentGap };

  return (
    <motion.div
      ref={sectionRef}
      id="hero"
      style={shouldReduceMotion ? {} : { marginBottom: heroMargin }}
      className="relative min-h-[75vh] flex items-center justify-center overflow-hidden px-4"
    >
      {/* Watercolor blobs — stay fixed, content collapses independently */}
      <WatercolorBlob
        color="#B45309"
        className="top-10 -left-16 md:-left-32 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]"
      />
      <WatercolorBlob
        color="#166534"
        className="bottom-20 -right-12 md:-right-24 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]"
        variant={1}
      />
      <WatercolorBlob
        color="#DC2626"
        className="top-1/3 right-1/4 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px]"
        variant={2}
        opacity={0.08}
      />

      <motion.div
        style={contentStyle}
        className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center"
      >
        <motion.h1
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary leading-tight"
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
          className="font-serif text-2xl sm:text-3xl text-text-secondary/80 tracking-tight"
        >
          A Dominican Cocktail Bar Concept
        </motion.p>

        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-base sm:text-lg text-text-muted max-w-xl"
        >
          15 drinks rooted in family heritage from{" "}
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
          <span>15 Drinks</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
