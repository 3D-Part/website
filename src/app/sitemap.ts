import { MetadataRoute } from "next";
import { categoriesServices } from "../../services/categoriesServices";
import { productsServices } from "../../services/productsServices";
import { getInfoPages } from "@/shared/services/infoPages";

// Kept for a day like the pages, and made again when the API says something
// changed. A slow API must not break the build (Next gives a page 60 seconds):
// what does not come in time is left out until the next refresh.
export const revalidate = 86400;
export const maxDuration = 60;

const WAIT_MS = 40_000;

const inTime = async <T,>(work: Promise<T>, empty: T, what: string): Promise<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      work,
      new Promise<T>((resolve) => {
        timer = setTimeout(() => {
          console.warn(`sitemap: ${what} did not come in time, left out until the next refresh`);
          resolve(empty);
        }, WAIT_MS);
      }),
    ]);
  } catch (error) {
    console.warn(`sitemap: ${what} failed`, error);
    return empty;
  } finally {
    clearTimeout(timer);
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.3dpartshop.com";
  const [allCategories, allProducts, infoPages] = await Promise.all([
    inTime(categoriesServices.getAllCategories(), { rows: [], count: 0 } as any, "categories"),
    inTime(productsServices.getAllProducts({}), { rows: [], count: 0 } as any, "products"),
    inTime(getInfoPages(), [] as Awaited<ReturnType<typeof getInfoPages>>, "info pages"),
  ]);

  const data: MetadataRoute.Sitemap = ["", "/shop/all", "/shop/sale", "/shop/super-ponuda"].map(
    (path) => ({ url: baseUrl + path, lastModified: new Date() })
  );
  allCategories.rows.forEach((category: { slug: string; updatedAt: string }) => {
    data.push({
      url: baseUrl + "/shop/category/" + category.slug,
      lastModified: new Date(category.updatedAt),
    });
  });
  allProducts.rows.forEach((product: { id: string; updatedAt: string }) => {
    data.push({
      url: baseUrl + "/shop/product/" + product.id,
      lastModified: new Date(product.updatedAt),
    });
  });
  infoPages.forEach((page) => {
    data.push({
      url: baseUrl + "/info/" + page.slug,
      lastModified: new Date(page.updatedAt),
    });
  });

  return data;
}
