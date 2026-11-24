import React from "react";
import { TierInfo } from "@/shared/tiers";

const money = (value: number) => `${Math.round(value * 100) / 100} KM`;

const day = (value: string) => {
  const [year, month, date] = value.split("-");
  return `${date}.${month}.${year}.`;
};

/**
 * One quiet line under the photo: the tier, what it saves, and what is left
 * for the next one. A tier limited to some categories names them, each with
 * its percent.
 */
const TierSummary: React.FC<{ info: TierInfo | null }> = ({ info }) => {
  if (!info) return null;
  const { name, discount, next, since } = info;
  const categories = (info.categories ?? []).filter((category) => category.discount > 0);
  if (!name && !next) return null;
  return (
    <div className="text-sm text-center text-neutral-400 lg:text-left">
      <p>
        {name && (
          <span className="font-semibold text-neutral-100">
            {name}
            {categories.length === 0 && discount > 0 && (
              <span className="text-primary-400"> · {discount}% popusta</span>
            )}
          </span>
        )}
        {next && (
          <span>
            {name ? " · " : ""}još {money(next.remaining)} do {next.name}
          </span>
        )}
      </p>
      {name && categories.length > 0 && (
        <p className="mt-1">
          Popust važi za kategorije:{" "}
          {categories.map((category, index) => (
            <span key={category.categoryId}>
              {index > 0 && ", "}
              <span className="text-neutral-100">{category.name}</span>{" "}
              <span className="text-primary-400">{category.discount}%</span>
            </span>
          ))}
          <span className="text-neutral-500"> (i njihove podkategorije)</span>
        </p>
      )}
      {since && <p className="mt-1 text-xs text-neutral-500">Potrošnja se računa od {day(since)}</p>}
    </div>
  );
};

export default TierSummary;
