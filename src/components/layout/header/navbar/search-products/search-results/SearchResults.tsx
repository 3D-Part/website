

import { ProductInterface } from "@/shared/interfaces/productsInterface";
import React from "react";
import SearchResult from "./SearchResult";
import OutsideAlerter from "@/shared/hooks/useOutsideAlerter";
import Spinner from "@/components/common/spinner/Spinner";
import SeeMoreButton from "./SeeMoreButton";
import { useAddToCart } from "@/shared/hooks/useAddToCart";

const SearchResults: React.FC<{
  products: ProductInterface[];
  loading: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  search: string;
  closeDropdown: () => void;
  addToCart: ReturnType<typeof useAddToCart>["addToCart"];
}> = ({
  products,
  loading,
  loadingMore = false,
  hasMore = false,
  onLoadMore,
  search,
  closeDropdown,
  addToCart,
}) => {
  // load the next page when the list is scrolled close to its end
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (hasMore && el.scrollTop + el.clientHeight >= el.scrollHeight - 80) {
      onLoadMore?.();
    }
  };


  return (
    <OutsideAlerter
      outsideClickHandler={() => {
        closeDropdown();
      }}
    >
      <div
        onScroll={onScroll}
        className="absolute top-0 left-0 w-full  mt-[52px] border-t border-solid rounded bg-neutral-700 max-h-80 overflow-y-auto py-4 px-2 flex flex-col gap-4 border-b-[1px]  border-neutral-600"
      >
        {loading ? (
          <Spinner />
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center w-full h-14">
            Nema proizvoda...
          </div>
        ) : (
          <>
            {products.map((product) => {
              return (
                <SearchResult
                  product={product}
                  key={product.id}
                  closeDropdown={closeDropdown}
                  addToCart={addToCart}
                />
              );
            })}

            {loadingMore && <Spinner />}

            {/* Styled like other buttons */}
            <SeeMoreButton search={search} />
          </>
        )}
      </div>
    </OutsideAlerter>
  );
};

export default SearchResults;
