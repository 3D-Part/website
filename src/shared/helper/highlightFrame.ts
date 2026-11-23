import type { CSSProperties } from "react";

/**
 * The colored frame the admin can put around a product's card to make it
 * stand out. Drawn inside the card (inset), so it never changes the card's size
 * and is not cut off by sliders that clip their slides.
 */
export const highlightFrame = (color?: string | null): CSSProperties | undefined =>
  color && /^#[0-9a-fA-F]{6}$/.test(color)
    ? { boxShadow: `inset 0 0 0 2px ${color}, inset 0 0 18px ${color}40` }
    : undefined;
