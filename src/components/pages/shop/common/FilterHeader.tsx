"use client";

import Heading2 from "@/components/common/text/heading/Heading2";
import useUiApi from "@/redux/api/useUiApi";

const FilterHeader: React.FC<{
    title: string;
    count?: number;
    className?: string;
}> = ({ title, count, className }) => {
    const { toggleFilteringSidebar } = useUiApi();

    return (
        <div className={`flex items-center justify-between my-8 w-full flex-nowrap ${className || ""}`}>
            <div className="flex-1 min-w-0">
                <Heading2 className="my-0 truncate">
                    {title} {typeof count === "number" && (
                        <span className="text-primary-500">({count})</span>
                    )}
                </Heading2>
            </div>
            <button
                type="button"
                onClick={() => toggleFilteringSidebar(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap shrink-0 ml-4"
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
            </button>
        </div>
    );
};

export default FilterHeader;
