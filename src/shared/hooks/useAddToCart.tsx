"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cartProductsSelector } from "@/redux/slices/cart/cartSelectors";
import {
  ProductDataType,
  addProductWithAmount,
} from "@/redux/slices/cart/cartSlice";
import BackorderModal from "@/components/layout/modals/backorder-modal/BackorderModal";

type AddToCartPayload = {
  productId: string;
  amount: number;
  productData: ProductDataType;
  shouldNotify: boolean;
};

type Pending = {
  payload: AddToCartPayload;
  requested: number;
  onAdded?: () => void;
};

/**
 * Adds a product to the cart. When the addition goes above the stock level the
 * user is first asked to confirm a backorder (longer delivery). Render `modal`
 * next to the button that calls `addToCart`.
 */
export const useAddToCart = () => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(cartProductsSelector);
  const [pending, setPending] = useState<Pending | null>(null);

  const addToCart = (payload: AddToCartPayload, onAdded?: () => void) => {
    const inCart =
      cartProducts.find((product) => product.idProduct === payload.productId)
        ?.amount || 0;
    const stock = Math.max(0, payload.productData.quantity);
    const requested = inCart + payload.amount;

    // ask only when this addition crosses the stock level, not on every click
    // after the user already agreed
    if (requested > stock && inCart <= stock) {
      setPending({ payload, requested, onAdded });
      return;
    }

    dispatch(addProductWithAmount(payload));
    onAdded?.();
  };

  const modal = (
    <BackorderModal
      isOpen={!!pending}
      productName={pending?.payload.productData.name || ""}
      stock={Math.max(0, pending?.payload.productData.quantity || 0)}
      requested={pending?.requested || 0}
      onConfirm={() => {
        if (pending) {
          dispatch(addProductWithAmount(pending.payload));
          pending.onAdded?.();
        }
        setPending(null);
      }}
      onClose={() => setPending(null)}
    />
  );

  return { addToCart, modal };
};
