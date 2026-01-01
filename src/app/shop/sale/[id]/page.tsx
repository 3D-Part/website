import Container from "@/components/common/container/Container";
import SaleProducts from "@/components/pages/shop/sale/SaleProducts";
import { Metadata } from "next";

type PageProps = {
    params: { id: string };
    searchParams: Record<string, string | string[] | undefined>;
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const id = params?.id;
    return {
        title: `Akcija ${id ? `#${id} ` : ""}— 3D Parts`,
        description:
            "Pregled proizvoda na akciji. Sortirajte, filtrirajte i otkrijte popuste.",
        openGraph: {
            title: "Akcija — 3D Parts",
            description:
                "Pregled proizvoda na akciji. Sortirajte, filtrirajte i otkrijte popuste.",
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
            title: "Akcija — 3D Parts",
            description:
                "Pregled proizvoda na akciji. Sortirajte, filtrirajte i otkrijte popuste.",
            images: ["/assets/img/logo_social.png"],
        },
    };
};

export default async function SaleByIdPage({ params }: PageProps) {
    const saleId = params.id;
    return (
        <div className="w-full">
            <Container className="min-h-screen p-4 lg:px-8">
                <SaleProducts queryParams={{ sale: saleId }} />
            </Container>
        </div>
    );
}
