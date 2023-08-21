import Heading1 from "@/components/common/text/heading/Heading1";
import ContactUs from "@/components/pages/landing/contact-us/ContactUs";
import InfoCards from "@/components/pages/landing/info-cards/InfoCards";
import ProductsBestSelling from "@/components/pages/landing/products-best-selling/ProductsBestSelling";
import ProductsSale from "@/components/pages/landing/products-sale/ProductsSale";
import SliderServer from "@/components/pages/landing/slider/SliderServer";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center min-h-screen">
      <Heading1 className="opacity-0">3D Part</Heading1>
      <SliderServer />
      <ProductsSale />
      <ProductsBestSelling />
      <ContactUs />
      <InfoCards />
    </main>
  );
}
