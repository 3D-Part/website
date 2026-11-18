// The GA4 property of the shop. It used to load through the Tag Manager
// container GTM-KLWJ7QZV, whose only tag was this same GA4 tag.
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-MGWTHBS08V";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type GaItem = {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  item_category?: string;
  item_brand?: string;
};

const send = (...args: unknown[]) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag(...args);
  } catch {
    /* analytics must never break the shop */
  }
};

const money = (value: unknown) => Math.round((Number(value) || 0) * 100) / 100;

/** A product as GA4 e-commerce reports expect it. */
export const gaItem = ({
  id,
  name,
  price,
  quantity = 1,
  category,
  brand,
}: {
  id: string;
  name: string;
  price: unknown;
  quantity?: number;
  category?: string;
  brand?: string;
}): GaItem => ({
  item_id: id,
  item_name: name,
  price: money(price),
  quantity,
  ...(category ? { item_category: category } : {}),
  ...(brand ? { item_brand: brand } : {}),
});

const ecommerce = (name: string, items: GaItem[], extra: Record<string, unknown> = {}) =>
  send("event", name, {
    currency: "BAM",
    value: money(items.reduce((sum, item) => sum + item.price * item.quantity, 0)),
    items,
    ...extra,
  });

export const gaViewItem = (item: GaItem) => ecommerce("view_item", [item]);
export const gaAddToCart = (item: GaItem) => ecommerce("add_to_cart", [item]);
export const gaBeginCheckout = (items: GaItem[]) => ecommerce("begin_checkout", items);
export const gaPurchase = (
  items: GaItem[],
  { transactionId, value, shipping }: { transactionId?: string; value?: unknown; shipping?: unknown }
) =>
  ecommerce("purchase", items, {
    transaction_id: transactionId,
    ...(value !== undefined ? { value: money(value) } : {}),
    ...(shipping !== undefined ? { shipping: money(shipping) } : {}),
  });
