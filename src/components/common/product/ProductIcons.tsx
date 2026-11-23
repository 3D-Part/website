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
 * The ribbons of a product (Novo, Najprodavanije...), with the name, color and
 * icon the admin gave them, in the order of the admin's list.
 */
const ProductIcons: React.FC<{
  icons?: string[] | null;
  limit?: number;
  // "ribbon": on the corner of the product picture, out of the flow of the card
  variant?: "pills" | "ribbon";
}> = ({ icons, limit, variant = "pills" }) => {
  const settings = useAppSelector(settingsDataSelector)?.settings as
    | { productRibbons?: ProductRibbon[] }
    | undefined;
  const ribbons = Array.isArray(settings?.productRibbons) ? settings!.productRibbons : DEFAULT_RIBBONS;
  const own = new Set(icons || []);
  const shown = ribbons.filter((ribbon) => own.has(ribbon.id)).slice(0, limit);
  // pictures put on a product before there were ribbons
  const pictures = (icons || []).filter((id) => id.startsWith(CUSTOM_ICON));
  if (shown.length === 0 && pictures.length === 0) return null;

  if (variant === "ribbon") {
    // Absolutely placed at the left edge of the picture, so the card is as tall
    // with it as without it and nothing else in the card moves.
    return (
      <div className="absolute left-0 z-10 flex flex-col items-start gap-1 pointer-events-none bottom-3">
        {shown.map((ribbon) => (
          <span
            key={ribbon.id}
            title={ribbon.label}
            style={{ backgroundColor: ribbon.color }}
            className="flex items-center gap-1 py-1 pl-2 pr-3 text-xs font-bold text-white rounded-r-lg shadow"
          >
            <RibbonIcon ribbon={ribbon} className="w-3.5 h-3.5 shrink-0" />
            {ribbon.label}
          </span>
        ))}
        {shown.length === 0 &&
          pictures.slice(0, limit).map((id) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={id}
              alt=""
              className="object-contain w-7 h-7 p-1 bg-white rounded-r-lg shadow"
              src={imageToAmazonURl(id.slice(CUSTOM_ICON.length))}
            />
          ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      {shown.map((ribbon) => (
        <span
          key={ribbon.id}
          title={ribbon.label}
          style={{ backgroundColor: ribbon.color }}
          className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold text-white rounded-full"
        >
          <RibbonIcon ribbon={ribbon} className="w-4 h-4 shrink-0" />
          {ribbon.label}
        </span>
      ))}
      {pictures.map((id) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={id}
          alt=""
          className="w-5 h-5 object-contain"
          src={imageToAmazonURl(id.slice(CUSTOM_ICON.length))}
        />
      ))}
    </div>
  );
};

export default ProductIcons;
