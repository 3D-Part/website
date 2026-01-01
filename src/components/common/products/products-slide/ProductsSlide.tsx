"use client";
import { ProductInterface } from "@/shared/interfaces/productsInterface";
import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

import Product from "../../product/Product";
import { Autoplay, Navigation, Scrollbar } from "swiper";

import { motion } from "framer-motion";
import { useIsTablet } from "@/shared/hooks/useMediaQuerry";

const ProductsSlide: React.FC<{
  products: ProductInterface[];
  animationVariants?: { initial: Object; animate: Object };
  reverseDirection?: boolean | undefined;
  extraSlide?: ReactNode;
}> = (
  { products, animationVariants = { initial: {}, animate: {} }, extraSlide },
  reverseDirection = false
) => {
    const isTablet = useIsTablet();

    return (
      <div className="max-w-full mt-6 lg:mt-8 ">
        <Swiper
          spaceBetween={isTablet ? 0 : 24}
          slidesPerView="auto"
          slidesPerGroup={isTablet ? 2 : 3}
          modules={[Scrollbar, Autoplay, Navigation]}
          className="swiper_products"
          grabCursor={true}
          scrollbar={{
            hide: true,
            draggable: true,
            // snapOnRelease: true,
          }}
          longSwipes={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          speed={950}
          navigation={true}
        >
          {products.map((product, i) => {
            return (
              <SwiperSlide key={product.id || i}>
                {isTablet ? (
                  <div>
                    <Product {...product} className={"ml-4 lg:ml-0"} />
                  </div>
                ) : (
                  <motion.div
                    initial="initial"
                    exit="initial"
                    animate="animate"
                    variants={animationVariants}
                  >
                    <Product {...product} className={"ml-4 lg:ml-0"} />
                  </motion.div>
                )}
              </SwiperSlide>
            );
          })}
          {extraSlide && (
            <SwiperSlide key="cta-extra">
              {extraSlide}
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    );
  };

export default ProductsSlide;
