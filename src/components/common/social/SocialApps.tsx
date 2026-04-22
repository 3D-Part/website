"use client"

import React from "react";
import Image from "next/image";
import useSettingsApi from "@/redux/api/useSettingsApi";

const SocialApps: React.FC<{
  className?: string;
  facebookWidth: number;
  olxWidth: number;
}> = ({ className = "", facebookWidth, olxWidth }) => {
  const { settings } = useSettingsApi();

  // If no social media links are provided, don't render the component
  if (!settings?.settings?.socialMedia) return null;

  return (
    <div className={`flex items-center gap-3 w-max ${className}`}>
      {settings.settings.socialMedia.instagram && <a
        target="_blank"
        href={settings.settings.socialMedia.instagram}
        rel="noopener noreferrer"
        title="Instagram"
        aria-label="Instagram"
      >
        <Image
          alt="Instagram icon"
          src={"/assets/img/instagram-icon.svg"}
          width={facebookWidth}
          height={facebookWidth}
          style={{ width: "auto" }}
        />
      </a>}

      {settings.settings.socialMedia.facebook && <a
        target="_blank"
        href={settings.settings.socialMedia.facebook}
        rel="noopener noreferrer"
        title="Facebook"
        aria-label="Facebook"
      >
        <Image
          alt="Facebook icon"
          src={"/assets/img/facebook-icon.svg"}
          width={facebookWidth}
          height={facebookWidth}
          style={{ width: "auto" }}
        />
      </a>}

      {settings.settings.socialMedia.olx && <a
        target="_blank"
        href={settings.settings.socialMedia.olx}
        rel="noopener noreferrer"
        title="OLX"
        aria-label="OLX"
      >
        <Image
          alt="OLX icon"
          src={"/assets/img/olx-icon.svg"}
          width={olxWidth}
          height={olxWidth / 1.65625}
          style={{ width: "auto" }}
        />
      </a>}
    </div>
  );
};

export default SocialApps;
