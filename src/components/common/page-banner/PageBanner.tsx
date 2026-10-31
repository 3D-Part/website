"use client";

import Link from "next/link";
import useSettingsApi from "@/redux/api/useSettingsApi";
import { imageToAmazonURl } from "@/shared/helper/imageToAmazonUrl";

export const PageBannerImage: React.FC<{ image: PageImage }> = ({ image }) => {
  const picture = (
    <picture>
      {image.mobile && (
        <source
          media="(max-width: 700px)"
          srcSet={imageToAmazonURl(image.mobile)}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageToAmazonURl(image.desktop)}
        alt={image.alt || ""}
        className={`block w-full object-cover min-[701px]:aspect-[8/3] ${
          image.mobile ? "aspect-[9/14]" : "aspect-[8/3]"
        }`}
      />
    </picture>
  );

  return image.link ? <Link href={image.link}>{picture}</Link> : picture;
};

export type PageImage = {
  id: string;
  page: string;
  desktop: string;
  mobile?: string;
  alt?: string;
  link?: string;
  active?: boolean;
};

export const usePageImages = (page: string): PageImage[] => {
  const { settings } = useSettingsApi();
  const images: PageImage[] = (settings?.settings as any)?.pageImages || [];
  return images.filter((image) => image.active && image.page === page && image.desktop);
};

const PageBanner: React.FC<{ page: string }> = ({ page }) => {
  const images = usePageImages(page);

  return (
    <>
      {images.map((image) => (
        <div key={image.id} className="w-full mb-4 overflow-hidden rounded-lg">
          <PageBannerImage image={image} />
        </div>
      ))}
    </>
  );
};

export default PageBanner;
