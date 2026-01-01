"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
// import Heading2 from "@/components/common/text/heading/Heading2";
import FilterHeader from "../common/FilterHeader";

import { useParams, useSearchParams } from "next/navigation";
import Spinner from "@/components/common/spinner/Spinner";
import { ProductPaginatedInterface, productsServices } from "../../../../../services/productsServices";
import { saleService } from "@/shared/services/saleService";
// import Filters from "../common/filters/Filters";
import FiltersSidebar from "../common/filters/FiltersSidebar";
import ProductGrid from "../common/product-grid/ProductGrid";
import useUiApi from "@/redux/api/useUiApi";
import Filters from "../common/filters/Filters";

const SaleProducts = ({ queryParams }: { queryParams: any }) => {
    const initCount = 30;

    const [priceMin, setPriceMin] = useState<number | null>(null);
    const [priceMax, setPriceMax] = useState<number | null>(null);
    const [field, setField] = useState<"name" | "price" | null>(null);
    const [order, setOrder] = useState<"ASC" | "DESC" | null>(null);
    const [filterByProductAttributes, setFilterByProductAttributes] = useState<string | undefined>(undefined);
    const [search, setSearch] = useState<string | null>(queryParams.search || null);

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
    const saleQuery = searchParams.get("sale");
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
            // If sale query param is present and true, fetch sale products instead
            if (saleQuery) {
                try {
                    // const dataSale = await saleService.fetchActiveSale();
                    // if (!dataSale?.id) {
                    //     // no active sale, set empty
                    //     setData({ count: 0, rows: [] });
                    //     setHasMore(false);
                    //     setIsLoading(false);
                    //     return;
                    // }

                    const saleData = await saleService.fetchActiveSaleProducts({ saleId: saleQuery });

                    const start = offset;
                    const end = offset + initCount;
                    const pageRows = saleData.rows.slice(start, end);

                    const mapped = pageRows.map((prod: any) => ({
                        salePrice: prod.discountedPrice,
                        ...prod.product,
                    }));

                    setData((prev) => ({
                        count: saleData.count,
                        rows: append ? [...prev.rows, ...mapped] : mapped,
                    }));

                    setHasMore(end < saleData.count);
                } catch (err) {
                    setData({ count: 0, rows: [] });
                    setHasMore(false);
                } finally {
                    setIsLoading(false);
                }

                return;
            }
            const res = await productsServices.getAllProducts({
                filterByProductAttributes,
                price: { gt: priceMin, lt: priceMax },
                field,
                search,
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
        [priceMin, priceMax, field, order, manufacturerId, offset, hasMore, filterByProductAttributes, saleQuery, search]
    );

    // Initial + filters/sorting load
    useEffect(() => {
        setOffset(0);
        setHasMore(true);
        fetchProducts(false);
    }, [priceMin, priceMax, field, order, manufacturerId, params.slug, filterByProductAttributes]);

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

            <FilterHeader title={saleQuery ? "Proizvodi na akciji" : "Proizvodi"} count={data.count} />

            <ProductGrid productList={data.rows} />
            {isLoading && <Spinner />}
        </>
    );
};

export default SaleProducts;
