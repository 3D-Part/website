import { CUSTOM_ICON, PRODUCT_ICONS } from "@/shared/helper/productIcons";
import { imageToAmazonURl } from "@/shared/helper/imageToAmazonUrl";

const ProductIcons: React.FC<{
  icons?: string[] | null;
  limit?: number;
  // "ribbon": on the corner of the product picture, out of the flow of the card
  variant?: "pills" | "ribbon";
}> = ({
  icons,
  limit,
  variant = "pills",
}) => {
  const known = (icons || []).filter(
    (id) => PRODUCT_ICONS[id] || id.startsWith(CUSTOM_ICON)
  ).slice(0, limit);
  if (known.length === 0) return null;

  if (variant === "ribbon") {
    // Absolutely placed at the left edge of the picture, so the card is as tall
    // with it as without it and nothing else in the card moves.
    return (
      <div className="absolute left-0 z-10 flex flex-col items-start gap-1 pointer-events-none bottom-3">
        {known.map((id) => {
          if (id.startsWith(CUSTOM_ICON)) {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={id}
                alt=""
                className="object-contain w-7 h-7 p-1 bg-white rounded-r-lg shadow"
                src={imageToAmazonURl(id.slice(CUSTOM_ICON.length))}
              />
            );
          }
          const { icon: Icon, label } = PRODUCT_ICONS[id];
          return (
            <span
              key={id}
              title={label}
              className="flex items-center gap-1 py-1 pl-2 pr-3 text-xs font-bold text-white rounded-r-lg shadow bg-primary-600"
            >
              <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden />
              {label}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1 mt-2">
      {known.map((id) => {
        if (id.startsWith(CUSTOM_ICON)) {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={id}
              alt=""
              className="w-5 h-5 object-contain"
              src={imageToAmazonURl(id.slice(CUSTOM_ICON.length))}
            />
          );
        }
        const { icon: Icon, label } = PRODUCT_ICONS[id];
        return (
          <span
            key={id}
            title={label}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium border rounded-full text-primary-300 border-primary-500"
          >
            <Icon className="w-4 h-4 shrink-0" aria-hidden />
            {label}
          </span>
        );
      })}
    </div>
  );
};

export default ProductIcons;
