import { CouponQueryParams } from "@/shared/types";
import API from "../helper/api";

interface Coupon {
  id: string;
  code: string;
  discountPercentage: string;
  startsAt: string;
  endsAt: string;
}

const fetchCoupons = async (
  params?: CouponQueryParams
): Promise<{ count: number; rows: Coupon[] }> => {
  try {
    const response = await API.get<{ count: number; rows: Coupon[] }>(
      "shop/promotion-codes",
      {
        params,
      }
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch coupons");
  }
};

export const couponsService = { fetchCoupons };
