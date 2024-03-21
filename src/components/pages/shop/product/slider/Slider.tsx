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

  images.push({
    id: "837c0fa0-e697-11ee-a531-55d319ede9ea",
    productId: "7d6dc4a0-e697-11ee-a531-55d319ede9ea",
    imageId: "bf2e11a4-9df7-462c-a23d-95ecba5e5a3b",
    isMain: true,
  });

  return (
    <div className="w-full h-full lg:w-[586px]">
      <div className="w-full h-full">
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
                  // initial={{ y: -100, scale: 0.5 }}
                  // animate={"animate"}
                  // variants={{
                  //   animate: {
                  //     y: 0,
                  //     scale: 1,
                  //     transition: {
                  //       type: "spring",
                  //       stiffness: 100,
                  //       mass: 0.4,
                  //     },
                  //   },
                  // }}
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
      </div>
    </div>
  );
};

export default Slider;
