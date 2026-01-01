import Container from "@/components/common/container/Container";
import Description from "@/components/pages/shop/common/description/Description";
import CategoryProducts from "@/components/pages/shop/category/CategoryProducts";
import { Metadata } from "next";
import AllProducts from "@/components/pages/shop/sale/SaleProducts";
import SaleProducts from "@/components/pages/shop/sale/SaleProducts";



export const generateMetadata = async (): Promise<Metadata> => {
    // Hardcoded metadata for the "All products" page
    return {
        title: "Svi proizvodi — 3D Parts",
        description: "Pregled svih 3D proizvoda i pribora — filament, rezervni dijelovi i oprema. Pregledajte ponudu, sortirajte i filtrirajte proizvode.",
        colorScheme: "dark",
        openGraph: {
            title: "Svi proizvodi — 3D Parts",
            description: "Pregled svih 3D proizvoda i pribora — filament, rezervni dijelovi i oprema.",
            images: [
                {
                    url: "/assets/img/logo_social.png",
                    width: 1200,
                    height: 630,
                    alt: "3D Parts",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "Svi proizvodi — 3D Parts",
            description: "Pregled svih 3D proizvoda i pribora — filament, rezervni dijelovi i oprema.",
            images: ["/assets/img/logo_social.png"],
        },
    };
};

export default async function All({ searchParams }: { searchParams: any }) {
    return (
        <div className="w-full">
            <Container className="min-h-screen p-4 lg:px-8">
                <></>
            </Container>
        </div>
    );
}
