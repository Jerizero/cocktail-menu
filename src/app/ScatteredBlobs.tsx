"use client";

import { WatercolorBlob } from "@/components/ui/WatercolorBlob";

export const ScatteredBlobs = () => (
  <>
    {/* Between Philosophy & Menu */}
    <WatercolorBlob color="#B45309" className="top-[8%] right-[5%]" size={400} variant={1} parallaxSpeed={0.8} opacity={0.1} />
    {/* Between Menu & Dimensional */}
    <WatercolorBlob color="#166534" className="top-[22%] -left-[10%]" size={500} variant={2} parallaxSpeed={1.2} opacity={0.08} />
    {/* Between Dimensional & Flavor Map */}
    <WatercolorBlob color="#78350F" className="top-[38%] right-[8%]" size={350} variant={0} parallaxSpeed={0.6} opacity={0.1} />
    {/* Between Spirits & Roots */}
    <WatercolorBlob color="#A16207" className="top-[55%] right-[15%]" size={450} variant={1} parallaxSpeed={1} opacity={0.08} />
    {/* Between Techniques & R&D */}
    <WatercolorBlob color="#166534" className="top-[80%] -left-[8%]" size={400} variant={2} parallaxSpeed={0.7} opacity={0.1} />
  </>
);
