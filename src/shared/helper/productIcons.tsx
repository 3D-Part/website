import { IconType } from "react-icons";
import {
  RiAwardLine,
  RiFireLine,
  RiFlashlightLine,
  RiGift2Line,
  RiHeart3Line,
  RiLeafLine,
  RiPercentLine,
  RiPriceTag3Line,
  RiShieldCheckLine,
  RiStarLine,
  RiThumbUpLine,
  RiTimeLine,
  RiTruckLine,
} from "react-icons/ri";

// Ribbons ("Novo", "Najprodavanije"...) are set in the admin (settings
// `productRibbons`); a product keeps the ids of its ribbons in `icons`.
export type ProductRibbon = {
  id: string;
  label: string;
  color: string;
  // a preset name, CUSTOM_ICON + image key of an upload, or "" for none
  icon: string;
};

// Same names as the admin panel's shared/helpers/productIcons
export const RIBBON_ICONS: Record<string, IconType> = {
  star: RiStarLine,
  fire: RiFireLine,
  truck: RiTruckLine,
  leaf: RiLeafLine,
  award: RiAwardLine,
  shield: RiShieldCheckLine,
  percent: RiPercentLine,
  gift: RiGift2Line,
  flash: RiFlashlightLine,
  heart: RiHeart3Line,
  thumb: RiThumbUpLine,
  tag: RiPriceTag3Line,
  time: RiTimeLine,
};

const COLOR = "#2f68c5";

// until the settings arrive, and when the admin never changed them
export const DEFAULT_RIBBONS: ProductRibbon[] = [
  { id: "new", label: "Novo", color: COLOR, icon: "star" },
  { id: "best-seller", label: "Najprodavanije", color: COLOR, icon: "fire" },
  { id: "fast-delivery", label: "Brza dostava", color: COLOR, icon: "truck" },
  { id: "eco", label: "Ekološki", color: COLOR, icon: "leaf" },
  { id: "premium", label: "Premium kvalitet", color: COLOR, icon: "award" },
  { id: "warranty", label: "Garancija", color: COLOR, icon: "shield" },
];

// An uploaded icon is stored as this prefix plus its image key
export const CUSTOM_ICON = "image:";
