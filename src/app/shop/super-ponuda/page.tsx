import Container from "@/components/common/container/Container";
import { Metadata } from "next";
import PageBanner from "@/components/common/page-banner/PageBanner";
import RecommendedProducts from "@/components/pages/shop/recommended/RecommendedProducts";

const title = "Super ponuda — 3D Parts";
const description = "Izdvojeni proizvodi iz naše ponude: filamenti, printeri, rezervni dijelovi i oprema.";

export const generateMetadata = async (): Promise<Metadata> => ({
  title,
  description,
  alternates: { canonical: "/shop/super-ponuda" },
  openGraph: {
    title,
    description,
    images: [{ url: "/assets/img/logo_social.png", width: 1200, height: 630, alt: "3D Parts" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/img/logo_social.png"],
  },
});

export default function SuperPonuda() {
  return (
    <div className="w-full">
      <Container className="min-h-screen p-4 lg:px-8">
        <PageBanner page="super-ponuda" />
        <RecommendedProducts />
      </Container>
    </div>
  );
}
