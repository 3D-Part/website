import axiosInstance from "@/shared/helper/axiosInstance";
import { CouponQueryParams } from "@/shared/types";

interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  startsAt: Date;
  endsAt: Date;
}

const fetchCoupons = async (params?: CouponQueryParams): Promise<Coupon[]> => {
  try {
    const response = await axiosInstance.get("shop/promotion-codes/", {
      params,
    });
    return response.data.rows as Coupon[];
  } catch (error) {
    throw new Error("Failed to fetch coupons");
  }
};

export const couponsService = { fetchCoupons };
