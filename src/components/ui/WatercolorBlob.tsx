"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface WatercolorBlobProps {
  color: string;
  className?: string;
  size?: number;
}

export const WatercolorBlob = ({ color, className, size = 400 }: WatercolorBlobProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, -150], { clamp: false });

  return (
    <motion.div
      style={{ y: shouldReduceMotion ? 0 : y }}
      className={cn("absolute pointer-events-none", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.6,-0.8C87.2,14.7,81.8,29.3,73.4,42.1C65,54.9,53.6,65.8,40.3,73.4C27,81,11.8,85.3,-2.9,83.9C-17.6,82.5,-35.2,75.4,-48.7,65C-62.2,54.6,-71.6,40.9,-77.3,25.8C-83,10.7,-85,-5.8,-81.1,-20.7C-77.2,-35.6,-67.4,-48.9,-54.8,-56.9C-42.2,-64.9,-26.8,-67.6,-11.9,-70.5C3.1,-73.4,30.6,-83.6,44.7,-76.4Z"
          transform="translate(100 100)"
          fill={color}
          fillOpacity={0.15}
        />
      </svg>
    </motion.div>
  );
};
