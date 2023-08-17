"use client";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import React from "react";
import Image from "next/image";
import TruckIcon from "./TruckIcon";
import PhoneNumber from "@/components/common/social/PhoneNumber";
import Mail from "@/components/common/social/Mail";
import SocialApps from "@/components/common/social/SocialApps";
import { motion } from "framer-motion";
import useScrollThreshold from "@/shared/hooks/useScrollThreshold";
import { useIsTablet } from "@/shared/hooks/useMediaQuerry";

const HeaderInfo = () => {
  const scrolled = useScrollThreshold(100);
  const isTablet = useIsTablet();
  return (
    <>
      {!isTablet && (
        <motion.div
          className="items-center justify-between hidden py-2 lg:flex px-9 min-h-11 h-11 lg:max-w-[1920px] lg:mx-auto overflow-hidden"
          initial={{ height: "auto", paddingTop: 0, paddingBottom: 0 }}
          animate={{
            height: scrolled && !isTablet ? 0 : 44,
            paddingTop: scrolled && !isTablet ? 0 : 8,
            paddingBottom: scrolled && !isTablet ? 0 : 8,
          }}
          transition={{ type: "keyframes", duration: 0.2 }}
        >
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
          <div className="flex items-center">
            <PhoneNumber />
            <Mail className="ml-9" />

            <SocialApps className="ml-8" facebookWidth={24} olxWidth={40.89} />

            {/* <Paragraph size="M" weight="Regular" className="ml-8">
              Srpski
            </Paragraph> */}
            {/* <MdOutlineKeyboardArrowDown className=" ml-[2px] cursor-pointer" /> */}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default HeaderInfo;
