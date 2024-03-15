"use client";

import Heading5 from "@/components/common/text/heading/Heading5";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import React, { FC } from "react";
import FreeDelivery from "../icons/FreeDelivery";
import { motion } from "framer-motion";
import FastDelivery from "../icons/FastDelivery";
import ProductsIcon from "../icons/ProductsIcon";
import SupportIcon from "../icons/SupportIcon";
import { useIsTablet } from "@/shared/hooks/useMediaQuerry";

interface InfoCardProps {
  title: string;
  subtitle: string;
  circleColor: string;
  borderColor: string;
  icon: number;
}

const InfoCard: FC<InfoCardProps> = ({
  icon,
  circleColor,
  borderColor,
  subtitle,
  title,
}) => {
  const isTablet = useIsTablet();
  return (
    <>
      {isTablet ? (
        <motion.div
          className={`w-full p-[2px] rounded-[32px] h-[190px] max-w-[480px] `}
          style={{
            background: `linear-gradient(to bottom, ${borderColor}, transparent)`,
          }}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          transition={{
            duration: 0.35,
            delay: 0.3,
          }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { x: { delay: 0, duration: 0 } },
            },
          }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full bg-neutral-800 gap:5 rounded-[32px] py-5 ">
            <div
              className={`w-[85px] h-[85px] rounded-full  flex items-center justify-center overflow-hidden`}
              style={{ backgroundColor: circleColor }}
            >
              {icon === 0 && <FreeDelivery />}
              {icon === 1 && <FastDelivery />}
              {icon === 2 && <ProductsIcon />}
              {icon === 3 && <SupportIcon />}
            </div>
            <Heading5>{title}</Heading5>
            <Paragraph size="M" weight="Regular" className="text-center">
              {subtitle}
            </Paragraph>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className={`w-full p-[2px] rounded-[32px] h-[190px] max-w-[480px] `}
          style={{
            background: `linear-gradient(to bottom, ${borderColor}, transparent)`,
          }}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          transition={{
            duration: 0.35,
            delay: icon * 0.3,
          }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full bg-neutral-800 gap:5 rounded-[32px] py-5 ">
            <div
              className={`w-[85px] h-[85px] rounded-full  flex items-center justify-center overflow-hidden`}
              style={{ backgroundColor: circleColor }}
            >
              {icon === 0 && <FreeDelivery />}
              {icon === 1 && <FastDelivery />}
              {icon === 2 && <ProductsIcon />}
              {icon === 3 && <SupportIcon />}
            </div>
            <Heading5>{title}</Heading5>
            <Paragraph size="M" weight="Regular" className="text-center">
              {subtitle}
            </Paragraph>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default InfoCard;
