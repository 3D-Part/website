"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import SliderPage from "./slider-page/SliderPage";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Container from "@/components/common/container/Container";

const Slider = () => {
  const modules = [Pagination, Navigation, Autoplay];

  return (
    <Container className="w-full px-4 py-6 border border-white lg:px-9 lg:py-8 landing_slider">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={modules}
        className="relative border-2 border-white rounded-md cursor-pointer lg:rounded-3xl"
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={400}
        spaceBetween={50}
        navigation={true}
      >
        <SwiperSlide>
          <SliderPage
            bgUrl="/assets/img/slider/bg.webp"
            productUrl="/assets/img/slider/product.png"
            title="Ender 3 Max Neo"
            subtitle="Build an Ambitious Printing World"
            description="Ender 3 Max Neo je visokokvalitetni 3D printer koji nudi brzu i preciznu štampanje sa impresivnim mogućnostima, kao što su velika površina za štampanje, automatsko nivelisanje i stabilna konstrukcija."
            buttonText="Detaljnije"
            buttonOnClick={() => {}}
            titleClassName="text-transparent from-primary-500 to-[rgba(7,235,208,1)] bg-gradient-to-r bg-clip-text"
            priority={true}
          />
        </SwiperSlide>

        <SwiperSlide>
          <SliderPage
            bgUrl="/assets/img/slider/bg.webp"
            productUrl="/assets/img/slider/product2.png"
            title="CR M4"
            subtitle="Fulfill Big Ambitions Efficiently"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit elit sit amet faucibus vehicula. Nunc vel diam id nulla tincidunt mollis a at massa. In non molestie lacus, sed viverra erat. Praesent aliquet dui non vulputate fringilla. Fusce vulputate mauris non nisl aliquet."
            buttonText="Detaljnije"
            buttonOnClick={() => {}}
            titleClassName="text-transparent from-[rgba(255,255,255,1)] to-[rgba(173,173,173,1)] bg-gradient-to-r bg-clip-text"
          />
        </SwiperSlide>

        <SwiperSlide>
          <SliderPage
            bgUrl="/assets/img/slider/bg.webp"
            productUrl="/assets/img/slider/product3.png"
            title="Creality Falcon 2"
            subtitle="Safer, Smarter, Stronger"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit elit sit amet faucibus vehicula. Nunc vel diam id nulla tincidunt mollis a at massa. In non molestie lacus, sed viverra erat."
            buttonText="Detaljnije"
            buttonOnClick={() => {}}
            titleClassName="text-transparent from-[rgba(0,209,255,1)] to-[rgba(0,147,255,1)] bg-gradient-to-r bg-clip-text"
          />
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default Slider;
