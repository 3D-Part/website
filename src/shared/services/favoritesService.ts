import { ProductDataType } from "@/redux/slices/cart/cartSlice";
import API from "../helper/api";
import { ProductInterface } from "@/shared/interfaces/productsInterface";

const fetchFavorites = async (): Promise<{
  count: number;
  rows: ProductInterface[];
}> => {
  try {
    const response = await API.get<{ count: number; rows: ProductInterface[] }>(
      "shop/favorite-product"
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch coupons");
  }
};

const setFavoriteProduct = async (productId: string): Promise<any> => {
  try {
    const response = await API.post<any, any>("shop/favorite-product", {
      productId,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch coupons");
  }
};

const removeFavoriteProduct = async (productId: string): Promise<any> => {
  try {
    const response = await API.remove<any>(
      `shop/favorite-product/${productId}`,
      {}
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch coupons");
  }
};

export const favoritesService = {
  fetchFavorites,
  setFavoriteProduct,
  removeFavoriteProduct,
};
