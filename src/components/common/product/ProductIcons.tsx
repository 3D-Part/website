"use client";

import {
  CUSTOM_ICON,
  DEFAULT_RIBBONS,
  ProductRibbon,
  RIBBON_ICONS,
} from "@/shared/helper/productIcons";
import { imageToAmazonURl } from "@/shared/helper/imageToAmazonUrl";
import { useAppSelector } from "@/redux/hooks";
import { settingsDataSelector } from "@/redux/slices/settings/settingsSelector";

const RibbonIcon: React.FC<{ ribbon: ProductRibbon; className: string }> = ({ ribbon, className }) => {
  if (ribbon.icon.startsWith(CUSTOM_ICON)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt=""
        className={`${className} object-contain`}
        src={imageToAmazonURl(ribbon.icon.slice(CUSTOM_ICON.length))}
      />
    );
  }
  const Icon = RIBBON_ICONS[ribbon.icon];
  return Icon ? <Icon className={className} aria-hidden /> : null;
};

/**
 * The ribbons of a product (Novo, Brza dostava...), with the name, color and
 * icon the admin gave them, in the order of the admin's list. They sit as
 * small labels in the top left corner of the product's picture, the same on
 * the card and on the product page, under the SALE label when the product is
 * on sale. Absolutely placed, so the card is as tall with them as without.
 */
const ProductIcons: React.FC<{
  icons?: string[] | null;
  limit?: number;
  // the red SALE label on top of the ribbons
  sale?: boolean;
  // "lg" on the product page's big picture (larger from the lg breakpoint)
  size?: "sm" | "lg";
}> = ({ icons, limit, sale, size = "sm" }) => {
  const settings = useAppSelector(settingsDataSelector)?.settings as
    | { productRibbons?: ProductRibbon[] }
    | undefined;
  const ribbons = Array.isArray(settings?.productRibbons) ? settings!.productRibbons : DEFAULT_RIBBONS;
  const own = new Set(icons || []);
  const shown = ribbons.filter((ribbon) => own.has(ribbon.id)).slice(0, limit);
  // pictures put on a product before there were ribbons
  const pictures = shown.length === 0 ? (icons || []).filter((id) => id.startsWith(CUSTOM_ICON)).slice(0, limit) : [];
  if (!sale && shown.length === 0 && pictures.length === 0) return null;

  const large = size === "lg";
  const label = `flex items-center gap-1.5 font-bold text-white rounded-r-lg shadow-md ${
    large ? "py-1 pl-2 pr-2.5 text-xs lg:py-1.5 lg:pl-3 lg:pr-4 lg:text-sm" : "py-1 pl-2 pr-2.5 text-xs"
  }`;

  return (
    <div
      className={`absolute left-0 z-10 flex flex-col items-start gap-1 pointer-events-none ${
        large ? "top-3" : "top-2"
      }`}
    >
      {sale && <span className={`${label} bg-error-500 tracking-wide`}>SALE</span>}
      {shown.map((ribbon) => (
        <span key={ribbon.id} title={ribbon.label} style={{ backgroundColor: ribbon.color }} className={label}>
          <RibbonIcon ribbon={ribbon} className={`${large ? "w-3.5 h-3.5 lg:w-4 lg:h-4" : "w-3.5 h-3.5"} shrink-0`} />
          {ribbon.label}
        </span>
      ))}
      {pictures.map((id) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={id}
          alt=""
          className={`object-contain p-1 bg-white rounded-r-lg shadow ${large ? "w-9 h-9" : "w-7 h-7"}`}
          src={imageToAmazonURl(id.slice(CUSTOM_ICON.length))}
        />
      ))}
    </div>
  );
};

export default ProductIcons;
