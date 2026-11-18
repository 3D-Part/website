"use client";
import React, { useEffect, useState } from "react";
import FilterHeader from "../common/FilterHeader";
import ProductGrid from "../common/product-grid/ProductGrid";
import Spinner from "@/components/common/spinner/Spinner";
import { ProductInterface } from "@/shared/interfaces/productsInterface";
import { getSalePrice } from "@/shared/helper/getSalePrice";

/**
 * Every product of the "Super ponuda" pool on one page, with the same cards
 * as everywhere else (sale price, icons, stock). Products on sale come first,
 * then by name, so the list does not reshuffle on every visit like the slider.
 */
const RecommendedProducts = () => {
  const [rows, setRows] = useState<ProductInterface[] | null>(null);

  useEffect(() => {
    let live = true;
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}shop/products/recommended`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!live) return;
        const list: ProductInterface[] = Array.isArray(data?.rows) ? data.rows : [];
        const onSale = (product: ProductInterface) => (getSalePrice(product as any) ? 0 : 1);
        setRows(
          [...list].sort(
            (a, b) => onSale(a) - onSale(b) || String(a.name).localeCompare(String(b.name), "bs")
          )
        );
      })
      .catch(() => live && setRows([]));
    return () => {
      live = false;
    };
  }, []);

  return (
    <>
      <FilterHeader title="Super ponuda" count={rows?.length ?? 0} showFilters={false} />
      {rows === null ? <Spinner /> : <ProductGrid productList={rows} />}
    </>
  );
};

export default RecommendedProducts;
