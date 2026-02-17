"use client";

import { WatercolorBlob } from "@/components/ui/WatercolorBlob";

export const ScatteredBlobs = () => (
  <>
    {/* Menu area — warm amber wash */}
    <WatercolorBlob color="#B45309" className="top-[2%] right-[5%]" size={500} variant={1} parallaxSpeed={0.8} opacity={0.12} />
    <WatercolorBlob color="#A16207" className="top-[6%] -left-[8%]" size={350} variant={0} parallaxSpeed={0.5} opacity={0.08} />

    {/* Roots area — earthy tones */}
    <WatercolorBlob color="#78350F" className="top-[18%] -left-[10%]" size={550} variant={2} parallaxSpeed={1.2} opacity={0.1} />
    <WatercolorBlob color="#166534" className="top-[22%] right-[3%]" size={300} variant={1} parallaxSpeed={0.7} opacity={0.07} />

    {/* Dimensional/Analysis area — cooler tones */}
    <WatercolorBlob color="#475569" className="top-[35%] right-[8%]" size={400} variant={0} parallaxSpeed={0.6} opacity={0.06} />
    <WatercolorBlob color="#B45309" className="top-[42%] -left-[6%]" size={350} variant={2} parallaxSpeed={0.9} opacity={0.09} />

    {/* Flavor/Spirit area */}
    <WatercolorBlob color="#A16207" className="top-[55%] right-[12%]" size={480} variant={1} parallaxSpeed={1} opacity={0.1} />

    {/* Technique/R&D area */}
    <WatercolorBlob color="#166534" className="top-[70%] -left-[8%]" size={420} variant={2} parallaxSpeed={0.7} opacity={0.1} />
    <WatercolorBlob color="#78350F" className="top-[82%] right-[5%]" size={380} variant={0} parallaxSpeed={0.5} opacity={0.08} />
  </>
);
