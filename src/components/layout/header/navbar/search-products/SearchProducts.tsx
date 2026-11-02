"use client";

import Search from "@/components/common/search/Search";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import SearchResults from "./search-results/SearchResults";
import { ProductInterface } from "@/shared/interfaces/productsInterface";
import { productsServices } from "../../../../../../services/productsServices";
import { useAddToCart } from "@/shared/hooks/useAddToCart";

// The input follows the URL, so it empties when a page without ?search= opens.
// A separate component: useSearchParams needs its own Suspense boundary here, or
// the header would turn every static page into a client-rendered one.
const SearchParamSync = ({ onChange }: { onChange: (value: string) => void }) => {
  const search = useSearchParams().get("search") || "";

  useEffect(() => {
    onChange(search);
  }, [search, onChange]);

  return null;
};

const SearchProducts = () => {
  const [text, setText] = useState("");
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(false);
  // lives here because the results close on a click outside, and the backorder
  // question is outside of them
  const { addToCart, modal: backorderModal } = useAddToCart();

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
      <Suspense fallback={null}>
        <SearchParamSync onChange={setText} />
      </Suspense>
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
        addToCart={addToCart}
      />
      {backorderModal}
    </div>
  );
};

export default SearchProducts;
