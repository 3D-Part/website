import Container from "@/components/common/container/Container";
import AdditionalData from "@/components/pages/shop/product/additional-data/AdditionalData";
import MainData from "@/components/pages/shop/product/main-data/MainData";
import RelatedProducts from "@/components/pages/shop/product/related-products/RelatedProducts";
import Slider from "@/components/pages/shop/product/slider/Slider";
import {
  PRODUCT_NOT_FOUND,
  productsServices,
} from "../../../../../services/productsServices";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getMainImage } from "@/shared/helper/getMainImage";
import { Product, WithContext } from "schema-dts";
import FavoriteButton from "@/components/common/product/FavoriteButton";
import Ribbon from "@/components/common/ribbon/ribbon";

const BASE_URL = "https://www.3dpartshop.com";

const absoluteUrl = (url: string) =>
  url.startsWith("http") ? url : `${BASE_URL}${url}`;

const shortText = (text: string, length = 160) => {
  const plain = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return plain.length > length ? `${plain.slice(0, length - 1).trim()}…` : plain;
};

interface ProductParams {
  params: {
    id: string;
  };
}

// Rendered on first visit, then served from cache.
export const generateStaticParams = async () => [];

export const generateMetadata = async ({
  params,
}: ProductParams): Promise<Metadata> => {
  try {
    const data = await productsServices.getSingleProduct(params.id);

    const image = absoluteUrl(
      data.images.length > 0
        ? getMainImage(data.images)
        : "/assets/img/logo_social.png"
    );
    const description = shortText(
      data.description ||
        `${data.name} po povoljnoj cijeni uz brzu dostavu u BiH. Naručite na 3D Part.`
    );

    return {
      title: data.name,
      description,
      keywords: [
        data.name,
        data.manufacturer?.name,
        data.category?.name,
        ...(data.keywords || []),
      ].filter(Boolean) as string[],
      colorScheme: "dark",
      alternates: { canonical: `/shop/product/${params.id}` },
      openGraph: {
        title: data.name,
        description,
        url: `/shop/product/${params.id}`,
        images: [image],
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

    const saleOffer = data.productOnSale?.[0]?.discountedPrice;
    const jsonLd: WithContext<Product> = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: data.name,
      image: absoluteUrl(getMainImage(data.images)),
      description: shortText(data.description || data.name, 5000),
      sku: data.sku,
      ...(data.manufacturer?.name
        ? { brand: { "@type": "Brand", name: data.manufacturer.name } }
        : {}),
      ...(data.category?.name ? { category: data.category.name } : {}),
      offers: {
        "@type": "Offer",
        url: `${BASE_URL}/shop/product/${data.id}`,
        priceCurrency: "BAM",
        price: Number(saleOffer ?? data.price).toFixed(2),
        itemCondition: "https://schema.org/NewCondition",
        availability: data.isBackorder
          ? "https://schema.org/PreOrder"
          : data.quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
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
    // A cached 404 would hide the product until the next revalidation, so only
    // a missing product becomes one. Throwing keeps the last good page.
    if ((error as Error).message === PRODUCT_NOT_FOUND) notFound();
    throw error;
  }
}
