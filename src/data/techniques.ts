import type { Technique } from "@/data/types";

export const techniques: Technique[] = [
  {
    id: "milk-clarification",
    name: "Milk clarification + backloading",
    usedIn: [1],
    keyNotes:
      "Punch INTO milk. Backload anything without tannins. Triple coffee filter.",
  },
  {
    id: "oleo-tang",
    name: "Oleo-Tang / Oleocitrate",
    usedIn: [1],
    keyNotes: "PEELS not zest. Citric acid + Tang as abrasive.",
  },
  {
    id: "blender-fat-wash",
    name: "Blender fat-wash",
    usedIn: [3],
    keyNotes: "Flash blend 10-15s, freeze, skim fat cap, strain.",
  },
  {
    id: "enzyme-clarification",
    name: "Enzyme clarification (Pectinex)",
    usedIn: [7],
    keyNotes: "Decant + coffee filter polish.",
  },
  {
    id: "direct-warm-infusion",
    name: "Direct warm infusion",
    usedIn: [5],
    keyNotes: "24-48hr room temp, freeze, strain.",
  },
  {
    id: "oven-roast-infusion",
    name: "Oven roast infusion",
    usedIn: [5],
    keyNotes: "400\u00B0F, 20-25 min, no oil needed.",
  },
  {
    id: "acid-adjustment",
    name: "Acid adjustment",
    usedIn: [1],
    keyNotes: "Citric + malic acid blend.",
  },
  {
    id: "spice-tea",
    name: "Spice tea",
    usedIn: [],
    keyNotes:
      "Toast whole spices \u2192 smash \u2192 steep. Never ground spice directly.",
  },
  {
    id: "fat-wash-spirits",
    name: "Fat-wash spirits",
    usedIn: [],
    keyNotes: "4oz oil per 750ml. Both spirits washed together.",
  },
  {
    id: "guandules-orgeat",
    name: "Guandules orgeat",
    usedIn: [3],
    keyNotes:
      "Same technique as cashew orgeat: soak \u2192 toast \u2192 blend \u2192 strain \u2192 sweeten.",
  },
  {
    id: "cacao-husk-tea",
    name: "Cacao husk tea",
    usedIn: [10],
    keyNotes:
      "Brew shells, not beans. Light/fruity/floral, not chocolate.",
  },
];
