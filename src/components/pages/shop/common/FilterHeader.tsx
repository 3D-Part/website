"use client";

import Heading2 from "@/components/common/text/heading/Heading2";
import useUiApi from "@/redux/api/useUiApi";
import Sorter from "./filters/sorter/Sorter";
import { useDockedFiltersHidden } from "./dockedFilters";

type Sort = {
    field: "name" | "price" | null;
    order: "ASC" | "DESC" | null;
    setField: (x: "name" | "price" | null) => void;
    setOrder: (x: "ASC" | "DESC" | null) => void;
};

const FilterHeader: React.FC<{
    title: string;
    count?: number;
    className?: string;
    showFilters?: boolean;
    // how many filters are on, shown on the button
    activeCount?: number;
    // the sorting, next to the Filteri button; on phones it takes the title's place
    sort?: Sort;
    // the filters panel is docked on the left from lg up (FiltersSidebar
    // docked): the sorting and the Filteri button are there, so here only the
    // title; below lg this bar sticks under the header to stay at hand
    docked?: boolean;
}> = ({ title, count, className, showFilters = true, activeCount = 0, sort, docked }) => {
    const { toggleFilteringSidebar } = useUiApi();
    const { hidden: dockedHidden } = useDockedFiltersHidden();
    const sticky = docked && (sort || showFilters);
    // with the docked panel hidden the sorting stays here on a desktop too; the
    // panel opens again from the tab on the left edge (FiltersSidebar)
    const onDesktop = docked && !dockedHidden ? "lg:hidden" : "";

    return (
        <div
            className={`flex items-center justify-between gap-3 flex-nowrap ${
                sticky
                    ? "sticky top-[var(--header-h,0px)] z-30 -mx-4 px-4 py-3 my-4 bg-[rgba(10,10,10,0.94)] backdrop-blur-[14px] lg:static lg:mx-0 lg:px-0 lg:py-0 lg:my-8 lg:bg-transparent lg:backdrop-blur-none"
                    : "my-8 w-full"
            } ${className || ""}`}
        >
            <div className={`flex-1 min-w-0 ${sort ? `hidden md:block` : ""}`}>
                <Heading2 className="my-0 truncate">
                    {title} {typeof count === "number" && (
                        <span className="text-primary-500">({count})</span>
                    )}
                </Heading2>
            </div>
            {sort && (
                <div className={`flex-1 min-w-0 md:flex-none ${onDesktop}`}>
                    <Sorter {...sort} compact />
                </div>
            )}
            {showFilters && (
                <button
                    type="button"
                    onClick={() => toggleFilteringSidebar(true)}
                    className={`flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap shrink-0 ${docked ? "lg:hidden" : ""}`}
                >
                    <svg
                        className="w-5 h-5"
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
                    {activeCount > 0 && (
                        <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-xs font-bold bg-white rounded-full text-primary-600">
                            {activeCount}
                        </span>
                    )}
                </button>)}
        </div>
    );
};

export default FilterHeader;
