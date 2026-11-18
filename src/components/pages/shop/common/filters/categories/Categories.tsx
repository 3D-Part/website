"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CategoryAttributesInterface } from "@/shared/interfaces/categoryInterface";
import { FacetsInterface, productsServices } from "../../../../../../../services/productsServices";
import {
  hasSwitch,
  parseFilters,
  rangeOf,
  selectedValues,
  setRange,
  setSwitch,
  setText,
  stringifyFilters,
  textOf,
  toggleValue,
} from "@/shared/helper/attributeFilters";

const VISIBLE_VALUES = 8;
const SEARCH_FROM = 10;

const inputClass =
  "bg-neutral-800 border border-neutral-700 h-10 w-full rounded-lg px-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary-400";

const Check: React.FC<{
  checked: boolean;
  disabled?: boolean;
  label: string;
  count?: number;
  onChange: () => void;
}> = ({ checked, disabled, label, count, onChange }) => (
  <label
    className={`flex items-center justify-between gap-3 py-1.5 text-sm ${
      disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:text-white"
    } text-neutral-200`}
  >
    <span className="flex items-center min-w-0 gap-3">
      <input type="checkbox" className="sr-only peer" checked={checked} disabled={disabled} onChange={onChange} />
      <span
        className="flex items-center justify-center w-5 h-5 border rounded shrink-0 border-neutral-500 peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
        aria-hidden
      >
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="3">
          <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="truncate">{label}</span>
    </span>
    {count !== undefined && <span className="text-xs text-neutral-500 shrink-0">{count}</span>}
  </label>
);

/** One attribute with a list of values to tick, a switch, a text or a range. */
const Group: React.FC<{
  title: string;
  type: string;
  attributeId: string;
  values: { value: string; count: number }[] | null;
  filters: ReturnType<typeof parseFilters>;
  update: (next: ReturnType<typeof parseFilters>) => void;
}> = ({ title, type, attributeId, values, filters, update }) => {
  const ticked = selectedValues(filters, attributeId);
  const [open, setOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");

  const body = () => {
    if (type === "bool") {
      return (
        <Check
          checked={hasSwitch(filters, attributeId)}
          label="Da"
          onChange={() => update(setSwitch(filters, attributeId, !hasSwitch(filters, attributeId)))}
        />
      );
    }
    if (type === "range") {
      const { min, max } = rangeOf(filters, attributeId);
      return (
        <div className="flex gap-2">
          <input
            type="number"
            inputMode="decimal"
            placeholder="Od"
            value={min}
            onChange={(e) => update(setRange(filters, attributeId, e.target.value, max))}
            className={inputClass}
          />
          <input
            type="number"
            inputMode="decimal"
            placeholder="Do"
            value={max}
            onChange={(e) => update(setRange(filters, attributeId, min, e.target.value))}
            className={inputClass}
          />
        </div>
      );
    }
    if (type === "input") {
      return (
        <input
          type="text"
          placeholder={`${title}...`}
          value={textOf(filters, attributeId)}
          onChange={(e) => update(setText(filters, attributeId, e.target.value))}
          className={inputClass}
        />
      );
    }

    // a list of values: the ones that exist in the category, with how many products each has
    if (values === null) {
      return (
        <div className="flex flex-col gap-2" aria-hidden>
          {[70, 55, 80].map((w) => (
            <span key={w} className="h-5 rounded bg-neutral-700/60 animate-pulse" style={{ width: `${w}%` }} />
          ))}
        </div>
      );
    }

    // a ticked value stays on the list even if the other choices left it with no products
    const all = [
      ...values,
      ...ticked.filter((value) => !values.some((item) => item.value === value)).map((value) => ({ value, count: 0 })),
    ];
    const matching = search.trim()
      ? all.filter((item) => item.value.toLowerCase().includes(search.trim().toLowerCase()))
      : all;
    const shown = showAll || search.trim() ? matching : matching.slice(0, VISIBLE_VALUES);

    return (
      <div>
        {all.length >= SEARCH_FROM && (
          <input
            type="search"
            placeholder="Traži..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputClass} mb-2`}
          />
        )}
        {shown.map((item) => (
          <Check
            key={item.value}
            label={item.value}
            count={item.count}
            checked={ticked.includes(item.value)}
            disabled={item.count === 0 && !ticked.includes(item.value)}
            onChange={() => update(toggleValue(filters, attributeId, item.value))}
          />
        ))}
        {matching.length === 0 && <p className="py-1 text-sm text-neutral-500">Nema rezultata</p>}
        {!search.trim() && matching.length > VISIBLE_VALUES && (
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="mt-1 text-sm text-primary-400 hover:underline"
          >
            {showAll ? "Prikaži manje" : `Prikaži sve (${matching.length})`}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="pb-4 border-b border-neutral-800 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center justify-between w-full py-1 mb-2 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-white">
          {title}
          {ticked.length > 0 && <span className="ml-2 text-sm text-primary-400">({ticked.length})</span>}
        </span>
        <svg
          className={`w-4 h-4 text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && body()}
    </div>
  );
};

/**
 * The filters of a category by its attributes. Values are ticked, several of
 * one attribute at once (black or blue), and every list shows only what the
 * products of the category really have, with the number of products of each,
 * counted with the other choices taken into account.
 */
const Categories = ({
  filterByProductAttributes,
  setFilterByProductAttributes,
  categoryAttributes,
  categoryId,
  manufacturerId,
  priceMin,
  priceMax,
}: {
  filterByProductAttributes: string | undefined;
  setFilterByProductAttributes: (x: string | undefined) => void;
  categoryAttributes: Array<CategoryAttributesInterface>;
  categoryId?: string;
  manufacturerId?: string | null;
  priceMin?: number | null;
  priceMax?: number | null;
}) => {
  const pathname = usePathname();
  const filters = useMemo(() => parseFilters(filterByProductAttributes), [filterByProductAttributes]);
  const [facets, setFacets] = useState<FacetsInterface | null>(null);
  const requestRef = useRef(0);

  // What the lists can offer, asked again whenever a choice changes
  useEffect(() => {
    if (!categoryId) return;
    const id = ++requestRef.current;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const result = await productsServices.getFacets({
          categoryId,
          manufacturerId,
          priceMin,
          priceMax,
          filterByProductAttributes,
          signal: controller.signal,
        });
        if (id === requestRef.current) setFacets(result);
      } catch {
        // the lists stay as they were
      }
    }, 150);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [categoryId, manufacturerId, priceMin, priceMax, filterByProductAttributes]);

  if (!categoryId || categoryAttributes.length === 0 || pathname === "/shop/all") return null;

  const update = (next: ReturnType<typeof parseFilters>) => setFilterByProductAttributes(stringifyFilters(next));

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-bold text-white">Filtriraj po</p>
      {categoryAttributes.map((item) => {
        const type = (item as any).attribute?.type || "input";
        const facet = facets?.attributes.find((entry) => entry.attributeId === item.attributeId);
        return (
          <Group
            key={item.id}
            title={item.attribute.name}
            type={type}
            attributeId={item.attributeId}
            values={facet ? facet.values : facets ? [] : null}
            filters={filters}
            update={update}
          />
        );
      })}
    </div>
  );
};

export default Categories;
