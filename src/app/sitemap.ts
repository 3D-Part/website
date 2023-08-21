import { MetadataRoute } from "next";
import { categoriesServices } from "../../services/categoriesServices";
import { productsServices } from "../../services/productsServices";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.3dpartshop.com";
  const allCategories = await categoriesServices.getAllCategories();
  const allProducts = await productsServices.getAllProducts({});

  const data: MetadataRoute.Sitemap = [];
  allCategories.rows.map((category) => {
    data.push({
      url: baseUrl + "/shop/category/" + category.slug,
      lastModified: new Date(category.updatedAt),
    });
  });
  allProducts.rows.map((product) => {
    data.push({
      url: baseUrl + "/shop/product/" + product.id,
      lastModified: new Date(product.updatedAt),
    });
  });

  return data;
}
