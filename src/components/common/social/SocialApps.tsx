import React from "react";
import Image from "next/image";

const SocialApps: React.FC<{
  className?: string;
  facebookWidth: number;
  olxWidth: number;
}> = ({ className = "", facebookWidth, olxWidth }) => {
  return (
    <div className={`flex items-center gap-3 w-max ${className}`}>
      <a
        target="_blank"
        href="https://instagram.com/3d_part_?igshid=MzNlNGNkZWQ4Mg=="
        rel="noopener noreferrer"
      >
        <Image
          alt="Instagram icon"
          src={"/assets/img/instagram-icon.svg"}
          width={facebookWidth}
          height={facebookWidth}
        />
      </a>

      <a
        target="_blank"
        href="https://www.facebook.com/"
        rel="noopener noreferrer"
      >
        <Image
          alt="Facebook icon"
          src={"/assets/img/facebook-icon.svg"}
          width={facebookWidth}
          height={facebookWidth}
        />
      </a>

      <a
        target="_blank"
        href="https://olx.ba/profil/3DPart="
        rel="noopener noreferrer"
      >
        <Image
          alt="OLX icon"
          src={"/assets/img/olx-icon.svg"}
          width={olxWidth}
          height={olxWidth / 1.65625}
        />
      </a>
    </div>
  );
};

export default SocialApps;
