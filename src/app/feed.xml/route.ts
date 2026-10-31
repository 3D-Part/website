import { productsServices } from "../../../services/productsServices";
import { getMainImage } from "@/shared/helper/getMainImage";

export const revalidate = 3600;

const BASE_URL = "https://www.3dpartshop.com";

const xml = (value: unknown) =>
  String(value ?? "").replace(
    /[<>&'"]/g,
    (char) =>
      ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[
        char
      ] as string)
  );

// Product feed for Google Merchant Center
export async function GET() {
  const { rows } = await productsServices.getAllProducts({});

  const items = rows
    .filter((product) => product.images?.length > 0 && Number(product.price) > 0)
    .map((product) => {
      const salePrice = product.productOnSale?.[0]?.discountedPrice;
      const available = product.quantity > 0 || (product as any).isBackorder;
      return `<item>
<g:id>${xml(product.id)}</g:id>
<g:title>${xml(product.name)}</g:title>
<g:description>${xml(product.description || product.name)}</g:description>
<g:link>${BASE_URL}/shop/product/${xml(product.id)}</g:link>
<g:image_link>${xml(getMainImage(product.images))}</g:image_link>
<g:price>${Number(product.price).toFixed(2)} BAM</g:price>
${salePrice ? `<g:sale_price>${Number(salePrice).toFixed(2)} BAM</g:sale_price>` : ""}
<g:availability>${available ? "in_stock" : "out_of_stock"}</g:availability>
<g:condition>new</g:condition>
<g:identifier_exists>no</g:identifier_exists>
${product.sku ? `<g:mpn>${xml(product.sku)}</g:mpn>` : ""}
${product.manufacturer?.name ? `<g:brand>${xml(product.manufacturer.name)}</g:brand>` : ""}
${product.category?.name ? `<g:product_type>${xml(product.category.name)}</g:product_type>` : ""}
</item>`;
    })
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>3D Part</title>
<link>${BASE_URL}</link>
<description>3D printeri, filamenti i dijelovi</description>
${items}
</channel>
</rss>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  );
}
