import { ProductInterface } from "@/shared/interfaces/productsInterface";
import { revalidateTime } from "./setup";

const defaultRoute = process.env.NEXT_PUBLIC_BACKEND_URL + "shop/products";

export interface ProductPaginatedInterface {
  count: number;
  rows: ProductInterface[];
}

const getAllProducts = async ({
  slug,
  attributeId,
  nameLike,
  categoryNameLike,
  categoryId,
  price,
  sku,
  order,
  field,
  manufacturerId,
}: {
  slug?: string;
  attributeId?: string;
  nameLike?: string;
  categoryNameLike?: string;
  categoryId?: string;
  price?: { gt: number | null; lt: number | null };
  sku?: string;
  field?: "name" | "price" | null;
  order?: "ASC" | "DESC" | null;
  manufacturerId?: string | null;
}): Promise<ProductPaginatedInterface> => {
  const payload: any = {};

  if (slug !== undefined) {
    payload["filters[category.slug][is]"] = slug;
  }
  if (categoryId !== undefined) {
    payload["filters[categoryId][is]"] = categoryId;
  }

  if (price && price.gt !== null) {
    payload["filters[price][gt]"] = price.gt - 0.00000000001;
  }

  if (price && price.lt !== null) {
    payload["filters[price][lt]"] = price.lt + 0.00000000001;
  }

  if (nameLike) {
    payload["filters[name][like]"] = "%" + nameLike + "%";
  }

  if (sku !== undefined) {
    payload["filters[sku][is]"] = sku;
  }

  if (field) {
    payload["sort[field]"] = field;
  }

  if (order) {
    payload["sort[order]"] = order;
  }

  if (manufacturerId) {
    payload["filters[manufacturer.id][is]"] = manufacturerId;
  }

  const params = new URLSearchParams({ ...payload }).toString();
  /////////

  try {
    const res = await fetch(`${defaultRoute}?${params}`, {
      method: "GET",
      next: { revalidate: revalidateTime },
    });
    const data = await res.json();

    // Success response
    return data as ProductPaginatedInterface;
  } catch (err) {
    throw err;
  }
};

const getSingleProduct = async (id: string): Promise<ProductInterface> => {
  try {
    const res = await fetch(`${defaultRoute}/${id}`, {
      method: "GET",
      next: { revalidate: revalidateTime },
    });

    const data = await res.json();

    if ("key" in data && "message" in data) {
      // Error response
      throw new Error(data.message);
    } else {
      // Success response
      return data as ProductInterface;
    }
  } catch (err) {
    throw err;
  }
};

const getRecommended = async (): Promise<ProductPaginatedInterface> => {
  try {
    const res = await fetch(`${defaultRoute}`, {
      method: "GET",
      next: { revalidate: revalidateTime },
    });
    const data = await res.json();
    if ("key" in data && "message" in data) {
      // Error response
      throw new Error(data.message);
    } else {
      // Success response
      return data as ProductPaginatedInterface;
    }
  } catch (err) {
    throw err;
  }
};

export const productsServices = {
  getAllProducts,
  getSingleProduct,
  getRecommended,
};
