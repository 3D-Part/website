import React from "react";
import { svgSrc, tierStyle } from "@/shared/tiers";

type Props = {
  name: string;
  color?: string | null;
  // the SVG of the badge picture; the star is used without one
  badge?: string | null;
  discount?: number;
  size?: "S" | "L";
  // only the star in a small circle, for tight places
  compact?: boolean;
  // false leaves out the icon in front of the name
  icon?: boolean;
  className?: string;
};

const BadgePicture = ({ svg, size }: { svg: string; size: number }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={svgSrc(svg)} width={size} height={size} alt="" className="shrink-0" style={{ width: size, height: size }} />
);

const MedalIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 16.8 6.2 19.9l1.1-6.5L2.6 8.8l6.5-.9L12 2z" />
  </svg>
);

/** The customer's tier as a small coloured badge. */
const TierBadge: React.FC<Props> = ({ name, color, badge, discount, size = "S", compact = false, icon = true, className = "" }) => {
  const style = tierStyle(color);
  if (compact) {
    // the picture alone, it is round already
    if (badge) {
      return (
        <span title={discount ? `${name}: ${discount}% popusta` : name} className={`inline-flex ${className}`}>
          <BadgePicture svg={badge} size={18} />
        </span>
      );
    }
    return (
      <span
        title={discount ? `${name}: ${discount}% popusta` : name}
        className={`inline-flex items-center justify-center w-4 h-4 rounded-full border ${style.badge} ${className}`}
      >
        <MedalIcon size={9} />
      </span>
    );
  }
  return (
    <span
      title={discount ? `${name}: ${discount}% popusta` : name}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-semibold ${style.badge} ${
        size === "L" ? "px-4 py-1.5 text-lg" : "px-2.5 py-0.5 text-xs"
      } ${className}`}
    >
      {!icon ? null : badge ? <BadgePicture svg={badge} size={size === "L" ? 28 : 18} /> : <MedalIcon size={size === "L" ? 20 : 12} />}
      {name}
      {discount ? <span className="opacity-80">−{discount}%</span> : null}
    </span>
  );
};

export default TierBadge;
