import { Metadata } from "next";
import YellowStripe from "@/components/common/stripe/YellowStripe";
import Heading1 from "@/components/common/text/heading/Heading1";
import ContactModal from "@/components/layout/modals/auth-modal/ContactModal";
import Blog from "@/components/pages/landing/blog/Blog";
import ContactUs from "@/components/pages/landing/contact-us/ContactUs";
import InfoCards from "@/components/pages/landing/info-cards/InfoCards";
import ProductOffer from "@/components/pages/landing/product-offers/ProductOffer";
import ProductsBestSelling from "@/components/pages/landing/products-best-selling/ProductsBestSelling";
import ProductsRecommended from "@/components/pages/landing/products-recommended/ProductsRecommended";
import ProductsSale from "@/components/pages/landing/products-sale/ProductsSale";
import SliderServer from "@/components/pages/landing/slider/SliderServer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "3D Part",
  url: "https://www.3dpartshop.com",
  logo: "https://www.3dpartshop.com/assets/img/logo_social.png",
  image: "https://www.3dpartshop.com/assets/img/logo_social.png",
  telephone: "+387 66 684 675",
  email: "info@3dpartshop.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Blagoja Parovića 108",
    addressLocality: "Banja Luka",
    postalCode: "78000",
    addressCountry: "BA",
  },
};

export default function Home() {
  return (
    <main className="relative flex flex-col items-center min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Heading1 className="w-0 h-0 opacity-0">3D Part</Heading1>
      <YellowStripe />
      <SliderServer />
      <ContactModal />
      {/* <Commercial /> */}
      <ProductOffer />
      <ProductsRecommended />
      <ProductsSale />
      <ProductsBestSelling />
      <ContactUs />
      <Blog />
      <InfoCards />
    </main>
  );
}
