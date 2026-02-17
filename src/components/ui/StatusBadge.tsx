import type { RnDStatus } from "@/data/types";

const STATUS_CONFIG: Record<
  RnDStatus,
  { label: string; bg: string; text: string }
> = {
  tested: { label: "Tested", bg: "bg-green-100", text: "text-green-800" },
  "partially-tested": {
    label: "Partially Tested",
    bg: "bg-yellow-100",
    text: "text-yellow-800",
  },
  specced: { label: "Spec'd", bg: "bg-blue-100", text: "text-blue-800" },
  concept: { label: "Concept", bg: "bg-gray-100", text: "text-gray-700" },
};

export const StatusBadge = ({ status }: { status: RnDStatus }) => {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
};
