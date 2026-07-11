export const SPIRIT_COLORS: Record<string, string> = {
  rum: "#A94E0F",
  gin: "#1E5F32",
  cognac: "#6E3A12",
  whiskey: "#6E3A12",
  vodka: "#4A5A63",
  aquavit: "#4A5A63",
  scotch: "#9A6A10",
  rye: "#8C4310",
  bourbon: "#854D0E",
  mezcal: "#A94E0F",
  clairin: "#D97706",
};

export const CATEGORY_COLORS = {
  aperitivos: "#A94E0F",
  caracter: "#1E5F32",
  fuertes: "#6E3A12",
  refrescantes: "#0E7490",
} as const;

export const HIGHLIGHT_COLOR = "#C93038";

export const HEATMAP_SCALE = [
  "#FEF3C7",
  "#FDE68A",
  "#FCD34D",
  "#FBBF24",
  "#F59E0B",
  "#D97706",
  "#A94E0F",
  "#8C4310",
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
  value >= 7 ? "#FFFBEB" : "#6E3A12";
