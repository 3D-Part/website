"use client";

import Search from "@/components/common/search/Search";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
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

const MIN_LENGTH = 2;
const PAGE_SIZE = 10;

const SearchProducts = () => {
  const [text, setText] = useState("");
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  // answers that arrive after the text changed are dropped
  const request = useRef(0);
  // lives here because the results close on a click outside, and the backorder
  // question is outside of them
  const { addToCart, modal: backorderModal } = useAddToCart();

  useEffect(() => {
    const id = ++request.current;
    setLoadingMore(false);
    if (text.trim().length < MIN_LENGTH) {
      setProducts([]);
      setCount(0);
      return;
    }
    setLoading(true);

    const timeout = setTimeout(async () => {
      try {
        const page = await productsServices.getAllProducts({
          nameLike: text.trim(),
          limit: PAGE_SIZE,
        });
        if (id !== request.current) return;
        setProducts(page.rows);
        setCount(page.count);
      } finally {
        if (id === request.current) setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [text]);

  // the next page, when the results are scrolled near their end
  const loadMore = useCallback(async () => {
    if (loading || loadingMore || products.length >= count) return;
    const id = request.current;
    setLoadingMore(true);
    try {
      const page = await productsServices.getAllProducts({
        nameLike: text.trim(),
        limit: PAGE_SIZE,
        offset: products.length,
      });
      if (id !== request.current) return;
      setProducts((current) => [
        ...current,
        ...page.rows.filter((row) => !current.some((c) => c.id === row.id)),
      ]);
      setCount(page.count);
    } finally {
      if (id === request.current) setLoadingMore(false);
    }
  }, [loading, loadingMore, products.length, count, text]);

  return (
    // fills the row on small screens, so the menu button ends up at the far right
    <div className="flex items-center flex-1 min-w-0 gap-2 lg:flex-none">
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
        loadingMore={loadingMore}
        hasMore={products.length < count}
        onLoadMore={loadMore}
        minLength={MIN_LENGTH}
        addToCart={addToCart}
      />
      {backorderModal}
    </div>
  );
};

export default SearchProducts;
