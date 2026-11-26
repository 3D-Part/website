"use client";
import { useCallback, useSyncExternalStore } from "react";

// On a desktop the filters panel sits docked on the left of the product list.
// It starts shut, for more products in a row, until the visitor opens it; the
// choice is kept in this browser and shared by the panel and the bar above
// the list.
const KEY = "shop.filtersHidden";
const listeners = new Set<() => void>();
// the choice of this visit, for a browser that keeps no storage
let chosen: boolean | null = null;

const read = () => {
  if (chosen !== null) return chosen;
  try {
    return window.localStorage.getItem(KEY) !== "0";
  } catch {
    return true;
  }
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const useDockedFiltersHidden = () => {
  const hidden = useSyncExternalStore(subscribe, read, () => true);
  const setHidden = useCallback((value: boolean) => {
    chosen = value;
    // the panel's width follows this attribute (globals.css), set before the
    // first paint by the script in the layout
    if (value) document.documentElement.dataset.filtersHidden = "1";
    else delete document.documentElement.dataset.filtersHidden;
    try {
      window.localStorage.setItem(KEY, value ? "1" : "0");
    } catch {
      // the choice lasts until the page is left
    }
    listeners.forEach((listener) => listener());
  }, []);
  return { hidden, setHidden };
};

