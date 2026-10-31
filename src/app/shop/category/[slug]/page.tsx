import Container from "@/components/common/container/Container";
import {
  CATEGORY_NOT_FOUND,
  categoriesServices,
} from "../../../../../services/categoriesServices";
import Description from "@/components/pages/shop/common/description/Description";
import CategoryProducts from "@/components/pages/shop/category/CategoryProducts";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface CategoryParams {
  params: {
    slug: string;
  };
}

// Rendered on first visit, then served from cache.
export const generateStaticParams = async () => [];

export const generateMetadata = async ({
  params,
}: CategoryParams): Promise<Metadata> => {
  try {
    const data = await categoriesServices.getSingleCategoryWithSlug(
      params.slug
    );

    return {
      title: `${data.name}`,
      description: `${data.description}`,
      colorScheme: "dark",
      openGraph: {
        description: `${data.description}`,
        images: [
          {
            url: "/assets/img/logo_social.png",
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: `404 Greška - Kategorija nije pronađena`,
      description: `Kategorija nije pronađena`,
    };
  }
};

export default async function Category({ params }: CategoryParams) {
  const categoryData = await categoriesServices
    .getSingleCategoryWithSlug(params.slug)
    .catch((error: Error) => {
      // Any other failure must throw, so a cached page survives an API outage
      if (error.message === CATEGORY_NOT_FOUND) notFound();
      throw error;
    });

  return (
    <div className="w-full">
      <Container className="min-h-screen p-4 lg:px-8">
        <Description description={categoryData.description} />
        <CategoryProducts categoryAttributes={categoryData.categoryAttributes} categoryId={categoryData.id} parameters={params} />
      </Container>
    </div>
  );
}
