"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlavorScatter } from "@/components/charts/FlavorScatter";

export const FlavorMapSection = () => {
  const handleSelectDrink = (drinkId: number) => {
    // Modal connection will be wired later
    console.log("Selected drink:", drinkId);
  };

  return (
    <SectionWrapper id="flavor-map" padding="md" entrance="scale-up" drift="right">
      <SectionHeading
        title="Flavor Map"
        subtitle="Where each drink lives on the sweet-dry and light-heavy spectrum"
      />

      <p className="text-text-secondary max-w-2xl mb-10 leading-relaxed">
        The horizontal axis maps each drink from sweet to dry/bitter. The
        vertical axis maps from light and refreshing to heavy and rich. Drinks
        that cluster together share a sensory neighborhood; outliers fill
        deliberate gaps in the menu.
      </p>

      <div className="flex justify-center">
        <FlavorScatter onSelectDrink={handleSelectDrink} />
      </div>
    </SectionWrapper>
  );
};
