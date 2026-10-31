import Container from "@/components/common/container/Container";
import SaleProducts from "@/components/pages/shop/sale/SaleProducts";
import { Metadata } from "next";

type PageProps = {
    params: Promise<{ id: string }>;
};

// Rendered on first visit, then served from cache.
export const generateStaticParams = async () => [];

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
    const params = await props.params;
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

export default async function SaleByIdPage() {
    return (
        <div className="w-full">
            <Container className="min-h-screen p-4 lg:px-8">
                <SaleProducts />
            </Container>
        </div>
    );
}
