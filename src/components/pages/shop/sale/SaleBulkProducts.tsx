"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import FilterHeader from "../common/FilterHeader";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import Spinner from "@/components/common/spinner/Spinner";
import { ProductPaginatedInterface } from "../../../../../services/productsServices";
import { saleService } from "@/shared/services/saleService";
import FiltersSidebar from "../common/filters/FiltersSidebar";
import ProductGrid from "../common/product-grid/ProductGrid";
import { useAppDispatch } from "@/redux/hooks";
import { changeIsFilteringSidebarVisible } from "@/redux/slices/ui/uiSlice";
import { useListingMemory, useRestoredListing } from "../common/listingMemory";

const SaleBulkProducts = () => {
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
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const saleId = searchParams.get("sale");
    const dispatch = useAppDispatch();
    const hidePriceFilter = pathname === "/shop/sale";

    useEffect(() => {
        dispatch(changeIsFilteringSidebarVisible(false));
    }, [dispatch]);

    const canLoadRef = useRef(true);

    const fetchProducts = useCallback(
        async (append = false) => {
            if (append && !hasMore) return;

            setIsLoading(true);

            try {
                const saleData = await saleService.fetchProductsOnSaleBulk({
                    filters: saleId ? { saleId: { is: saleId } } : {},
                    sort: field && order ? { field, order } : undefined,
                    offset,
                    limit: initCount,
                });

                const mapped = saleData.rows.map((prod: any) => ({
                    salePrice: prod.discountedPrice,
                    ...prod.product,
                }));

                setData((prev) => ({
                    count: saleData.count,
                    rows: append ? [...prev.rows, ...mapped] : mapped,
                }));

                setHasMore(offset + initCount < saleData.count);
            } catch (err) {
                setData({ count: 0, rows: [] });
                setHasMore(false);
            } finally {
                setIsLoading(false);
            }
        },
        [field, order, offset, hasMore, saleId]
    );

    useEffect(() => {
        if (isRestoredView) return;

        setOffset(0);
        setHasMore(true);
    }, [priceMin, priceMax, field, order, params.slug, filterByProductAttributes, saleId]);

    useEffect(() => {
        if (offset === 0 && !isRestoredView) {
            fetchProducts(false);
        }
    }, [offset, fetchProducts]);

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
                canLoadRef.current = false;
                setOffset((prev) => prev + initCount);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (cooldownTimer) clearTimeout(cooldownTimer);
        };
    }, [isLoading, hasMore]);

    useEffect(() => {
        if (offset !== 0 && !isRestoredView) {
            fetchProducts(true);
        }
    }, [offset, fetchProducts]);

    useEffect(() => {
        let cooldownTimer: NodeJS.Timeout | null = null;
        if (!isLoading) {
            cooldownTimer = setTimeout(() => {
                canLoadRef.current = true;
            }, 20);
        }
        return () => {
            if (cooldownTimer) clearTimeout(cooldownTimer);
        };
    }, [isLoading]);

    return (
        <>
            <FiltersSidebar
                hidePriceFilter={hidePriceFilter}
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

            <FilterHeader title="Proizvodi na akciji" count={data.count} showFilters={false} />

            <ProductGrid productList={data.rows} />
            {isLoading && <Spinner />}
        </>
    );
};

export default SaleBulkProducts;
