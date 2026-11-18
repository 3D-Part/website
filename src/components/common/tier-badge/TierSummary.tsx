import React from "react";
import { TierInfo } from "@/shared/tiers";

const money = (value: number) => `${Math.round(value * 100) / 100} KM`;

/** One quiet line under the photo: the tier, what it saves, and what is left for the next one. */
const TierSummary: React.FC<{ info: TierInfo | null }> = ({ info }) => {
  if (!info) return null;
  const { name, discount, next } = info;
  if (!name && !next) return null;
  return (
    <p className="text-sm text-neutral-400">
      {name && (
        <span className="font-semibold text-neutral-100">
          {name}
          {discount > 0 && <span className="text-primary-400"> · {discount}% popusta</span>}
        </span>
      )}
      {next && (
        <span>
          {name ? " · " : ""}još {money(next.remaining)} do {next.name}
        </span>
      )}
    </p>
  );
};

export default TierSummary;
