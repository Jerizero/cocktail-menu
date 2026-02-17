"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="philosophy" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <motion.div
        ref={ref}
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <p className="text-text-secondary text-lg md:text-xl leading-relaxed italic">
          Not &ldquo;Dominican ingredients dropped into classic templates&rdquo;
          &mdash; Dominican{" "}
          <em className="text-text-primary font-medium not-italic">
            dishes and traditions
          </em>{" "}
          deconstructed into liquid form.
        </p>
        <p className="text-text-muted text-sm mt-4 tracking-wider uppercase">
          Technique-forward &middot; Story-driven &middot; Family-rooted
        </p>
      </motion.div>
    </section>
  );
};
