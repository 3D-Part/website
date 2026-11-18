"use client";
import React from "react";
import { CategoryAttributesInterface } from "@/shared/interfaces/categoryInterface";
import { AttributeFilter, parseFilters, stringifyFilters } from "@/shared/helper/attributeFilters";

/** What is filtered now, as chips that can be taken off one by one, and one button to take them all off. */
const ActiveFilters: React.FC<{
  filterByProductAttributes: string | undefined;
  setFilterByProductAttributes: (x: string | undefined) => void;
  categoryAttributes: Array<CategoryAttributesInterface>;
  priceMin: number | null;
  priceMax: number | null;
  setPriceMin: (x: number | null) => void;
  setPriceMax: (x: number | null) => void;
}> = ({
  filterByProductAttributes,
  setFilterByProductAttributes,
  categoryAttributes,
  priceMin,
  priceMax,
  setPriceMin,
  setPriceMax,
}) => {
  const filters = parseFilters(filterByProductAttributes);
  const hasPrice = priceMin !== null || priceMax !== null;
  if (filters.length === 0 && !hasPrice) return null;

  const nameOf = (id: string) => categoryAttributes.find((item) => item.attributeId === id)?.attribute.name ?? "Atribut";
  const labelOf = (filter: AttributeFilter) => {
    if (filter.like !== undefined) return filter.like.replace(/^%|%$/g, "");
    if (filter.gt !== undefined || filter.lt !== undefined) {
      return `${filter.gt ?? ""}–${filter.lt ?? ""}`;
    }
    return filter.value === true ? "Da" : String(filter.value);
  };
  const remove = (target: AttributeFilter) =>
    setFilterByProductAttributes(stringifyFilters(filters.filter((item) => item !== target)));

  const chip = "flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-neutral-800 border border-neutral-600 text-neutral-100 hover:border-primary-400";

  return (
    <div className="flex flex-wrap items-center w-full gap-2 mb-6">
      {filters.map((filter, i) => (
        <button key={i} type="button" onClick={() => remove(filter)} className={chip} aria-label={`Ukloni filter ${nameOf(filter.attributeId)}: ${labelOf(filter)}`}>
          <span className="text-neutral-400">{nameOf(filter.attributeId)}:</span> {labelOf(filter)}
          <span aria-hidden className="text-neutral-400">✕</span>
        </button>
      ))}
      {hasPrice && (
        <button
          type="button"
          className={chip}
          onClick={() => {
            setPriceMin(null);
            setPriceMax(null);
          }}
        >
          <span className="text-neutral-400">Cijena:</span> {priceMin ?? 0}–{priceMax ?? "∞"} KM
          <span aria-hidden className="text-neutral-400">✕</span>
        </button>
      )}
      <button
        type="button"
        onClick={() => {
          setFilterByProductAttributes(undefined);
          setPriceMin(null);
          setPriceMax(null);
        }}
        className="px-2 py-1 text-sm text-primary-400 hover:underline"
      >
        Obriši sve
      </button>
    </div>
  );
};

export default ActiveFilters;
