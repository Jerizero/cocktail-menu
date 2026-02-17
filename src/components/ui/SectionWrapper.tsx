"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Variant = "contained" | "wide" | "full-bleed" | "narrow";
type Padding = "sm" | "md" | "lg" | "xl";
type Entrance = "fade-up" | "fade-left" | "scale-up" | "none";
type Drift = "none" | "left" | "right";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  variant?: Variant;
  padding?: Padding;
  entrance?: Entrance;
  drift?: Drift;
  bg?: string;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  contained: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  wide: "max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8",
  "full-bleed": "w-full px-4 sm:px-8 lg:px-16",
  narrow: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
};

const DRIFT_CLASSES: Record<Drift, string> = {
  none: "",
  left: "lg:pr-[15%] lg:pl-[2%]",
  right: "lg:pl-[15%] lg:pr-[2%]",
};

const PADDING_CLASSES: Record<Padding, string> = {
  sm: "py-8 md:py-12",
  md: "py-10 md:py-16",
  lg: "py-12 md:py-20",
  xl: "py-16 md:py-28",
};

const ENTRANCE_INITIAL: Record<Entrance, Record<string, number>> = {
  "fade-up": { opacity: 0, y: 24 },
  "fade-left": { opacity: 0, x: -24 },
  "scale-up": { opacity: 0, scale: 0.97 },
  none: {},
};

const ENTRANCE_ANIMATE: Record<Entrance, Record<string, number>> = {
  "fade-up": { opacity: 1, y: 0 },
  "fade-left": { opacity: 1, x: 0 },
  "scale-up": { opacity: 1, scale: 1 },
  none: { opacity: 1 },
};

export const SectionWrapper = ({
  id,
  children,
  className,
  variant = "contained",
  padding = "lg",
  entrance = "fade-up",
  drift = "none",
  bg,
}: SectionWrapperProps) => {
  const shouldReduceMotion = useReducedMotion();
  const noAnimate = shouldReduceMotion || entrance === "none";

  const inner = (
    <motion.section
      id={id}
      initial={noAnimate ? {} : ENTRANCE_INITIAL[entrance]}
      whileInView={noAnimate ? {} : ENTRANCE_ANIMATE[entrance]}
      viewport={{ once: true, margin: "-100px" }}
      transition={noAnimate ? {} : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        VARIANT_CLASSES[variant],
        PADDING_CLASSES[padding],
        DRIFT_CLASSES[drift],
        className
      )}
    >
      {children}
    </motion.section>
  );

  if (bg) {
    return (
      <div className={bg}>
        {inner}
      </div>
    );
  }

  return inner;
};
