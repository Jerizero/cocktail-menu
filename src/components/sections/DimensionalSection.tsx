"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DimensionalHeatmap } from "@/components/charts/DimensionalHeatmap";
import { DrinkIllustration } from "@/components/ui/DrinkIllustration";
import { drinks } from "@/data/drinks";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const drinkById = (id: number) => drinks.find((d) => d.id === id);

const DIMENSION_NARRATIVES = [
  {
    label: "Boozy",
    range: "3 -- 8",
    text: "From sessionable Chinola at 3/10 to spirit-forward Negroni and Tabaquero at 8/10.",
    drinkIds: [2, 5, 10],
  },
  {
    label: "Refreshing",
    range: "1 -- 9",
    text: "Chinola leads at 9/10 \u2014 the drink your bartender can bang out in 30 seconds. Heavy hitters like Habichuela and Malta score just 1.",
    drinkIds: [2, 9, 12],
  },
  {
    label: "Sweet",
    range: "1 -- 8",
    text: "Only Habichuela Dulce goes full sweet at 8/10. The menu leans dry \u2014 half the drinks score 5 or below.",
    drinkIds: [9],
  },
  {
    label: "Dry",
    range: "1 -- 7",
    text: "Negroni leads at 7/10 with gin and dry vermouth. Mab\u00ed pushes to 6 as the bone-dry refresher. Most drinks sit low \u2014 the menu leans rich over parched.",
    drinkIds: [5, 4],
  },
  {
    label: "Bitter",
    range: "1 -- 8",
    text: "Negroni\u2019s Suze drives it to 8/10. Cafecito\u2019s Cap Corse quinquina hits 7. Tabaquero\u2019s Cynar adds 5. Light drinks like Chinola and Pi\u00f1a Colada barely register.",
    drinkIds: [5, 7, 10],
  },
  {
    label: "Tart",
    range: "0 -- 8",
    text: "Chinola\u2019s passion fruit hits 8/10. Tabaquero is the only drink at zero \u2014 no acid at all.",
    drinkIds: [2, 10],
  },
  {
    label: "Weight",
    range: "2 -- 9",
    text: "Clear split: Chinola and Mab\u00ED at 2/10 vs. Habichuela at 9/10. Menu spans the full body spectrum.",
    drinkIds: [2, 4, 9],
  },
  {
    label: "Complexity",
    range: "2 -- 10",
    text: "Sue\u00F1o scores a perfect 10/10 \u2014 milk clarification, oleo-tang, backloaded Licor 43. Chinola keeps it simple at 2.",
    drinkIds: [1, 2],
  },
];

export const DimensionalSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeDimension, setActiveDimension] = useState<number | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setStepRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      stepRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveDimension(index);
            }
          });
        },
        { threshold: 0.6, rootMargin: "-20% 0px -20% 0px" },
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <SectionWrapper id="dimensions" entrance="none" drift="left" className="section-accent-left">
      <SectionHeading
        title="Dimensional Analysis"
        subtitle="Eight dimensions reveal how 13 drinks create a balanced menu"
      />

      {/* Desktop: side-by-side sticky layout */}
      <div className="hidden md:grid md:grid-cols-5 md:gap-12">
        {/* Narrative column (left, 40%) */}
        <div className="col-span-2 space-y-[30vh] pb-[30vh]">
          {DIMENSION_NARRATIVES.map((step, i) => (
            <motion.div
              key={step.label}
              ref={setStepRef(i)}
              initial={shouldReduceMotion ? {} : { opacity: 0.3 }}
              animate={
                shouldReduceMotion
                  ? {}
                  : { opacity: activeDimension === i ? 1 : 0.3 }
              }
              transition={{ duration: 0.3 }}
              className="pt-8"
            >
              <p className="font-serif text-xl text-amber font-semibold mb-1">
                {step.label}
                <span className="text-text-muted text-sm font-sans font-normal ml-2">
                  ({step.range})
                </span>
              </p>
              <p className="text-text-secondary leading-relaxed">{step.text}</p>

              {/* Drink icon thumbnails */}
              <div className="flex flex-wrap gap-3 mt-3">
                {step.drinkIds.map((id) => {
                  const drink = drinkById(id);
                  if (!drink) return null;
                  return (
                    <div key={id} className="flex items-center gap-1.5">
                      <DrinkIllustration visual={drink.visual} size="tiny" />
                      <span className="text-text-muted text-xs leading-tight max-w-[5rem]">
                        {drink.name.split(" ").slice(0, 2).join(" ")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sticky chart column (right, 60%) */}
        <div className="col-span-3">
          <div className="sticky top-20">
            <DimensionalHeatmap activeDimension={activeDimension} />
          </div>
        </div>
      </div>

      {/* Mobile: stacked layout (chart first, then narrative) */}
      <div className="md:hidden space-y-8">
        <DimensionalHeatmap activeDimension={activeDimension} />

        <div className="space-y-6">
          {DIMENSION_NARRATIVES.map((step) => (
            <div
              key={step.label}
              className="border-l-2 border-amber/30 pl-4"
            >
              <p className="font-serif text-lg text-amber font-semibold mb-1">
                {step.label}
                <span className="text-text-muted text-sm font-sans font-normal ml-2">
                  ({step.range})
                </span>
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
