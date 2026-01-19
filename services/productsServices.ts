import { ProductInterface } from "@/shared/interfaces/productsInterface";

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
  search,
  field,
  manufacturerId,
  filterByProductAttributes,
  limit,
  offset
}: {
  slug?: string;
  attributeId?: string;
  nameLike?: string;
  categoryNameLike?: string;
  categoryId?: string;
  filterByProductAttributes?: Record<string, any> | string | undefined;
  price?: { gt: number | null; lt: number | null };
  sku?: string;
  search?: string | null;
  field?: "name" | "price" | null;
  order?: "ASC" | "DESC" | null;
  manufacturerId?: string | null;
  limit?: number;
  offset?: number;
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

  if (search) {
    payload["filters[name][like]"] = "%" + search + "%";
  }

  // support category name filter (partial match)
  if (categoryNameLike) {
    payload["filters[category.name][like]"] = "%" + categoryNameLike + "%";
  }

  // handle complex product attribute filters passed as an array or JSON string
  if (filterByProductAttributes) {
    let attrs: any = filterByProductAttributes;

    if (typeof attrs === "string") {
      try {
        attrs = JSON.parse(attrs);
      } catch {
        // if it's not JSON, skip parsing and ignore
        attrs = null;
      }
    }

    // If attrs is an array, convert each attribute filter to separate query parameters
    if (Array.isArray(attrs) && attrs.length > 0) {
      attrs.forEach((attr: any) => {
        if (attr.attributeId) {
          payload["filters[attributes][attributeId]"] = attr.attributeId;

          // Add the appropriate operator parameter
          if (attr.value !== undefined) {
            payload["filters[attributes][value]"] = attr.value;
          }
          if (attr.like !== undefined) {
            payload["filters[attributes][like]"] = attr.like;
          }
          if (attr.gt !== undefined) {
            payload["filters[attributes][gt]"] = attr.gt;
          }
          if (attr.lt !== undefined) {
            payload["filters[attributes][lt]"] = attr.lt;
          }
          if (attr.is !== undefined) {
            payload["filters[attributes][is]"] = attr.is;
          }
        }
      });
    }
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

  if (offset) {
    payload["offset"] = offset;
  }

  if (limit) {
    payload["limit"] = limit;
  }

  const params = new URLSearchParams({ ...payload }).toString();
  /////////

  try {
    const res = await fetch(`${defaultRoute}?${params}`, {
      method: "GET",
      cache: "no-store",
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
      cache: "no-store",
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
  const payload: any = {};

  try {
    const res = await fetch(`${defaultRoute}/recommended`, {
      method: "GET",
      cache: "no-store",
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

const getMostSold = async (): Promise<ProductPaginatedInterface> => {
  const payload: any = {};

  payload["filters[isMostSold][is]"] = true;

  const params = new URLSearchParams({ ...payload }).toString();

  try {
    const res = await fetch(`${defaultRoute}?${params}`, {
      method: "GET",
      cache: "no-store",
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
  getMostSold,
};
