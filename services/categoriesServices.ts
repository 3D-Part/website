import { CategoryInterface } from "@/shared/interfaces/categoryInterface";

const defaultRoute = process.env.NEXT_PUBLIC_BACKEND_URL + "shop/categories";

const getAllCategories = async () => {
  try {
    const res = await fetch(`${defaultRoute}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (err) {}
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

      return data;
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
