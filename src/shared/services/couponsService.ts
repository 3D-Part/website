import { CouponType, CouponQueryParams } from "@/shared/types";
import API from "../helper/api";

const fetchCoupons = async (
  params?: CouponQueryParams
): Promise<{ count: number; rows: CouponType[] }> => {
  try {
    const response = await API.get<{ count: number; rows: CouponType[] }>(
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
