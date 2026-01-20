"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
// import Filters from "../common/filters/Filters";
import FiltersSidebar from "../common/filters/FiltersSidebar";
import FilterHeader from "../common/FilterHeader";
import ProductGrid from "../common/product-grid/ProductGrid";
import {
  ProductPaginatedInterface,
  productsServices,
} from "../../../../../services/productsServices";
import { useParams, useSearchParams } from "next/navigation";
import Spinner from "@/components/common/spinner/Spinner";
import useUiApi from "@/redux/api/useUiApi";
import { CategoryAttributesInterface } from "@/shared/interfaces/categoryInterface";

const CategoryProducts: React.FC<{ categoryAttributes: Array<CategoryAttributesInterface>, categoryId: string, parameters: any }> = ({ categoryAttributes, categoryId, parameters }) => {
  const initCount = 30;

  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [field, setField] = useState<"name" | "price" | null>(null);
  const [order, setOrder] = useState<"ASC" | "DESC" | null>(null);
  const [filterByProductAttributes, setFilterByProductAttributes] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ProductPaginatedInterface>({
    count: 0,
    rows: [],
  });


  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

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

  const fetchProducts = useCallback(
    async (append = false) => {
      if (append && !hasMore) return;

      setIsLoading(true);
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

      res.rows.forEach((a) => {
        if (a.productOnSale.length) {
          a.salePrice = a.productOnSale[0].discountedPrice;
        }
      });

      setData((prev) => ({
        count: res.count,
        rows: append ? [...prev.rows, ...res.rows] : res.rows,
      }));

      setHasMore(offset < res.count);
      setIsLoading(false);
    },
    [categoryId, priceMin, priceMax, field, order, manufacturerId, offset, hasMore, filterByProductAttributes]
  );

  // Initial + filters/sorting load
  useEffect(() => {
    setOffset(0);
    setHasMore(true);
  }, [priceMin, priceMax, field, order, categoryId, manufacturerId, params.slug, filterByProductAttributes]);

  // Fetch products when offset is 0 (initial load or after filter change)
  useEffect(() => {
    if (offset === 0) {
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
    if (offset !== 0) {
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

      <FiltersSidebar
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
      />

      <FilterHeader title="Proizvodi" count={data.count} />

      <ProductGrid productList={data.rows} />
      {isLoading && <Spinner />}
    </>
  );
};

export default CategoryProducts;
