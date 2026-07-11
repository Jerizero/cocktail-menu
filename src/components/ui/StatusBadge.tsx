import type { RnDStatus } from "@/data/types";

const STATUS_CONFIG: Record<
  RnDStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  tested: {
    label: "Tested",
    bg: "bg-forest/10",
    text: "text-forest",
    dot: "bg-forest",
  },
  "partially-tested": {
    label: "Partially Tested",
    bg: "bg-amber/10",
    text: "text-amber",
    dot: "bg-amber",
  },
  specced: {
    label: "Spec'd",
    bg: "bg-slate-spirit/10",
    text: "text-slate-spirit",
    dot: "bg-slate-spirit",
  },
  concept: {
    label: "Concept",
    bg: "bg-text-muted/15",
    text: "text-text-secondary",
    dot: "bg-text-muted",
  },
};

export const StatusBadge = ({
  status,
  withDot = false,
}: {
  status: RnDStatus;
  withDot?: boolean;
}) => {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {withDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      )}
      {config.label}
    </span>
  );
};
