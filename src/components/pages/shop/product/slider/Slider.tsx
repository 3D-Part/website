"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { ProductImageInterface } from "@/shared/interfaces/productsInterface";
import { imageToAmazonURl } from "@/shared/helper/imageToAmazonUrl";

const Slider: React.FC<{ images: ProductImageInterface[]; name: string }> = ({
  images,
  name,
}) => {
  const modules = [Pagination, Navigation];

  if (!images.length) {
    images = [
      {
        imageId: "/assets/img/no-image.svg",
        isMain: true,
      } as ProductImageInterface,
    ];
  }

  return (
    <div className="w-full h-full lg:w-[586px]">
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, mass: 0.3 }}
        className="w-full h-full"
      >
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={modules}
          className="w-full h-full rounded-md bg-neutral-700"
          speed={400}
          loop={true}
          navigation={true}
        >
          {images.map((img, i) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <SwiperSlide>
                <motion.div
                  className="w-full h-full "
                  initial={{ y: -100, scale: 0.5 }}
                  animate={"animate"}
                  variants={{
                    animate: {
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        mass: 0.4,
                      },
                    },
                  }}
                >
                  <Image
                    alt={name}
                    src={imageToAmazonURl(img.imageId)}
                    fill={true}
                    priority
                    style={{ objectFit: "contain" }}
                  />
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default Slider;
