import Container from "@/components/common/container/Container";
import {
  CATEGORY_NOT_FOUND,
  categoriesServices,
} from "../../../../../services/categoriesServices";
import Description from "@/components/pages/shop/common/description/Description";
import CategoryProducts from "@/components/pages/shop/category/CategoryProducts";
import { Metadata } from "next";
import PageBanner from "@/components/common/page-banner/PageBanner";
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

    const description =
      data.description?.replace(/<[^>]*>/g, " ").trim().slice(0, 160) ||
      `${data.name}: pogledajte ponudu na 3D Part. Brza dostava u BiH.`;

    return {
      title: data.name,
      description,
      keywords: [data.name, `${data.name} bih`, "3d printer", "filamenti"],
      colorScheme: "dark",
      alternates: { canonical: `/shop/category/${params.slug}` },
      openGraph: {
        title: data.name,
        description,
        url: `/shop/category/${params.slug}`,
        images: [{ url: "/assets/img/logo_social.png" }],
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
        <PageBanner page={`category:${params.slug}`} />
        <Description description={categoryData.description} />
        <CategoryProducts categoryAttributes={categoryData.categoryAttributes} categoryId={categoryData.id} parameters={params} />
      </Container>
    </div>
  );
}
