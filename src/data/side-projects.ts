import type { SideProject } from "@/data/types";

export const sideProjects: SideProject[] = [
  {
    id: "alpine-salt-meadow",
    name: "Alpine Salt Meadow",
    subtitle: "For a friend",
    status: "tested",
    description:
      "Mezcal + Yellow Chartreuse (0.25-0.3oz) with clarified savory celery-lime cordial and 4oz Agua de Piedra. Champs-\u00C9lys\u00E9es ratio (4:1 spirit to Chartreuse) for accent, not co-star.",
    specs: [
      "Base: Mezcal + Yellow Chartreuse (0.25-0.3oz \u2014 NOT 0.5, too forward)",
      "Modifiers: Clarified Savory Celery-Lime Cordial, 4oz Agua de Piedra (CRUCIAL \u2014 non-negotiable)",
      "Technique: Enzyme clarification (Pectinex) on cordial",
      "Cordial specs: 960g juice base (2:1 celery to lime), 400g sugar, 60g lime peels, 24g salt",
    ],
  },
  {
    id: "coquito",
    name: "Coquito",
    subtitle: "Modular System",
    status: "specced",
    description:
      "Coconut-oil fat-washed rum blend (Appleton Estate 8yr + Ten To One White) with coconut-infused evaporated milk, coconut cream, condensed milk, and a toasted spice tea.",
    specs: [
      "Spirit blend: Appleton Estate 8yr + Ten To One White Rum, BOTH fat-washed together (4oz coconut oil per 750ml)",
      "Base: Coconut-infused evaporated milk + coconut cream + condensed milk",
      "Spice tea: Toast whole spices \u2192 smash \u2192 steep in coconut water (cardamom YES, ginger removed)",
      "Vanilla: Bean paste (not vanilla liqueur)",
      "Variants: Traditional, Chocolate, Pistachio, Coco-Hopper (3oz Coquito + 0.5oz Cr\u00E8me de Menthe + 0.5oz Cr\u00E8me de Cacao)",
    ],
  },
  {
    id: "jade-and-allspice",
    name: "Jade & Allspice",
    subtitle: "Dominican-Vietnamese Freezer Door",
    status: "concept",
    description: "Concept only, needs development.",
  },
];
