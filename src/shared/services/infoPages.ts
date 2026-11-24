/**
 * The info pages the staff write in the admin (/info/<slug>). Read on the
 * server and kept for a minute, so a change in the admin reaches the site
 * within a minute without asking the API on every visit.
 */
export type InfoPageLink = {
  title: string;
  slug: string;
  showInFooter: boolean;
  position: number;
  updatedAt: string;
};

export type InfoPage = InfoPageLink & {
  body: string;
  seoTitle: string | null;
  seoDescription: string | null;
};

const REVALIDATE = 60;

/** Published pages, in the footer's order; [] when the API cannot be reached. */
export const getInfoPages = async (): Promise<InfoPageLink[]> => {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!base) return [];
  try {
    const response = await fetch(`${base}shop/info-pages`, { next: { revalidate: REVALIDATE } });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data?.rows) ? data.rows : [];
  } catch {
    return [];
  }
};

export const INFO_PAGE_MISSING = "INFO_PAGE_MISSING";

/**
 * One published page; null when there is no such page or it is not published.
 * Throws when the API cannot be reached, so an outage is not cached as a 404.
 */
export const getInfoPage = async (slug: string): Promise<InfoPage | null> => {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) return null;
  const response = await fetch(`${base}shop/info-pages/${slug}`, { next: { revalidate: REVALIDATE } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`info page ${slug}: ${response.status}`);
  return response.json();
};
