import Container from "@/components/common/container/Container";
import AdditionalData from "@/components/pages/shop/product/additional-data/AdditionalData";
import MainData from "@/components/pages/shop/product/main-data/MainData";
import RelatedProducts from "@/components/pages/shop/product/related-products/RelatedProducts";
import Slider from "@/components/pages/shop/product/slider/Slider";
import { productsServices } from "../../../../../services/productsServices";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getMainImage } from "@/shared/helper/getMainImage";
import { Product, WithContext } from "schema-dts";
import FavoriteButton from "@/components/common/product/FavoriteButton";
import { useEffect } from "react";
import Ribbon from "@/components/common/ribbon/ribbon";

interface ProductParams {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params,
}: ProductParams): Promise<Metadata> => {
  try {
    const data = await productsServices.getSingleProduct(params.id);

    return {
      title: `${data.name}`,
      keywords: ` ${data.description} ${data.name}`,

      description: `${data.description}`,
      colorScheme: "dark",
      openGraph: {
        images:
          data.images.length > 0
            ? [getMainImage(data.images)]
            : ["/assets/img/logo_social.png"],
      },
    };
  } catch (error) {
    return {
      title: `404 Greška - Proizvod nije pronađen`,
      description: `Proizvod nije pronađen`,
    };
  }
};

export default async function ProductPage({ params }: ProductParams) {
  try {
    const data = await productsServices.getSingleProduct(params.id);

    const jsonLd: WithContext<Product> = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: data.name,
      image: getMainImage(data.images),
      description: data.description,
    };

    const similarProductsData = await productsServices.getAllProducts({
      sku: data.sku,
    });

    data.images.forEach((img, i) => {
      if (img.isMain) {
        const temp = data.images[0];
        data.images[0] = data.images[i];
        data.images[i] = temp;
      }
    });

    return (
      <div className="w-full">
        {/* Add JSON-LD to your page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Container className="min-h-screen px-4 lg:px-9">
          <div className="w-full  border-solid border-b border-[rgba(242,242,242,0.3)] pt-6 pb-4 lg:flex lg:gap-14  lg:pt-8 lg:pb-14">
            <div className="h-[380px] lg:h-[586px] lg:w-[586px] w-auto relative">

              {data.productOnSale.length > 0 && <Ribbon text="SALE" background="bg-error-500" />}

              <FavoriteButton productId={data.id} />
              <Slider images={data.images} name={data.name} />
            </div>
            <MainData
              productData={data}
              similarProducts={similarProductsData.rows}
            />
          </div>

          <AdditionalData
            detailedDescription={data.details}
            productsAttributes={data.productAttributes}
          />
          <RelatedProducts
            categoryId={data.categoryId}
            productId={data.id}
            productSku={data.sku}
          />
        </Container>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
