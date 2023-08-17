"use client";
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { ProductInterface } from "@/shared/interfaces/productsInterface";
import SearchResults from "@/components/layout/header/navbar/search-products/search-results/SearchResults";

interface SearchProps {
  searchIcon?: boolean;
  clearIcon?: boolean;
  value: string;
  placeholder: string;
  setValue: (value: string) => void;
  className?: string;
  text: string;
  products: ProductInterface[];
  loading: boolean;
}

const Search: React.FC<SearchProps> = ({
  value,
  clearIcon = false,
  searchIcon = false,
  setValue,
  placeholder,
  className = "",
  products,
  text,
  loading,
}) => {
  return (
    <div
      className={`relative text-neutral-200 flex items-center w-full md:w-min h-12 gap-3 px-6 py-3 bg-neutral-700 rounded-[58px] appearance-none border-primary-500 border flex-grow ${className}`}
    >
      {searchIcon && (
        <BiSearch className="text-neutral-200 min-w-[20px] min-h-[20px]" />
      )}
      <input
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
        className="w-full text-base font-normal bg-transparent outline-none"
        placeholder={placeholder}
      />
      <AnimatePresence>
        {clearIcon && value !== "" && (
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
          >
            <MdClear
              className="text-neutral-200 min-w-[20px] min-h-[20px] cursor-pointer"
              onClick={() => {
                setValue("");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {text.length >= 3 && (
        <SearchResults
          products={products}
          loading={loading}
          closeDropdown={() => {
            setValue("");
          }}
        />
      )}
    </div>
  );
};

export default Search;
