"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cartProductsSelector } from "@/redux/slices/cart/cartSelectors";
import {
  ProductDataType,
  addProductWithAmount,
} from "@/redux/slices/cart/cartSlice";
import BackorderModal from "@/components/layout/modals/backorder-modal/BackorderModal";
import { track } from "@/shared/helper/track";
import { gaAddToCart, gaItem } from "@/shared/lib/gtag";

const gaCartItem = (payload: AddToCartPayload) =>
  gaItem({
    id: payload.productId,
    name: payload.productData.name,
    price: payload.productData.salePrice || payload.productData.price,
    quantity: payload.amount,
  });

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
 * user is first asked to confirm a longer delivery: the goods are on their way
 * or, for a product made to order, ordered from the supplier. Render `modal`
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
    // counted when the product goes into the cart, not when the amount grows
    if (inCart === 0) track({ kind: "cart", productId: payload.productId });
    gaAddToCart(gaCartItem(payload));
    onAdded?.();
  };

  const modal = (
    <BackorderModal
      isOpen={!!pending}
      productName={pending?.payload.productData.name || ""}
      stock={Math.max(0, pending?.payload.productData.quantity || 0)}
      requested={pending?.requested || 0}
      byOrder={!!pending?.payload.productData.isBackorder}
      onConfirm={() => {
        if (pending) {
          dispatch(addProductWithAmount(pending.payload));
          const already = cartProducts.some((product) => product.idProduct === pending.payload.productId);
          if (!already) track({ kind: "cart", productId: pending.payload.productId });
          gaAddToCart(gaCartItem(pending.payload));
          pending.onAdded?.();
        }
        setPending(null);
      }}
      onClose={() => setPending(null)}
    />
  );

  return { addToCart, modal };
};
