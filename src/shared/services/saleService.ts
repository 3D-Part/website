import { ProductInterface } from "@/shared/interfaces/productsInterface";
import API from "../helper/api";

interface SaleProductBulkFilters {
  id?: { is: string };
  saleId?: { is: string };
}

interface SaleProductBulkSort {
  field: "name" | "price";
  order: "ASC" | "DESC";
}

interface FetchProductsOnSaleBulkParams {
  filters?: SaleProductBulkFilters;
  sort?: SaleProductBulkSort;
  offset?: number;
  limit?: number;
}

interface FetchActiveSaleProductsParams {
  saleId?: string;
  sort?: SaleProductBulkSort;
  offset?: number;
  limit?: number;
}

interface ProductsOnSaleBulkResponse {
  count: number;
  rows: { discountedPrice: string; product: ProductInterface }[];
}

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

const fetchActiveSaleProducts = async ({
  saleId,
  sort,
  offset,
  limit,
}: FetchActiveSaleProductsParams) => {
  try {
    const requestParams = {
      ...(saleId
        ? {
          filters: {
            saleId: { is: saleId },
          },
        }
        : {}),
      ...(sort ? { sort } : {}),
      ...(typeof offset === "number" ? { offset } : {}),
      ...(typeof limit === "number" ? { limit } : {}),
    };

    const response = await API.get<ProductsOnSaleBulkResponse>(
      "shop/products-on-sale-bulk",
      requestParams
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch coupons");
  }
};

const fetchProductsOnSaleBulk = async ({
  filters = {},
  sort,
  offset,
  limit,
}: FetchProductsOnSaleBulkParams): Promise<ProductsOnSaleBulkResponse> => {
  try {
    const response = await API.get<ProductsOnSaleBulkResponse>("shop/products-on-sale-bulk", {
      filters,
      sort,
      offset,
      limit,
    });

    return response;
  } catch (error) {
    throw new Error("Failed to fetch sale products");
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

export const saleService = {
  fetchActiveSale,
  fetchActiveSaleProducts,
  fetchProductsOnSaleBulk,
  fetchSale,
};
