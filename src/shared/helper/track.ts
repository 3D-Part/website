/**
 * Tells the shop what happens on the site, for the admin's analytics: a page
 * opened, a product viewed, a product put into the cart. Only counts per day
 * are kept, nothing about the visitor. Never blocks or breaks the page.
 */
type SiteEvent =
  | { kind: "page"; path: string }
  | { kind: "view"; productId: string }
  | { kind: "cart"; productId: string };

export const track = (event: SiteEvent) => {
  if (typeof window === "undefined") return;
  try {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}shop/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    /* analytics must never break the shop */
  }
};
