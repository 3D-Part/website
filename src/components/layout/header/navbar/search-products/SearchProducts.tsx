"use client";

import Search from "@/components/common/search/Search";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchResults from "./search-results/SearchResults";
import { ProductInterface } from "@/shared/interfaces/productsInterface";
import { productsServices } from "../../../../../../services/productsServices";

const SearchProducts = () => {
  const [text, setText] = useState("");
  // read initial search param on client only
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const searchParam = queryParams.get("search") || "";
      setText(searchParam);
    } catch (e) {
      setText("");
    }
  }, []);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (text.length < 3) return;

    const fetch = async () => {
      const x = await productsServices.getAllProducts({
        nameLike: text,
        limit: 10,
      });
      x.rows.forEach((a) => {
        if (a.productOnSale.length) {
          a.salePrice = a.productOnSale[0].discountedPrice;
        }
      });
      setLoading(false);
      setProducts(x.rows);
      return x;
    };

    const delayDebounceFn = setTimeout(() => {
      fetch();
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/shop/sale"
        className="h-10 px-3 rounded-lg bg-primary-500 hover:bg-primary-600 transition-colors text-white text-sm font-exo2 font-semibold flex items-center whitespace-nowrap"
      >
        Akcija
      </Link>
      <Search
        searchIcon={true}
        clearIcon
        setValue={(x) => {
          setText(x);
        }}
        value={text}
        placeholder="Pronađi artikal"
        className="lg:min-w-[250px] lg:max-w-[350px] max-w-[calc(100%-52px)]"
        products={products}
        text={text}
        loading={loading}
      />
    </div>
  );
};

export default SearchProducts;
