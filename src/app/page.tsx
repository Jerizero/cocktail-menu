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
import { PageBackgroundWrapper } from "./PageBackgroundWrapper";
import { ScatteredBlobs } from "./ScatteredBlobs";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { BotanicalIllustration } from "@/components/ui/BotanicalIllustration";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <PageBackgroundWrapper />
      <main className="relative pt-14 lg:pt-14">
        <HeroSection />
        <SectionDivider variant={1} />

        <div className="relative">
          <ScatteredBlobs />
          <BotanicalIllustration type="plantain-leaf" className="top-[5%] -right-8 opacity-10" size={140} />
          <BotanicalIllustration type="coffee-beans" className="top-[35%] -left-4 opacity-10" size={100} />
          <BotanicalIllustration type="palm-leaf" className="top-[65%] -right-6 opacity-10" size={130} />
          <BotanicalIllustration type="cacao-pod" className="top-[85%] -left-6 opacity-10" size={110} />

          <PhilosophySection />
          <MenuSection />
          <DimensionalSection />
          <FlavorMapSection />
          <SpiritSection />

          <SectionDivider variant={2} />
          <RegionalSection />
          <SectionDivider variant={3} flip />

          <TechniqueSection />
          <RnDSection />
        </div>

        <SectionDivider variant={4} />
      </main>
      <Footer />
    </>
  );
}
