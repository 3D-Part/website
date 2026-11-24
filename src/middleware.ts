import { NextRequest, NextResponse } from "next/server";

/**
 * An unknown or unpublished info page answers with a real 404 status. The
 * page itself (app/info/[slug]) shows the not-found page too, but by then the
 * site's loading screen has already been sent with 200. The list of published
 * pages is asked for at most once a minute; when it cannot be had, the page
 * decides alone.
 */
const FRESH_MS = 60_000;
let published: { slugs: Set<string>; at: number } | null = null;

const publishedSlugs = async (): Promise<Set<string> | null> => {
  if (published && Date.now() - published.at < FRESH_MS) return published.slugs;
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!base) return null;
  try {
    const response = await fetch(`${base}shop/info-pages`, { cache: "no-store" });
    if (!response.ok) return published?.slugs ?? null;
    const data = await response.json();
    const slugs = new Set<string>(
      (Array.isArray(data?.rows) ? data.rows : []).map((page: { slug: string }) => page.slug)
    );
    published = { slugs, at: Date.now() };
    return slugs;
  } catch {
    return published?.slugs ?? null;
  }
};

export async function middleware(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2] ?? "";
  const slugs = await publishedSlugs();
  if (slugs && !slugs.has(decodeURIComponent(slug))) {
    // no route has this address, so Next answers with its not-found page and 404
    return NextResponse.rewrite(new URL("/info-page-not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/info/:slug"],
};
