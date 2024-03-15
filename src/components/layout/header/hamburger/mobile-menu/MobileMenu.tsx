"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import MobileLinks from "./MobileLinks";
import Image from "next/image";
import PhoneNumber from "@/components/common/social/PhoneNumber";
import Mail from "@/components/common/social/Mail";
import SocialApps from "@/components/common/social/SocialApps";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import TruckIcon from "../../header-info/TruckIcon";
import { useRouter } from "next/navigation";

const MobileMenu: React.FC<{ links: any; onClick: () => void }> = ({
  links,
  onClick,
}) => {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[200] w-screen h-screen bg-[rgba(0,0,0,0.8)] py-4 backdrop-blur">
      <div className="flex items-center justify-center pb-6 border-b border-solid border-neutral-600">
        <Link
          href={"/"}
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            alt="3d part logo"
            src={"/assets/img/logo.svg"}
            width={138}
            height={44}
          />
        </Link>
      </div>
      <div className="overflow-y-auto h-[calc(100%-68px)] flex flex-col">
        <div>
          <MobileLinks
            links={links}
            onClick={onClick}
            className="h-full text-2xl transition-all "
            nestedIteration={0}
          />
        </div>
        <div className="flex flex-col justify-end flex-1 gap-6 px-10 pb-10 py-14 w-fit">
          <div className="flex gap-9">
            <PhoneNumber />
            <Mail />
          </div>
          <div className="flex gap-9 w-fit">
            <SocialApps className="" facebookWidth={31} olxWidth={53} />
          </div>
          <div className="flex ">
            <Paragraph size="M" weight="Regular" className="text-neutral-500">
              Jezik:{" "}
            </Paragraph>
            {/* <Paragraph size="M" weight="Regular" className="ml-2">
              Srpski
            </Paragraph> */}
          </div>
          <div className="flex items-center">
            <TruckIcon />
            <Paragraph
              size="S"
              weight="Regular"
              className="text-[rgba(248,250,252,0.5)] mr-1"
            >
              Dostava u:
            </Paragraph>

            <Image
              alt="Bosnia and Herzegovina flag"
              src={"/assets/img/bosnia-flag.svg"}
              width={26}
              height={26}
              className="ml-[4px]"
            />

            <Paragraph size="S" weight="Regular" className="ml-2 ">
              Bosna i Hercegovina
            </Paragraph>
            {/* <MdOutlineKeyboardArrowDown className="mt-1 ml-[2px] cursor-pointer" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
