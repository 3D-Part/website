import Container from "@/components/common/container/Container";
import { Metadata } from "next";
import SaleBulkProducts from "@/components/pages/shop/sale/SaleBulkProducts";



export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "Proizvodi na akciji — 3D Parts",
        description: "Pregled proizvoda na akciji. Sortirajte, filtrirajte i otkrijte popuste.",
        colorScheme: "dark",
        openGraph: {
            title: "Proizvodi na akciji — 3D Parts",
            description: "Pregled proizvoda na akciji. Sortirajte, filtrirajte i otkrijte popuste.",
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
            title: "Proizvodi na akciji — 3D Parts",
            description: "Pregled proizvoda na akciji. Sortirajte, filtrirajte i otkrijte popuste.",
            images: ["/assets/img/logo_social.png"],
        },
    };
};

export default async function All({ searchParams }: { searchParams: any }) {
    return (
        <div className="w-full">
            <Container className="min-h-screen p-4 lg:px-8">
                <SaleBulkProducts queryParams={searchParams} />
            </Container>
        </div>
    );
}
