"use client";
import { useEffect, useState } from "react";
import { userService } from "@/shared/services/userService";
import { TierInfo } from "@/shared/tiers";

/**
 * The tier percent of each product in the cart for the logged in customer,
 * by product id, as the order will charge it. A tier without categories
 * gives its discount on everything, so nothing has to be asked; a tier
 * limited to some categories is asked from the shop for these products.
 */
export const useTierDiscounts = (
  tierInfo: TierInfo | null | undefined,
  productIds: string[]
): Record<string, number> => {
  const [discounts, setDiscounts] = useState<Record<string, number>>({});
  const limited = (tierInfo?.categories?.length ?? 0) > 0;
  const key = [...productIds].sort().join(",");

  useEffect(() => {
    if (!tierInfo?.id || !limited || !key) {
      setDiscounts({});
      return;
    }
    let live = true;
    userService
      .getTierDiscounts(key.split(","))
      .then((data) => live && setDiscounts(data ?? {}))
      .catch(() => live && setDiscounts({}));
    return () => {
      live = false;
    };
  }, [tierInfo?.id, limited, key]);

  if (!tierInfo?.id) return {};
  if (!limited) {
    return Object.fromEntries(productIds.map((id) => [id, Number(tierInfo.discount) || 0]));
  }
  return discounts;
};

/** The price of one piece: the better of the sale price and the tier price, never both. */
export const tierLinePrice = (price: number, salePrice: number | null | undefined, tierDiscount = 0) => {
  const base = salePrice ? Number(salePrice) : Number(price);
  if (!(tierDiscount > 0)) return base;
  return Math.min(base, Math.round(Number(price) * (100 - tierDiscount)) / 100);
};
