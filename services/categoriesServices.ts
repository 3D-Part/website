import { CategoryInterface } from "@/shared/interfaces/categoryInterface";
import { IProductAttribute } from "@/shared/types";
import { get } from "http";

const RAW_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
if (!RAW_BASE) {
  throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
}
// Trim trailing slashes, then add exactly one.
const API_BASE = RAW_BASE.replace(/\/+$/, "");
const defaultRoute = `${API_BASE}/shop/categories`;
const attributesRoute = `${API_BASE}/shop/category-attributes`;


export interface CategoriesPaginatedInterface {
  count: number;
  rows: CategoryInterface[];
}

export interface ProductAttributePaginatedInterface {
  count: number;
  rows: IProductAttribute[];
}

const getAllCategories = async (): Promise<CategoriesPaginatedInterface> => {
  try {
    const res = await fetch(`${defaultRoute}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    if ("key" in data && "message" in data) {
      // Error response
      throw new Error(data.message);
    } else {
      // Success response
      return data as CategoriesPaginatedInterface;
    }
  } catch (err) {
    throw err;
  }
};

const getAllProductAttributes = async (): Promise<ProductAttributePaginatedInterface> => {
  try {
    const res = await fetch(`${attributesRoute}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    if ("key" in data && "message" in data) {
      // Error response
      throw new Error(data.message);
    } else {
      // Success response
      return data as ProductAttributePaginatedInterface;
    }
  } catch (err) {
    throw err;
  }
};

const getSingleCategory = async (id: string) => {
  try {
    const res = await fetch(`${defaultRoute}/${id}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (err) { }
};

const getSingleCategoryWithSlug = async (
  slug: string
): Promise<CategoryInterface> => {
  try {
    const res = await fetch(`${defaultRoute}/slug/${slug}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();

    if ("key" in data && "message" in data) {
      // Error response

      throw new Error(data.message);
    } else {
      // Success response
      return data as CategoryInterface;
    }
  } catch (err) {
    throw err;
  }
};

export const categoriesServices = {
  getAllCategories,
  getSingleCategory,
  getAllProductAttributes,
  getSingleCategoryWithSlug,
};
