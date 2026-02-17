"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const SectionWrapper = ({ id, children, className }: SectionWrapperProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", className)}
    >
      {children}
    </motion.section>
  );
};
