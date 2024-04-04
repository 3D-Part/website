import { useAppSelector } from "@/redux/hooks";
import { favoriteProductsSelector } from "@/redux/slices/ui/uiSelectors";
import Link from "next/link";
import React from "react";
import { RiHeart3Line } from "react-icons/ri";

const FavoritesIcon = () => {
  const favoriteProducts = useAppSelector(favoriteProductsSelector);
  return (
    <Link className="relative cursor-pointer" href={"/favorites"} prefetch>
      <RiHeart3Line className="w-7 h-7" />
      <div
        className={`text-white ${
          favoriteProducts.length > 0 ? "bg-primary-500" : "bg-neutral-500"
        } w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-exo2 font-normal absolute top-[-6px] right-[-8px]`}
      >
        {favoriteProducts.length}
      </div>
    </Link>
  );
};

export default FavoritesIcon;
