import { CouponQueryParams } from "@/shared/types";
import API from "../helper/api";

interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  startsAt: Date;
  endsAt: Date;
}

const fetchCoupons = async (params?: CouponQueryParams): Promise<Coupon[]> => {
  try {
    const response = await API.get<Coupon[]>("shop/promotion-codes/", {
      params,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch coupons");
  }
};

export const couponsService = { fetchCoupons };
