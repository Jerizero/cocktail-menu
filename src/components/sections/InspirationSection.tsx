"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InspirationCard } from "@/components/ui/InspirationCard";
import { inspirations } from "@/data/inspirations";

export const InspirationSection = () => {
  return (
    <SectionWrapper id="inspiration" padding="md">
      <SectionHeading
        title="The Influences"
        subtitle="Bars, creators, and philosophies that shaped this menu"
      />

      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 snap-x snap-mandatory scrollbar-hide">
          {inspirations.map((inspiration, i) => (
            <InspirationCard
              key={inspiration.name}
              inspiration={inspiration}
              index={i}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
