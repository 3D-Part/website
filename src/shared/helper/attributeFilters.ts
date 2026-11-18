// The attribute filters of a listing, kept as a JSON text (so a listing can be
// remembered and restored). One entry is one condition:
//   { attributeId, value: "Black" }        a value picked from a list
//   { attributeId, value: true }           a yes/no switch that is on
//   { attributeId, like: "%text%" }        a text typed in
//   { attributeId, gt: 10, lt: 50 }        a range
// Several entries with the same attributeId are alternatives (Black OR Blue),
// different attributes all have to match.

export type AttributeFilter = {
  attributeId: string;
  value?: string | boolean;
  like?: string;
  gt?: number;
  lt?: number;
};

export const parseFilters = (json: string | undefined): AttributeFilter[] => {
  if (!json) return [];
  try {
    const list = JSON.parse(json);
    return Array.isArray(list) ? list.filter((item) => item && item.attributeId) : [];
  } catch {
    return [];
  }
};

export const stringifyFilters = (list: AttributeFilter[]): string | undefined =>
  list.length > 0 ? JSON.stringify(list) : undefined;

/** The values ticked in a list of one attribute. */
export const selectedValues = (list: AttributeFilter[], attributeId: string): string[] =>
  list
    .filter((item) => item.attributeId === attributeId && typeof item.value === "string")
    .map((item) => item.value as string);

/** Ticks the value if it is not ticked, unticks it if it is. */
export const toggleValue = (list: AttributeFilter[], attributeId: string, value: string): AttributeFilter[] => {
  const ticked = selectedValues(list, attributeId).includes(value);
  return ticked
    ? list.filter((item) => !(item.attributeId === attributeId && item.value === value))
    : [...list, { attributeId, value }];
};

const withoutAttribute = (list: AttributeFilter[], attributeId: string) =>
  list.filter((item) => item.attributeId !== attributeId);

export const setSwitch = (list: AttributeFilter[], attributeId: string, on: boolean): AttributeFilter[] =>
  on ? [...withoutAttribute(list, attributeId), { attributeId, value: true }] : withoutAttribute(list, attributeId);

export const setText = (list: AttributeFilter[], attributeId: string, text: string): AttributeFilter[] =>
  text.trim()
    ? [...withoutAttribute(list, attributeId), { attributeId, like: `%${text.trim()}%` }]
    : withoutAttribute(list, attributeId);

export const setRange = (list: AttributeFilter[], attributeId: string, min: string, max: string): AttributeFilter[] => {
  const entry: AttributeFilter = { attributeId };
  if (min.trim() !== "" && Number.isFinite(Number(min))) entry.gt = Number(min);
  if (max.trim() !== "" && Number.isFinite(Number(max))) entry.lt = Number(max);
  return entry.gt !== undefined || entry.lt !== undefined
    ? [...withoutAttribute(list, attributeId), entry]
    : withoutAttribute(list, attributeId);
};

export const textOf = (list: AttributeFilter[], attributeId: string): string =>
  (list.find((item) => item.attributeId === attributeId && item.like !== undefined)?.like ?? "").replace(/^%|%$/g, "");

export const rangeOf = (list: AttributeFilter[], attributeId: string) => {
  const item = list.find((entry) => entry.attributeId === attributeId && (entry.gt !== undefined || entry.lt !== undefined));
  return { min: item?.gt !== undefined ? String(item.gt) : "", max: item?.lt !== undefined ? String(item.lt) : "" };
};

export const hasSwitch = (list: AttributeFilter[], attributeId: string) =>
  list.some((item) => item.attributeId === attributeId && item.value === true);
