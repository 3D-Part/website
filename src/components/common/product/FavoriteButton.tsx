"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isProductFavoriteSelector } from "@/redux/slices/ui/uiSelectors";
import {
  changeIsGlobalLoading,
  changeSingleFavoriteProduct,
} from "@/redux/slices/ui/uiSlice";
import { favoritesService } from "@/shared/services/favoritesService";
import { useSession } from "next-auth/react";
import React, { FC } from "react";
import { RiHeart3Line } from "react-icons/ri";
import { RiHeart3Fill } from "react-icons/ri";

const FavoriteButton: FC<{ productId: string }> = ({ productId }) => {
  const { data: session } = useSession();

  const isFavorite = useAppSelector((state) =>
    isProductFavoriteSelector(state, productId)
  );
  const dispatch = useAppDispatch();

  const clickHandler = async () => {
    dispatch(changeIsGlobalLoading(true));
    // --

    try {
      if (isFavorite) {
        favoritesService.removeFavoriteProduct(productId);
      } else {
        favoritesService.setFavoriteProduct(productId);
      }
      dispatch(
        changeSingleFavoriteProduct({
          id: productId,
          isFavorite: !isFavorite,
        })
      );
    } catch (error) {}

    // --
    dispatch(changeIsGlobalLoading(false));
  };

  return (
    <>
      {session?.user && session && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            clickHandler();
          }}
          className="absolute z-30 flex items-center justify-center w-8 h-8 rounded-full cursor-pointer top-1 right-1 bg-neutral-500 group "
        >
          {isFavorite ? (
            <RiHeart3Fill className="w-5 h-5 transition-all duration-300 ease-in-out group-hover:scale-[1.2]" />
          ) : (
            <RiHeart3Line className="w-5 h-5 transition-all duration-300 ease-in-out group-hover:scale-[1.2]" />
          )}
        </div>
      )}
    </>
  );
};

export default FavoriteButton;
