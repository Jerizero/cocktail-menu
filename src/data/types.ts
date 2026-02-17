export type Category = "aperitivos" | "caracter" | "fuertes";

export type Spirit =
  | "rum"
  | "cognac"
  | "gin"
  | "scotch"
  | "rye"
  | "vodka"
  | "aquavit"
  | "bourbon"
  | "mezcal";

export type ServiceStyle =
  | "highball"
  | "stirred"
  | "shaken"
  | "punch"
  | "on-a-rock"
  | "flip";

export type RnDStatus = "tested" | "partially-tested" | "specced" | "concept";

export type Region = "samana" | "tenares";

export interface DimensionalScores {
  boozy: number;
  refreshing: number;
  sweet: number;
  dryBitter: number;
  tart: number;
  weight: number;
  complexity: number;
}

export interface Drink {
  id: number;
  name: string;
  subtitle: string;
  slug: string;
  category: Category;
  base: string;
  modifiers: string[];
  technique: string;
  serviceStyle: ServiceStyle;
  spirits: Spirit[];
  dimensions: DimensionalScores;
  status: RnDStatus;
  testedNotes?: string;
  openQuestions?: string;
  notes: string[];
  region?: Region;
  regionNote?: string;
  batchSpecs?: string;
}

export interface Technique {
  id: string;
  name: string;
  usedIn: number[];
  keyNotes: string;
}

export interface RegionInfo {
  id: Region;
  name: string;
  drinkId: number;
  connection: string;
  keyIngredient: string;
  about: string;
}

export interface Inspiration {
  name: string;
  handle?: string;
  description: string;
  highlight?: string;
}

export interface Decision {
  date: string;
  decision: string;
  rationale: string;
}

export interface SideProject {
  id: string;
  name: string;
  subtitle: string;
  status: RnDStatus;
  description: string;
  specs?: string[];
}
