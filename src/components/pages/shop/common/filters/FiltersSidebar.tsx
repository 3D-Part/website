"use client";

import { useEffect, useRef, useState } from "react";
import Price from "./price/Price";
import Categories from "./categories/Categories";
import useUiApi from "@/redux/api/useUiApi";
import { CategoryAttributesInterface } from "@/shared/interfaces/categoryInterface";
import Sorter from "./sorter/Sorter";
import { useDockedFiltersHidden } from "../dockedFilters";

const FiltersSidebar: React.FC<{
    hidePriceFilter?: boolean;
    categoryAttributes?: Array<CategoryAttributesInterface>;
    priceMin: number | null;
    setPriceMin: (x: number | null) => void;
    priceMax: number | null;
    setPriceMax: (x: number | null) => void;
    // the sorting sits next to the Filteri button (FilterHeader) on phones and
    // tablets; on a desktop it is at the top of the docked panel
    order?: "ASC" | "DESC" | null;
    setOrder?: (x: "ASC" | "DESC" | null) => void;
    filterByProductAttributes: string | undefined;
    setFilterByProductAttributes: (x: string | undefined) => void;
    field?: "name" | "price" | null;
    setField?: (x: "name" | "price" | null) => void;
    isLoading?: boolean;
    // for the lists of values of the category's attributes
    categoryId?: string;
    manufacturerId?: string | null;
    // how many products the listing shows now, for the button
    resultCount?: number;
    // on a desktop (lg) the panel stays on the left of the list and sticks
    // under the header while the products scroll; below lg it is the drawer
    docked?: boolean;
}> = ({
    hidePriceFilter,
    priceMax,
    priceMin,
    setPriceMax,
    setPriceMin,
    filterByProductAttributes,
    setFilterByProductAttributes,
    isLoading,
    categoryAttributes,
    categoryId,
    manufacturerId,
    docked,
    field,
    order,
    setField,
    setOrder,
}) => {
        const { isFilteringSidebarVisible, toggleFilteringSidebar } = useUiApi();
        // on a desktop the docked panel can be hidden for more products in a row
        const { hidden: dockedHidden, setHidden: setDockedHidden } = useDockedFiltersHidden();
        // the panel slides open and shut only when the visitor hides or opens it,
        // not when a page loads with the panel already hidden
        const [animate, setAnimate] = useState(false);
        const showDocked = (show: boolean) => {
            setAnimate(true);
            setDockedHidden(!show);
        };
        const sidebarRef = useRef<HTMLDivElement>(null);
        const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

        // Staged/pending filter states
        const [pendingPriceMin, setPendingPriceMin] = useState<number | null>(priceMin);
        const [pendingPriceMax, setPendingPriceMax] = useState<number | null>(priceMax);
        const [pendingFilterByProductAttributes, setPendingFilterByProductAttributes] = useState<string | undefined>(filterByProductAttributes);

        // Sync pending states when sidebar opens; the docked panel is always
        // open, so it follows every change (e.g. a chip removed above the list)
        useEffect(() => {
            if (isFilteringSidebarVisible || docked) {
                setPendingPriceMin(hidePriceFilter ? null : priceMin);
                setPendingPriceMax(hidePriceFilter ? null : priceMax);
                setPendingFilterByProductAttributes(filterByProductAttributes);
            }
        }, [isFilteringSidebarVisible, docked, hidePriceFilter, priceMin, priceMax, filterByProductAttributes]);

        const applyFilters = () => {
            setPriceMin(hidePriceFilter ? null : pendingPriceMin);
            setPriceMax(hidePriceFilter ? null : pendingPriceMax);
            setFilterByProductAttributes(pendingFilterByProductAttributes);
            toggleFilteringSidebar(false);
        };

        // Auto-apply filters with debounce when values change
        useEffect(() => {
            // Clear existing timer
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }

            // Apply a moment after the last change, no button needed
            debounceTimerRef.current = setTimeout(() => {
                setPriceMin(hidePriceFilter ? null : pendingPriceMin);
                setPriceMax(hidePriceFilter ? null : pendingPriceMax);
                setFilterByProductAttributes(pendingFilterByProductAttributes);
            }, 400);

            // Cleanup timer on unmount
            return () => {
                if (debounceTimerRef.current) {
                    clearTimeout(debounceTimerRef.current);
                }
            };
        }, [hidePriceFilter, pendingPriceMin, pendingPriceMax, pendingFilterByProductAttributes]);

        const resetFilters = () => {
            setPendingPriceMin(null);
            setPendingPriceMax(null);
            setPendingFilterByProductAttributes(undefined);
            setPriceMin(null);
            setPriceMax(null);
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
                {/* on a desktop, with the docked panel hidden: a narrow upright tab on the
                    left edge opens it again; it fits the page's margin, over no card */}
                {docked && dockedHidden && (
                    <button
                        type="button"
                        onClick={() => showDocked(true)}
                        aria-label="Prikaži filtere"
                        className="filters-tab group hidden lg:flex fixed left-0 top-[calc(var(--header-h,0px)+1.5rem)] z-30 w-8 hover:w-10 flex-col items-center gap-2 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-r-lg shadow-lg shadow-black/40 transition-[width,background-color] duration-200"
                    >
                        <span className="[writing-mode:vertical-rl] rotate-180 text-sm tracking-wide">Filteri</span>
                        {/* the funnel turned the way the text reads */}
                        <svg className="w-4 h-4 -rotate-90 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                    </button>
                )}

                {/* Overlay */}
                {isFilteringSidebarVisible && (
                    <div className={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity backdrop-blur-sm ${docked ? "lg:hidden" : ""}`} />
                )}

                {/* Sidebar */}
                <div
                    ref={sidebarRef}
                    className={`fixed top-0 left-0 h-full w-full sm:w-96 bg-neutral-900 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-neutral-700 ${isFilteringSidebarVisible ? "translate-x-0" : "-translate-x-full"
                        } ${docked ? DOCKED : ""} ${docked ? "docked-filters" : ""} ${docked && animate ? "docked-slide" : ""}`}
                >
                    <div className={`flex flex-col h-full ${docked ? "lg:h-auto lg:max-h-[calc(100vh-var(--header-h,0px)-2rem)] lg:w-60 xl:w-72" : ""}`}>
                        {/* Header */}
                        <div className={`flex items-center justify-between p-6 border-b border-neutral-700 bg-neutral-800 ${docked ? "lg:px-5 lg:py-4" : ""}`}>
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
                            {docked && (
                                <button
                                    type="button"
                                    onClick={() => showDocked(false)}
                                    className="hidden lg:flex items-center gap-1 p-2 -mr-2 hover:bg-neutral-700 rounded-lg transition-all text-neutral-400 hover:text-white text-sm"
                                    aria-label="Sakrij filtere"
                                    title="Sakrij filtere"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                    </svg>
                                    Sakrij
                                </button>
                            )}
                            <button
                                onClick={() => toggleFilteringSidebar(false)}
                                className={`p-2 hover:bg-neutral-700 rounded-lg transition-all text-neutral-400 hover:text-white ${docked ? "lg:hidden" : ""}`}
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
                        <div className={`flex-1 min-h-0 overflow-y-auto p-6 bg-neutral-900 ${docked ? "lg:p-5" : ""}`}>
                            <div className="flex flex-col gap-8">
                                {docked && setField && setOrder && (
                                    <div className="hidden lg:flex flex-col gap-8">
                                        <Sorter
                                            field={field ?? null}
                                            order={order ?? null}
                                            setField={setField}
                                            setOrder={setOrder}
                                        />
                                        <div className="h-px bg-neutral-700"></div>
                                    </div>
                                )}
                                {!hidePriceFilter && (
                                    <>
                                        <Price
                                            priceMin={pendingPriceMin}
                                            priceMax={pendingPriceMax}
                                            setPriceMax={setPendingPriceMax}
                                            setPriceMin={setPendingPriceMin}
                                        />

                                        <div className="h-px bg-neutral-700"></div>
                                    </>
                                )}

                                {categoryAttributes && <Categories
                                    categoryAttributes={categoryAttributes}
                                    filterByProductAttributes={pendingFilterByProductAttributes}
                                    setFilterByProductAttributes={setPendingFilterByProductAttributes}
                                    categoryId={categoryId}
                                    manufacturerId={manufacturerId}
                                    priceMin={hidePriceFilter ? null : pendingPriceMin}
                                    priceMax={hidePriceFilter ? null : pendingPriceMax}
                                />}
                            </div>
                        </div>

                        {/* Footer with Apply/Reset buttons */}
                        <div className="p-4 border-t border-neutral-700 bg-neutral-800">
                            <div className="flex gap-3">
                                {/* on the docked panel the choices apply by themselves */}
                                <button
                                    onClick={applyFilters}
                                    className={`${docked ? "lg:hidden" : ""} flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white font-semibold rounded-lg transition-all`}
                                >
                                    Primijeni
                                </button>
                                <button
                                    onClick={resetFilters}
                                    className={`${docked ? "lg:flex-1" : ""} px-4 py-3 bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-500 text-white font-semibold rounded-lg transition-all`}
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

// The drawer's classes undone from lg up: a panel in the page's flow, on the
// left of the list, that sticks under the header
const DOCKED =
    "lg:sticky lg:top-[calc(var(--header-h,0px)+1rem)] lg:z-20 lg:h-auto lg:shrink-0 lg:translate-x-0 lg:transition-none lg:shadow-none lg:rounded-xl lg:overflow-hidden lg:border lg:mt-8";
// its width, open or shut, and the slide are in globals.css (.docked-filters)

export default FiltersSidebar;
