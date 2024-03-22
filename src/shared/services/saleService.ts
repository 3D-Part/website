import { ProductInterface } from "@/shared/interfaces/productsInterface";
import API from "../helper/api";

const fetchActiveSale = async () => {
  try {
    const response = await API.get<{ id?: string; endsAt: string }>(
      "shop/sale/get-active-sale"
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch coupons");
  }
};

const fetchActiveSaleProducts = async (params: { saleId: string }) => {
  try {
    const response = await API.get<{
      count: number;
      rows: { discountedPrice: string; product: ProductInterface }[];
    }>("shop/products-on-sale-bulk", {
      params,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch coupons");
  }
};

export const saleService = { fetchActiveSale, fetchActiveSaleProducts };
