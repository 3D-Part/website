import Container from "@/components/common/container/Container";
import { getInfoPage } from "@/shared/services/infoPages";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface InfoParams {
  params: Promise<{ slug: string }>;
}

// pages are rendered on the first visit and kept for a minute (see infoPages.ts)
export const revalidate = 60;
export const generateStaticParams = async () => [];

// metadata and the page ask once
const pageOf = cache(getInfoPage);

const shortText = (html: string, length = 160) => {
  const plain = html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  return plain.length > length ? `${plain.slice(0, length - 1).trim()}…` : plain;
};

export const generateMetadata = async (props: InfoParams): Promise<Metadata> => {
  const { slug } = await props.params;
  const page = await pageOf(slug);
  // here too, so the answer is a real 404 before the page starts streaming
  if (!page) notFound();
  const description = page.seoDescription || shortText(page.body) || page.title;
  return {
    title: page.seoTitle || page.title,
    description,
    alternates: { canonical: `/info/${page.slug}` },
    openGraph: {
      title: page.seoTitle || page.title,
      description,
      url: `/info/${page.slug}`,
    },
  };
};

export default async function InfoPageView(props: InfoParams) {
  const { slug } = await props.params;
  const page = await pageOf(slug);
  if (!page) notFound();

  return (
    <main className="w-full bg-neutral-900">
      <Container className="flex flex-col !max-w-[900px] min-h-[60vh] px-6 py-10 mx-auto lg:py-16">
        <h1 className="mb-8 text-[36px] font-semibold leading-[44px] lg:text-[48px] lg:leading-[60px]">{page.title}</h1>
        <article
          className="info-page text-lg text-neutral-300"
          // the editor's HTML, cleaned by the API when it is saved
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
      </Container>
    </main>
  );
}
