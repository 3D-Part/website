import { CUSTOM_ICON, PRODUCT_ICONS } from "@/shared/helper/productIcons";
import { imageToAmazonURl } from "@/shared/helper/imageToAmazonUrl";

const ProductIcons: React.FC<{ icons?: string[] | null; withLabels?: boolean }> = ({
  icons,
  withLabels = false,
}) => {
  const known = (icons || []).filter(
    (id) => PRODUCT_ICONS[id] || id.startsWith(CUSTOM_ICON)
  );
  if (known.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-2">
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
            className="flex items-center gap-1 text-xs text-primary-300"
          >
            <Icon className="w-4 h-4" aria-label={label} />
            {withLabels && label}
          </span>
        );
      })}
    </div>
  );
};

export default ProductIcons;
