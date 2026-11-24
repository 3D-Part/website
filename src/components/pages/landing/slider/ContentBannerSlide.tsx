"use client";

import Link from "next/link";
import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import useSettingsApi from "@/redux/api/useSettingsApi";
import { imageToAmazonURl } from "@/shared/helper/imageToAmazonUrl";

/**
 * A content banner of the settings (`contentBanners`): a slide the site draws
 * from a title, a text, a button, a background (a color or a picture) and,
 * optionally, a product picture. The admin's image slides are finished
 * pictures instead (see PageBannerImage).
 */
export type ContentBanner = {
  id: string;
  active: boolean;
  title: string;
  text: string;
  buttonLabel: string;
  buttonLink: string;
  background: "color" | "image";
  backgroundColor: string;
  backgroundImage: string;
  textColor: "light" | "dark";
  productImage: string;
  productId: string;
};

export const useContentBanners = (): ContentBanner[] => {
  const { settings } = useSettingsApi();
  const banners = (settings?.settings as any)?.contentBanners;
  return Array.isArray(banners) ? banners.filter((banner: ContentBanner) => banner.active && banner.title) : [];
};

const ContentBannerSlide: React.FC<{ banner: ContentBanner }> = ({ banner }) => {
  const light = banner.textColor === "light";
  const withPicture = banner.background === "image" && banner.backgroundImage;

  return (
    <div
      className="relative flex flex-col-reverse items-center gap-4 overflow-hidden bg-cover bg-center px-6 pt-6 pb-12 lg:grid lg:grid-cols-2 lg:gap-10 lg:h-[540px] lg:px-[88px] lg:py-0"
      style={{
        backgroundColor: banner.backgroundColor,
        backgroundImage: withPicture ? `url(${imageToAmazonURl(banner.backgroundImage)})` : undefined,
        color: light ? "#ffffff" : "#101010",
      }}
    >
      <div className="flex flex-col w-full gap-4 lg:gap-6">
        <h2 className="text-[32px] font-extrabold leading-[40px] lg:text-[56px] lg:leading-[68px]">
          {banner.title}
        </h2>
        {banner.text && <p className="text-base lg:text-lg opacity-90 max-w-[560px]">{banner.text}</p>}
        {banner.buttonLabel && banner.buttonLink && (
          <Link
            href={banner.buttonLink}
            className={`flex items-center gap-2 px-6 py-3 mt-2 font-semibold rounded-lg w-fit transition-transform hover:scale-105 ${
              light ? "bg-white text-[#101010]" : "bg-[#101010] text-white"
            }`}
          >
            {banner.buttonLabel}
            <HiOutlineArrowNarrowRight className="text-2xl" />
          </Link>
        )}
      </div>
      {banner.productImage && (
        <div className="flex items-center justify-center w-full h-[220px] lg:h-[440px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageToAmazonURl(banner.productImage)}
            alt={banner.title}
            className="object-contain max-w-full max-h-full drop-shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default ContentBannerSlide;
