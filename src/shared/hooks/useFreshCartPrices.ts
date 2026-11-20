"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cartProductsSelector } from "@/redux/slices/cart/cartSelectors";
import { ProductDataType, refreshCartProducts } from "@/redux/slices/cart/cartSlice";
import { getSalePrice } from "@/shared/helper/getSalePrice";

/**
 * Brings the cart up to date with the shop: the price, the sale price (only
 * of a sale running now), the stock and the name of every product in it. The
 * cart is kept in the browser and can be days old, so without this it could
 * show a price that no longer, or not yet, applies, while the order is priced
 * by the shop. Runs when the cart or the checkout opens.
 */
export const useFreshCartPrices = (when = true) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(cartProductsSelector);
  const key = products.map((product) => product.idProduct).sort().join(",");

  useEffect(() => {
    if (!when || !key) return;
    let live = true;
    const query = new URLSearchParams({ limit: "100", "filters[id][in]": key }).toString();
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}shop/products?${query}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!live || !Array.isArray(data?.rows)) return;
        const fresh: Record<string, Partial<ProductDataType>> = {};
        data.rows.forEach((product: any) => {
          fresh[product.id] = {
            name: product.name,
            price: String(product.price),
            // null clears a sale price that does not apply any more
            salePrice: getSalePrice(product),
            quantity: Number(product.quantity) || 0,
            isBackorder: !!product.isBackorder,
          };
        });
        dispatch(refreshCartProducts(fresh));
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [when, key]);
};
