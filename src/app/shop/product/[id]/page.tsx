import Container from "@/components/common/container/Container";
import AdditionalData from "@/components/pages/shop/product/additional-data/AdditionalData";
import MainData from "@/components/pages/shop/product/main-data/MainData";
import RelatedProducts from "@/components/pages/shop/product/related-products/RelatedProducts";
import Slider from "@/components/pages/shop/product/slider/Slider";
import { productsServices } from "../../../../../services/productsServices";
import { notFound } from "next/navigation";
import { isErrorObject } from "@/shared/interfaces/errorInterface";
import { Metadata } from "next";
import { getMainImage } from "@/shared/helper/getMainImage";

interface ProductParams {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params,
}: ProductParams): Promise<Metadata> => {
  const data = await productsServices.getSingleProduct(params.id);

  return {
    title: `${data.name}`,
    description: `${data.description}`,
    colorScheme: "dark",
    openGraph: {
      images:
        data.images.length > 0
          ? [getMainImage(data.images)]
          : ["/assets/img/logo_social.png"],
      description: `${data.description}`,
    },
  };
};

export default async function Product({ params }: ProductParams) {
  const data = await productsServices.getSingleProduct(params.id);

  if (isErrorObject(data)) {
    if (data.key === "NOT_FOUND_ERROR") {
      notFound();
    } else {
      // Handle other error cases if needed
    }
  }
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
      <Container className="min-h-screen px-4 lg:px-9">
        <div className="w-full  border-solid border-b border-[rgba(242,242,242,0.3)] pt-6 pb-4 lg:flex lg:gap-14  lg:pt-8 lg:pb-14">
          <div className="h-[380px] lg:h-[586px] lg:w-[586px] w-auto">
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
        <RelatedProducts categoryId={data.categoryId} productId={data.id} />
      </Container>
    </div>
  );
}
