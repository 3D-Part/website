import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ProductPaginatedInterface } from "../../../../../services/productsServices";

interface ListingState {
  priceMin: number | null;
  priceMax: number | null;
  field: "name" | "price" | null;
  order: "ASC" | "DESC" | null;
  filterByProductAttributes: string | undefined;
  data: ProductPaginatedInterface;
  offset: number;
  hasMore: boolean;
}

interface ListingSnapshot extends ListingState {
  scrollY: number;
}

const currentUrl = () =>
  window.location.pathname +
  "?" +
  new URLSearchParams(window.location.search).toString();

// Kept in memory on purpose: it survives moving around the shop, while a reload
// or a new visit starts clean.
const snapshots = new Map<string, ListingSnapshot>();
let poppedUrl: string | null = null;

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    poppedUrl = currentUrl();
  });
}

/** The listing to bring back, only when arriving through browser back/forward. */
export const useRestoredListing = () => {
  const [restored] = useState(() =>
    typeof window !== "undefined" && poppedUrl === currentUrl()
      ? snapshots.get(poppedUrl) ?? null
      : null
  );

  return restored;
};

/**
 * Remembers the listing for when the user comes back to it. Returns true while
 * the restored rows are on screen, when the load effects have nothing to fetch.
 */
export const useListingMemory = (
  restored: ListingSnapshot | null,
  state: ListingState,
  isLoading: boolean
) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlRef = useRef("");
  const latestRef = useRef(state);
  const scrollYRef = useRef(restored?.scrollY ?? 0);

  useEffect(() => {
    urlRef.current = currentUrl();
  }, [pathname, searchParams]);

  // An in-flight page would leave a gap in the rows, so only settled state counts
  useEffect(() => {
    if (!isLoading) latestRef.current = state;
  });

  useEffect(() => {
    const handleScroll = () => {
      // Leaving the page moves the scroll too, and that must not be remembered
      if (currentUrl() === urlRef.current) scrollYRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      snapshots.set(urlRef.current, {
        ...latestRef.current,
        scrollY: scrollYRef.current,
      });
    };
  }, []);

  useEffect(() => {
    poppedUrl = null;
    if (restored) window.scrollTo(0, restored.scrollY);
  }, [restored]);

  const identity = (s: ListingState) =>
    [
      pathname,
      searchParams.toString(),
      s.priceMin,
      s.priceMax,
      s.field,
      s.order,
      s.filterByProductAttributes,
      s.offset,
    ].join("|");

  const restoredIdentityRef = useRef(
    restored && restored.data.rows.length > 0 ? identity(restored) : null
  );
  if (restoredIdentityRef.current !== identity(state)) {
    restoredIdentityRef.current = null;
  }

  return restoredIdentityRef.current !== null;
};
