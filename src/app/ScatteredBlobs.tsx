"use client";

import { WatercolorBlob } from "@/components/ui/WatercolorBlob";

export const ScatteredBlobs = () => (
  <>
    {/* Menu area — warm amber wash */}
    <WatercolorBlob color="#B45309" className="top-[2%] right-[5%]" size={300} variant={1} parallaxSpeed={0.8} opacity={0.06} />
    <WatercolorBlob color="#A16207" className="top-[6%] -left-[8%]" size={220} variant={0} parallaxSpeed={0.5} opacity={0.05} />

    {/* Roots area — earthy tones */}
    <WatercolorBlob color="#78350F" className="top-[18%] -left-[10%]" size={280} variant={2} parallaxSpeed={1.2} opacity={0.05} />
    <WatercolorBlob color="#166534" className="top-[22%] right-[3%]" size={200} variant={1} parallaxSpeed={0.7} opacity={0.04} />

    {/* Dimensional/Analysis area — very subtle */}
    <WatercolorBlob color="#475569" className="top-[35%] right-[8%]" size={220} variant={0} parallaxSpeed={0.6} opacity={0.03} />
    <WatercolorBlob color="#B45309" className="top-[42%] -left-[6%]" size={200} variant={2} parallaxSpeed={0.9} opacity={0.04} />

    {/* Flavor/Spirit area */}
    <WatercolorBlob color="#A16207" className="top-[55%] right-[12%]" size={250} variant={1} parallaxSpeed={1} opacity={0.05} />

    {/* Technique/R&D area */}
    <WatercolorBlob color="#166534" className="top-[70%] -left-[8%]" size={240} variant={2} parallaxSpeed={0.7} opacity={0.05} />
    <WatercolorBlob color="#78350F" className="top-[82%] right-[5%]" size={220} variant={0} parallaxSpeed={0.5} opacity={0.04} />
  </>
);
