// The customer tier as the API sends it with the profile (GET users/profile)

/** A category the tier gives its discount on, with its own percent. */
export type TierCategory = { categoryId: string; name: string; discount: number };

export type TierLevel = {
  id: string;
  name: string;
  discount: number;
  threshold: number;
  color: string;
  // the SVG of the tier's badge, null for none
  badge?: string | null;
  // empty: the discount is on every product
  categories?: TierCategory[];
};

export type TierInfo = {
  id: string | null;
  name: string | null;
  discount: number;
  color: string | null;
  badge?: string | null;
  spend: number;
  period: "all" | "12m";
  // the day the spending is counted from, null for since the beginning
  since?: string | null;
  // empty: the discount is on every product; else only on these categories
  categories?: TierCategory[];
  next: { name: string; discount: number; threshold: number; remaining: number } | null;
  tiers: TierLevel[];
};

// The shop's palette has no amber, purple and so on, so the badges use exact
// colours. Every class is written out so the build keeps it.
export const TIER_STYLES: Record<string, { badge: string; bar: string; ring: string }> = {
  amber: { badge: "bg-[#4a2c0a] text-[#fcd9a0] border-[#b45309]", bar: "bg-[#d97706]", ring: "ring-[#d97706]" },
  slate: { badge: "bg-[#2f3a4a] text-[#e2e8f0] border-[#94a3b8]", bar: "bg-[#cbd5e1]", ring: "ring-[#cbd5e1]" },
  yellow: { badge: "bg-[#3f3407] text-[#fde68a] border-[#eab308]", bar: "bg-[#facc15]", ring: "ring-[#facc15]" },
  blue: { badge: "bg-[#10264f] text-[#bfdbfe] border-[#3b82f6]", bar: "bg-[#3b82f6]", ring: "ring-[#3b82f6]" },
  green: { badge: "bg-[#0f3a24] text-[#bbf7d0] border-[#22c55e]", bar: "bg-[#22c55e]", ring: "ring-[#22c55e]" },
  purple: { badge: "bg-[#33154f] text-[#e9d5ff] border-[#a855f7]", bar: "bg-[#a855f7]", ring: "ring-[#a855f7]" },
  red: { badge: "bg-[#4a1414] text-[#fecaca] border-[#ef4444]", bar: "bg-[#ef4444]", ring: "ring-[#ef4444]" },
  pink: { badge: "bg-[#4a1233] text-[#fbcfe8] border-[#ec4899]", bar: "bg-[#ec4899]", ring: "ring-[#ec4899]" },
};

export const tierStyle = (color?: string | null) =>
  TIER_STYLES[color ?? ""] ?? TIER_STYLES.slate;

/** An SVG as a picture source; shown through <img>, so nothing in it can run. */
export const svgSrc = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
