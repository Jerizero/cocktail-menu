"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const BLOB_SHAPES = [
  "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.6,-0.8C87.2,14.7,81.8,29.3,73.4,42.1C65,54.9,53.6,65.8,40.3,73.4C27,81,11.8,85.3,-2.9,83.9C-17.6,82.5,-35.2,75.4,-48.7,65C-62.2,54.6,-71.6,40.9,-77.3,25.8C-83,10.7,-85,-5.8,-81.1,-20.7C-77.2,-35.6,-67.4,-48.9,-54.8,-56.9C-42.2,-64.9,-26.8,-67.6,-11.9,-70.5C3.1,-73.4,30.6,-83.6,44.7,-76.4Z",
  "M39.5,-67.2C52.9,-60.7,67.1,-53.8,74.8,-42.3C82.5,-30.8,83.8,-15.4,82.2,-0.9C80.6,13.5,76.2,27.1,68.3,38.4C60.4,49.8,49.1,58.9,36.5,65.7C23.9,72.5,10,77,-4.2,76.2C-18.5,75.3,-33.2,69.2,-45.4,60C-57.6,50.8,-67.4,38.5,-73.5,24.5C-79.6,10.5,-82,-5.3,-78.6,-19.4C-75.2,-33.5,-66,-45.9,-54.1,-53.2C-42.2,-60.5,-27.5,-62.7,-13.7,-67.7C0.2,-72.7,26.1,-73.7,39.5,-67.2Z",
  "M42.1,-71.3C55.2,-65.2,66.9,-55.1,74.6,-42.4C82.3,-29.7,86,-14.8,84.7,-0.7C83.5,13.4,77.3,26.8,69.1,38.5C60.9,50.2,50.7,60.1,38.6,67.1C26.5,74.1,12.5,78.1,-1.5,78.8C-15.5,79.5,-31,76.8,-43.8,70C-56.6,63.2,-66.7,52.3,-73.2,39.4C-79.7,26.5,-82.6,11.6,-80.5,0.2C-78.4,-11.3,-71.3,-19.3,-64.8,-30.5C-58.3,-41.7,-52.3,-56.2,-42,-63.4C-31.7,-70.6,-17.1,-70.5,-1.3,-68.3C14.5,-66.1,29,-77.4,42.1,-71.3Z",
] as const;

interface WatercolorBlobProps {
  color: string;
  className?: string;
  size?: number;
  variant?: 0 | 1 | 2;
  parallaxSpeed?: number;
  opacity?: number;
}

export const WatercolorBlob = ({
  color,
  className,
  size = 400,
  variant = 0,
  parallaxSpeed = 1,
  opacity = 0.15,
}: WatercolorBlobProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, -150 * parallaxSpeed], { clamp: false });

  return (
    <motion.div
      style={{ y: shouldReduceMotion ? 0 : y }}
      className={cn("absolute pointer-events-none", className)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <path
          d={BLOB_SHAPES[variant]}
          transform="translate(100 100)"
          fill={color}
          fillOpacity={opacity}
        />
      </svg>
    </motion.div>
  );
};
