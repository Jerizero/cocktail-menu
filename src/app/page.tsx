import { SiteHeader } from "@/components/ui/SiteHeader";
import { Footer } from "@/components/ui/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { MenuSection } from "@/components/sections/MenuSection";
import { DimensionalSection } from "@/components/sections/DimensionalSection";
import { FlavorMapSection } from "@/components/sections/FlavorMapSection";
import { SpiritSection } from "@/components/sections/SpiritSection";
import { RegionalSection } from "@/components/sections/RegionalSection";
import { TechniqueSection } from "@/components/sections/TechniqueSection";
import { RnDSection } from "@/components/sections/RnDSection";
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="pt-14 lg:pt-14">
        <HeroSection />
        <PhilosophySection />
        <MenuSection />
        <DimensionalSection />
        <FlavorMapSection />
        <SpiritSection />
        <RegionalSection />
        <TechniqueSection />
        <RnDSection />
      </main>
      <Footer />
    </>
  );
}
