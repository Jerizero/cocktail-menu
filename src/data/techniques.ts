import type { Technique } from "@/data/types";

export const techniques: Technique[] = [
  {
    id: "milk-clarification",
    name: "Milk clarification + backloading",
    category: "clarification",
    usedIn: [1],
    keyNotes:
      "Punch INTO milk. Backload anything without tannins. Triple coffee filter.",
  },
  {
    id: "oleo-tang",
    name: "Oleo-Tang / Oleocitrate",
    category: "preparation",
    usedIn: [1],
    keyNotes: "PEELS not zest. Citric acid + Tang as abrasive.",
  },
  {
    id: "blender-fat-wash",
    name: "Blender fat-wash",
    category: "infusion",
    usedIn: [3],
    keyNotes: "Flash blend 10-15s, freeze, skim fat cap, strain.",
  },
  {
    id: "enzyme-clarification",
    name: "Enzyme clarification (Pectinex)",
    category: "clarification",
    usedIn: [7],
    keyNotes: "Decant + coffee filter polish.",
  },
  {
    id: "direct-warm-infusion",
    name: "Direct warm infusion",
    category: "infusion",
    usedIn: [5],
    keyNotes: "24-48hr room temp, freeze, strain.",
  },
  {
    id: "oven-roast-infusion",
    name: "Oven roast infusion",
    category: "infusion",
    usedIn: [5],
    keyNotes: "400\u00B0F, 20-25 min, no oil needed.",
  },
  {
    id: "acid-adjustment",
    name: "Acid adjustment",
    category: "preparation",
    usedIn: [1],
    keyNotes: "Citric + malic acid blend.",
  },
  {
    id: "spice-tea",
    name: "Spice tea",
    category: "infusion",
    usedIn: [],
    keyNotes:
      "Toast whole spices \u2192 smash \u2192 steep. Never ground spice directly.",
  },
  {
    id: "fat-wash-spirits",
    name: "Fat-wash spirits",
    category: "infusion",
    usedIn: [],
    keyNotes: "4oz oil per 750ml. Both spirits washed together.",
  },
  {
    id: "guandules-orgeat",
    name: "Guandules orgeat",
    category: "preparation",
    usedIn: [3],
    keyNotes:
      "Same technique as cashew orgeat: soak \u2192 toast \u2192 blend \u2192 strain \u2192 sweeten.",
  },
  {
    id: "cacao-husk-tea",
    name: "Cacao husk tea",
    category: "infusion",
    usedIn: [10],
    keyNotes:
      "Brew shells, not beans. Light/fruity/floral, not chocolate.",
  },
];
