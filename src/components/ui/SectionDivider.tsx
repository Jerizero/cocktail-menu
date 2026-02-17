"use client";

interface Props {
  variant?: 1 | 2 | 3 | 4;
  flip?: boolean;
  className?: string;
}

const WAVES = {
  1: "M0,40 C120,80 240,0 360,40 C480,80 600,10 720,45 C840,80 960,20 1080,40 C1200,60 1320,10 1440,40 L1440,80 L0,80 Z",
  2: "M0,50 C180,20 360,70 540,35 C720,0 900,60 1080,30 C1260,0 1350,50 1440,45 L1440,80 L0,80 Z",
  3: "M0,30 C240,70 480,10 720,50 C960,90 1200,20 1440,55 L1440,80 L0,80 Z",
  4: "M0,55 C160,30 320,65 480,40 C640,15 800,55 960,35 C1120,15 1280,60 1440,40 L1440,80 L0,80 Z",
};

export const SectionDivider = ({ variant = 1, flip = false, className = "" }: Props) => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="w-full h-[60px] md:h-[80px]"
      fill="none"
    >
      {/* Transparent reveal — cut out from a subtle fill */}
      <defs>
        <mask id={`wave-mask-${variant}${flip ? "-f" : ""}`}>
          <rect width="1440" height="80" fill="white" />
          <path d={WAVES[variant]} fill="black" />
        </mask>
      </defs>
      <rect
        width="1440"
        height="80"
        fill="currentColor"
        className="text-cream-dark/30"
        mask={`url(#wave-mask-${variant}${flip ? "-f" : ""})`}
      />
    </svg>
  </div>
);
