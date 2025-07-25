import { CategoryInterface } from "@/shared/interfaces/categoryInterface";

const defaultRoute = process.env.NEXT_PUBLIC_BACKEND_URL + "shop/categories";

export interface CategoriesPaginatedInterface {
  count: number;
  rows: CategoryInterface[];
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

const getSingleCategory = async (id: string) => {
  try {
    const res = await fetch(`${defaultRoute}/${id}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (err) {}
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
  getSingleCategoryWithSlug,
};
