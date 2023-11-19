"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Display1 from "@/components/common/text/display/Display1";
import Heading4 from "@/components/common/text/heading/Heading4";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import Button from "@/components/common/button/Button";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useIsTablet } from "@/shared/hooks/useMediaQuerry";

interface SliderPageProps {
  title: string;
  titleClassName: string;
  subtitle: string;
  description: string;
  buttonText: string;
  bgUrl: string;
  productUrl: string;
  buttonOnClick: () => void;
  priority?: boolean;
}

const SliderPage: React.FC<SliderPageProps> = ({
  bgUrl,
  buttonOnClick,
  buttonText,
  description,
  productUrl,
  subtitle,
  title,
  titleClassName,
  priority = false,
}) => {
  const isTablet = useIsTablet();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      className="w-full bg-none bg-center bg-no-repeat bg-cover lg:h-[540px] flex flex-col gap-3 lg:grid lg:grid-cols-2 xl:gap-11 lg:gap-x-6 lg:px-[88px] lg:pt-0 lg:pb-0 lg:relative "
      style={{ backgroundImage: isTablet === false ? `url(${bgUrl})` : "none" }}
    >
      <link rel="preload" href={bgUrl} as="image" />
      <div
        className={`bg-center bg-no-repeat bg-cover w-full lg:order-2 `}
        style={{ backgroundImage: isTablet ? `url(${bgUrl})` : "none" }}
      >
        <motion.div
          className="h-[250px]  relative lg:order-1 w-full lg:h-full "
          transition={{ duration: 1.3, type: "spring" }}
          variants={{
            hidden: { opacity: 0, scale: 0, rotate: 0 },
            visible: {
              opacity: 1,
              scale: 1,
              rotate: isTablet ? 0 : [-45, 45, 0],
            },
          }}
        >
          <Image
            alt={title}
            src={productUrl}
            fill={true}
            style={{ objectFit: "contain" }}
            priority={priority}
          />
        </motion.div>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.25,
              delay: 0.3,
              opacity: { delay: 0.4, duration: 0.4 },
            },
          },
        }}
        className="lg:pt-24"
      >
        <Display1 className={`${titleClassName} `}>{title}</Display1>
        <Heading4 className="mt-3 lg:mt-0">{subtitle}</Heading4>
        <Paragraph size="M" weight="Regular" className="mt-6 lg:mt-8">
          {description}
        </Paragraph>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: 0.25,
            delay: 0.55,
          }}
          className="mt-3 lg:absolute bottom:0 left:0"
        >
          <Button
            size="M"
            type="primary"
            onClick={buttonOnClick}
            className="flex items-center w-full gap-2 lg:w-fit lg:absolute lg:bottom-[-60px] lg:left-0 px-6 py-3 "
            text={buttonText}
          >
            <HiOutlineArrowNarrowRight className="text-2xl" />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SliderPage;
