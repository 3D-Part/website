import { CUSTOM_ICON, PRODUCT_ICONS } from "@/shared/helper/productIcons";
import { imageToAmazonURl } from "@/shared/helper/imageToAmazonUrl";

const ProductIcons: React.FC<{ icons?: string[] | null; limit?: number }> = ({
  icons,
  limit,
}) => {
  const known = (icons || []).filter(
    (id) => PRODUCT_ICONS[id] || id.startsWith(CUSTOM_ICON)
  ).slice(0, limit);
  if (known.length === 0) return null;

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
