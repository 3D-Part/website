"use client";
import Container from "@/components/common/container/Container";
import { notFound } from "next/navigation";
import { categoriesServices } from "../../../../../services/categoriesServices";
import Description from "@/components/pages/shop/category/description/Description";
import CategoryProducts from "@/components/pages/shop/category/category-products/CategoryProducts";
import { Metadata } from "next";

interface CategoryParams {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string;
  };
}

// export const generateMetadata = async ({
//   params,
// }: CategoryParams): Promise<Metadata> => {
//   try {
//     const data = await categoriesServices.getSingleCategoryWithSlug(
//       params.slug
//     );

//     return {
//       title: `${data.name}`,
//       description: `${data.description}`,
//       colorScheme: "dark",
//       openGraph: {
//         description: `${data.description}`,
//         images: [
//           {
//             url: "/assets/img/logo_social.png",
//           },
//         ],
//       },
//     };
//   } catch (error) {
//     return {
//       title: `404 Greška - Kategorija nije pronađena`,
//       description: `Kategorija nije pronađena`,
//     };
//   }
// };

export default async function Category({ params }: CategoryParams) {
  const categoryData = await categoriesServices.getSingleCategoryWithSlug(
    params.slug
  );

  console.log(categoryData);

  return (
    <div className="w-full">
      <Container className="min-h-screen p-4 lg:px-8">
        <Description description={categoryData.description} />
        <CategoryProducts categoryId={categoryData.id} />
      </Container>
    </div>
  );
}
