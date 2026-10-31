import { IconType } from "react-icons";
import {
  RiAwardLine,
  RiFireLine,
  RiLeafLine,
  RiShieldCheckLine,
  RiStarLine,
  RiTruckLine,
} from "react-icons/ri";

// Same ids as the admin panel's shared/helpers/productIcons
export const PRODUCT_ICONS: Record<string, { icon: IconType; label: string }> = {
  new: { icon: RiStarLine, label: "Novo" },
  "best-seller": { icon: RiFireLine, label: "Najprodavanije" },
  "fast-delivery": { icon: RiTruckLine, label: "Brza dostava" },
  eco: { icon: RiLeafLine, label: "Ekološki" },
  premium: { icon: RiAwardLine, label: "Premium kvalitet" },
  warranty: { icon: RiShieldCheckLine, label: "Garancija" },
};
