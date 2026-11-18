/**
 * The active sale price of a product, or null. Lists either set `salePrice`
 * themselves or pass the product as the API sends it, where `productOnSale`
 * holds only active sales, cheapest first. Every product card reads the price
 * through here, so the same product shows the same price everywhere.
 */
export const getSalePrice = (product: {
  salePrice?: string | number | null;
  productOnSale?: { discountedPrice: string | number }[] | null;
}): string | null => {
  const price = product.salePrice ?? product.productOnSale?.[0]?.discountedPrice;
  return price === undefined || price === null || price === "" ? null : String(price);
};
