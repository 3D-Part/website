"use client";

import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Price from "./price/Price";
import Sorter from "./sorter/Sorter";
import Categories from "./categories/Categories";
import useUiApi from "@/redux/api/useUiApi";
import { CategoryAttributesInterface } from "@/shared/interfaces/categoryInterface";

const FiltersSidebar: React.FC<{
    categoryAttributes?: Array<CategoryAttributesInterface>;
    priceMin: number | null;
    setPriceMin: (x: number | null) => void;
    priceMax: number | null;
    setPriceMax: (x: number | null) => void;
    order: "ASC" | "DESC" | null;
    setOrder: (x: "ASC" | "DESC" | null) => void;
    filterByProductAttributes: string | undefined;
    setFilterByProductAttributes: (x: string | undefined) => void;
    field: "name" | "price" | null;
    setField: (x: "name" | "price" | null) => void;
    isLoading?: boolean;
}> = ({
    priceMax,
    priceMin,
    setPriceMax,
    setPriceMin,
    field,
    order,
    setField,
    setOrder,
    filterByProductAttributes,
    setFilterByProductAttributes,
    isLoading,
    categoryAttributes
}) => {
        const { isFilteringSidebarVisible, toggleFilteringSidebar } = useUiApi();
        const sidebarRef = useRef<HTMLDivElement>(null);
        const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

        // Staged/pending filter states
        const [pendingPriceMin, setPendingPriceMin] = useState<number | null>(priceMin);
        const [pendingPriceMax, setPendingPriceMax] = useState<number | null>(priceMax);
        const [pendingField, setPendingField] = useState<"name" | "price" | null>(field);
        const [pendingOrder, setPendingOrder] = useState<"ASC" | "DESC" | null>(order);
        const [pendingFilterByProductAttributes, setPendingFilterByProductAttributes] = useState<string | undefined>(filterByProductAttributes);

        // Sync pending states when sidebar opens
        useEffect(() => {
            if (isFilteringSidebarVisible) {
                setPendingPriceMin(priceMin);
                setPendingPriceMax(priceMax);
                setPendingField(field);
                setPendingOrder(order);
                setPendingFilterByProductAttributes(filterByProductAttributes);
            }
        }, [isFilteringSidebarVisible, priceMin, priceMax, field, order, filterByProductAttributes]);

        const applyFilters = () => {
            setPriceMin(pendingPriceMin);
            setPriceMax(pendingPriceMax);
            setField(pendingField);
            setOrder(pendingOrder);
            setFilterByProductAttributes(pendingFilterByProductAttributes);
            toggleFilteringSidebar(false);
        };

        // Auto-apply filters with debounce when values change
        useEffect(() => {
            // Clear existing timer
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }

            // Set new timer to auto-apply filters after 800ms of inactivity
            debounceTimerRef.current = setTimeout(() => {
                setPriceMin(pendingPriceMin);
                setPriceMax(pendingPriceMax);
                setField(pendingField);
                setOrder(pendingOrder);
                setFilterByProductAttributes(pendingFilterByProductAttributes);
            }, 800);

            // Cleanup timer on unmount
            return () => {
                if (debounceTimerRef.current) {
                    clearTimeout(debounceTimerRef.current);
                }
            };
        }, [pendingPriceMin, pendingPriceMax, pendingField, pendingOrder, pendingFilterByProductAttributes]);

        const resetFilters = () => {
            setPendingPriceMin(null);
            setPendingPriceMax(null);
            setPendingField(null);
            setPendingOrder(null);
            setPendingFilterByProductAttributes(undefined);
            setPriceMin(null);
            setPriceMax(null);
            setField(null);
            setOrder(null);
            setFilterByProductAttributes(undefined);
        };

        // Close sidebar when clicking outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    isFilteringSidebarVisible &&
                    sidebarRef.current &&
                    !sidebarRef.current.contains(event.target as Node)
                ) {
                    toggleFilteringSidebar(false);
                }
            };

            if (isFilteringSidebarVisible) {
                document.addEventListener("mousedown", handleClickOutside);
                document.body.classList.add("overflow-hidden");
            } else {
                document.body.classList.remove("overflow-hidden");
            }

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.body.classList.remove("overflow-hidden");
            };
        }, [isFilteringSidebarVisible, toggleFilteringSidebar]);

        return (
            <>
                {/* Overlay */}
                {isFilteringSidebarVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity backdrop-blur-sm" />
                )}

                {/* Sidebar */}
                <div
                    ref={sidebarRef}
                    className={`fixed top-0 left-0 h-full w-80 md:w-96 bg-neutral-900 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-neutral-700 ${isFilteringSidebarVisible ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-neutral-700 bg-neutral-800">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <svg
                                    className="w-6 h-6 text-primary-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                    />
                                </svg>
                                Filteri
                            </h2>
                            <button
                                onClick={() => toggleFilteringSidebar(false)}
                                className="p-2 hover:bg-neutral-700 rounded-lg transition-all text-neutral-400 hover:text-white"
                                aria-label="Close filters"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 bg-neutral-900">
                            <div className="flex flex-col gap-8">
                                <Price
                                    priceMin={pendingPriceMin}
                                    priceMax={pendingPriceMax}
                                    setPriceMax={setPendingPriceMax}
                                    setPriceMin={setPendingPriceMin}
                                />

                                <div className="h-px bg-neutral-700"></div>

                                <Sorter
                                    field={pendingField}
                                    order={pendingOrder}
                                    setField={setPendingField}
                                    setOrder={setPendingOrder}
                                />

                                {/* TODO: Make more filters that are required, need to see how will filters work  */}
                                <div className="h-px bg-neutral-700"></div>

                                {categoryAttributes && <Categories
                                    categoryAttributes={categoryAttributes}
                                    filterByProductAttributes={pendingFilterByProductAttributes}
                                    setFilterByProductAttributes={setPendingFilterByProductAttributes}
                                />}
                            </div>
                        </div>

                        {/* Footer with Apply/Reset buttons */}
                        <div className="p-4 border-t border-neutral-700 bg-neutral-800">
                            <div className="flex gap-3">
                                <button
                                    onClick={applyFilters}
                                    className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white font-semibold rounded-lg transition-all"
                                >
                                    Zatvori
                                </button>
                                <button
                                    onClick={resetFilters}
                                    className="px-4 py-3 bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-500 text-white font-semibold rounded-lg transition-all"
                                >
                                    Resetuj
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

export default FiltersSidebar;
