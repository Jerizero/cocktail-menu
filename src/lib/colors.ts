export const SPIRIT_COLORS: Record<string, string> = {
  rum: "#B45309",
  gin: "#166534",
  cognac: "#78350F",
  whiskey: "#78350F",
  vodka: "#475569",
  aquavit: "#475569",
  scotch: "#A16207",
  rye: "#92400E",
  bourbon: "#854D0E",
  mezcal: "#B45309",
};

export const CATEGORY_COLORS = {
  aperitivos: "#B45309",
  caracter: "#166534",
  fuertes: "#78350F",
} as const;

export const HIGHLIGHT_COLOR = "#DC2626";

export const HEATMAP_SCALE = [
  "#FEF3C7",
  "#FDE68A",
  "#FCD34D",
  "#FBBF24",
  "#F59E0B",
  "#D97706",
  "#B45309",
  "#92400E",
] as const;

export const getHeatmapColor = (value: number): string => {
  if (value <= 2) return HEATMAP_SCALE[0];
  if (value <= 3) return HEATMAP_SCALE[1];
  if (value <= 4) return HEATMAP_SCALE[2];
  if (value <= 5) return HEATMAP_SCALE[3];
  if (value <= 6) return HEATMAP_SCALE[4];
  if (value <= 8) return HEATMAP_SCALE[5];
  if (value <= 9) return HEATMAP_SCALE[6];
  return HEATMAP_SCALE[7];
};

export const getHeatmapTextColor = (value: number): string =>
  value >= 7 ? "#FFFBEB" : "#78350F";
