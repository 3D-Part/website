"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
// import Filters from "../common/filters/Filters";
import FiltersSidebar from "../common/filters/FiltersSidebar";
import FilterHeader from "../common/FilterHeader";
import ActiveFilters from "../common/ActiveFilters";
import { parseFilters } from "@/shared/helper/attributeFilters";
import ProductGrid from "../common/product-grid/ProductGrid";
import {
  ProductPaginatedInterface,
  productsServices,
} from "../../../../../services/productsServices";
import { useParams, useSearchParams } from "next/navigation";
import Spinner from "@/components/common/spinner/Spinner";
import useUiApi from "@/redux/api/useUiApi";
import { CategoryAttributesInterface } from "@/shared/interfaces/categoryInterface";
import { useListingMemory, useRestoredListing } from "../common/listingMemory";

const CategoryProducts: React.FC<{ categoryAttributes: Array<CategoryAttributesInterface>, categoryId: string, parameters: any }> = ({ categoryAttributes, categoryId, parameters }) => {
  const initCount = 30;

  const restored = useRestoredListing();

  const [priceMin, setPriceMin] = useState<number | null>(restored?.priceMin ?? null);
  const [priceMax, setPriceMax] = useState<number | null>(restored?.priceMax ?? null);
  const [field, setField] = useState<"name" | "price" | null>(restored?.field ?? null);
  const [order, setOrder] = useState<"ASC" | "DESC" | null>(restored?.order ?? null);
  const [filterByProductAttributes, setFilterByProductAttributes] = useState<string | undefined>(restored?.filterByProductAttributes);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ProductPaginatedInterface>(restored?.data ?? {
    count: 0,
    rows: [],
  });


  const [offset, setOffset] = useState(restored?.offset ?? 0);
  const [hasMore, setHasMore] = useState(restored?.hasMore ?? true);

  const isRestoredView = useListingMemory(
    restored,
    { priceMin, priceMax, field, order, filterByProductAttributes, data, offset, hasMore },
    isLoading
  );

  const params = useParams();
  const searchParams = useSearchParams();
  const manufacturerId = searchParams.get("manufacturerId");
  const { toggleFilteringSidebar } = useUiApi();

  // Close sidebar on page load
  useEffect(() => {
    toggleFilteringSidebar(false);
  }, []);

  // Cooldown flag between scroll fetches
  const canLoadRef = useRef(true);
  // Only the newest request may change the list, an older answer arriving late is dropped
  const requestRef = useRef(0);

  const fetchProducts = useCallback(
    async (append = false) => {
      if (append && !hasMore) return;

      setIsLoading(true);
      const requestId = ++requestRef.current;
      const res = await productsServices.getAllProducts({
        categoryId,
        filterByProductAttributes,
        price: { gt: priceMin, lt: priceMax },
        field,
        order,
        manufacturerId,
        offset,
        limit: initCount,
      });

      if (requestId !== requestRef.current) return;

      res.rows.forEach((a) => {
        if (a.productOnSale.length) {
          a.salePrice = a.productOnSale[0].discountedPrice;
        }
      });

      setData((prev) => ({
        count: res.count,
        rows: append ? [...prev.rows, ...res.rows] : res.rows,
      }));

      setHasMore(offset + res.rows.length < res.count);
      setIsLoading(false);
    },
    [categoryId, priceMin, priceMax, field, order, manufacturerId, offset, hasMore, filterByProductAttributes]
  );

  // Initial + filters/sorting load
  useEffect(() => {
    if (isRestoredView) return;

    setOffset(0);
    setHasMore(true);
  }, [priceMin, priceMax, field, order, categoryId, manufacturerId, params.slug, filterByProductAttributes]);

  // Fetch products when offset is 0 (initial load or after filter change)
  useEffect(() => {
    if (offset === 0 && !isRestoredView) {
      fetchProducts(false);
    }
  }, [offset, fetchProducts]);

  // Infinite scroll listener
  useEffect(() => {
    let cooldownTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (!canLoadRef.current || isLoading || !hasMore) return;

      const footerHeight =
        document.getElementsByTagName("footer")[0]?.clientHeight || 0;

      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight - footerHeight
      ) {
        canLoadRef.current = false; // prevent multiple triggers until cooldown ends
        setOffset((prev) => prev + initCount);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (cooldownTimer) clearTimeout(cooldownTimer);
    };
  }, [isLoading, hasMore]);

  // Fetch more when offset changes
  useEffect(() => {
    if (offset !== 0 && !isRestoredView) {
      fetchProducts(true);
    }
  }, [offset]);

  // Cooldown after fetch finishes
  useEffect(() => {
    let cooldownTimer: NodeJS.Timeout | null = null;
    if (!isLoading) {
      cooldownTimer = setTimeout(() => {
        canLoadRef.current = true;
      }, 20); // 2s cooldown
    }
    return () => {
      if (cooldownTimer) clearTimeout(cooldownTimer);
    };
  }, [isLoading]);

  return (
    <>
      {/* <Filters
        priceMin={priceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        setPriceMin={setPriceMin}
        field={field}
        order={order}
        filterByProductAttributes={filterByProductAttributes}
        setFilterByProductAttributes={setFilterByProductAttributes}
        setField={setField}
        setOrder={setOrder}
        isLoading={isLoading}
      /> */}

      {/* from lg the filters and sorting stay docked on the left while the list scrolls */}
      <div className="lg:flex lg:items-start lg:gap-6 xl:gap-8">
        <FiltersSidebar
          docked
          categoryAttributes={categoryAttributes}
          priceMin={priceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          setPriceMin={setPriceMin}
          field={field}
          order={order}
          filterByProductAttributes={filterByProductAttributes}
          setFilterByProductAttributes={setFilterByProductAttributes}
          setField={setField}
          setOrder={setOrder}
          categoryId={categoryId}
          manufacturerId={manufacturerId}
          resultCount={data.count}
        />

        <div className="flex-1 min-w-0">
          <FilterHeader docked sort={{ field, order, setField, setOrder }}
            title="Proizvodi"
            count={data.count}
            activeCount={parseFilters(filterByProductAttributes).length + (priceMin !== null || priceMax !== null ? 1 : 0)}
          />

          <ActiveFilters
            categoryAttributes={categoryAttributes}
            filterByProductAttributes={filterByProductAttributes}
            setFilterByProductAttributes={setFilterByProductAttributes}
            priceMin={priceMin}
            priceMax={priceMax}
            setPriceMin={setPriceMin}
            setPriceMax={setPriceMax}
          />

          <ProductGrid productList={data.rows} />
          {isLoading && <Spinner />}
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;
