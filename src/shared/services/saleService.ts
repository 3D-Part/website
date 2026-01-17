import { ProductInterface } from "@/shared/interfaces/productsInterface";
import API from "../helper/api";

const fetchActiveSale = async () => {
  try {
    const response = await API.get<{ id?: string; endsAt: string }>(
      "shop/sale"
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

const fetchSale = async () => {
  try {
    const response = await fetch('https://api.3dpartshop.com/shop/sale', {
      headers: {
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch sale data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch sale data");
  }
};

export const saleService = { fetchActiveSale, fetchActiveSaleProducts, fetchSale };
