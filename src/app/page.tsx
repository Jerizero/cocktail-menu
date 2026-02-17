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
import { InspirationSection } from "@/components/sections/InspirationSection";
import { PageBackgroundWrapper } from "./PageBackgroundWrapper";
import { ScatteredBlobs } from "./ScatteredBlobs";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { BotanicalIllustration } from "@/components/ui/BotanicalIllustration";
import { ClientProviders } from "./ClientProviders";

export default function Home() {
  return (
    <ClientProviders>
      <SiteHeader />
      <PageBackgroundWrapper />
      <main className="relative pt-14 lg:pt-14">
        {/* Act I: The Hook */}
        <HeroSection />
        <PhilosophySection />
        <SectionDivider variant={1} />

        <div className="relative">
          <ScatteredBlobs />
          <BotanicalIllustration type="plantain-leaf" className="top-[3%] -right-8 opacity-[0.07]" size={160} />
          <BotanicalIllustration type="coffee-beans" className="top-[25%] -left-4 opacity-[0.07]" size={120} />
          <BotanicalIllustration type="palm-leaf" className="top-[50%] -right-6 opacity-[0.07]" size={150} />
          <BotanicalIllustration type="cacao-pod" className="top-[75%] -left-6 opacity-[0.07]" size={130} />

          {/* Act II: The Menu */}
          <MenuSection />

          <SectionDivider variant={2} />

          {/* Act III: The Story — why these drinks exist */}
          <RegionalSection />

          {/* Editorial bridge: Regional → Dimensional */}
          <p className="max-w-2xl mx-auto text-center text-text-muted italic text-sm py-8 px-4">
            The land shapes the ingredient. Now see what those ingredients taste like.
          </p>

          <SectionDivider variant={3} flip />

          {/* Act IV: The Craft — analysis and depth */}
          <DimensionalSection />

          {/* Editorial bridge: Dimensional → Flavor Map */}
          <p className="max-w-2xl mx-auto text-center text-text-muted italic text-sm py-8 px-4">
            Seven dimensions condensed to two axes — where each drink lives.
          </p>

          <FlavorMapSection />

          {/* Editorial bridge: Flavor Map → Spirit */}
          <p className="max-w-2xl mx-auto text-center text-text-muted italic text-sm py-8 px-4">
            Each dot is a drink. What holds them together? The spirits.
          </p>

          <SpiritSection />

          {/* Editorial bridge: Spirit → Technique */}
          <p className="max-w-2xl mx-auto text-center text-text-muted italic text-sm py-8 px-4">
            Spirits provide the foundation. Technique turns ingredients into cocktails.
          </p>

          {/* Act V: The Method */}
          <TechniqueSection />
          <RnDSection />
        </div>

        <SectionDivider variant={4} />

        {/* Act VI: The Credits */}
        <InspirationSection />
      </main>
      <Footer />
    </ClientProviders>
  );
}
