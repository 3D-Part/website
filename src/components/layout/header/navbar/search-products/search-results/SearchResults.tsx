import { ProductInterface } from "@/shared/interfaces/productsInterface";
import React from "react";
import SearchResult from "./SearchResult";
import OutsideAlerter from "@/shared/hooks/useOutsideAlerter";
import Spinner from "@/components/common/spinner/Spinner";

const SearchResults: React.FC<{
  products: ProductInterface[];
  loading: boolean;
  closeDropdown: () => void;
}> = ({ products, loading, closeDropdown }) => {
  return (
    <OutsideAlerter
      outsideClickHandler={() => {
        closeDropdown();
      }}
    >
      <div className="absolute top-0 left-0 w-full  mt-[52px] border-t border-solid rounded bg-neutral-700 max-h-80 overflow-y-auto py-4 px-2 flex flex-col gap-4 border-b-[1px]  border-neutral-600">
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
                />
              );
            })}
          </>
        )}
      </div>
    </OutsideAlerter>
  );
};

export default SearchResults;
