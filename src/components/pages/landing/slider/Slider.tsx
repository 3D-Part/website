"use client";

import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import SliderPage from "./slider-page/SliderPage";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Container from "@/components/common/container/Container";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { changeIsModalAuthVisible } from "@/redux/slices/ui/uiSlice";
import Display1 from "@/components/common/text/display/Display1";

const Slider = () => {
  const modules = [Pagination, Navigation, Autoplay];

  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <Container className="w-full px-4 py-6 lg:px-9 lg:py-8 landing_slider">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={modules}
        className="relative rounded-md cursor-pointer lg:rounded-3xl"
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
            bgUrl="/assets/img/slider/bg3.jpg"
            productUrl="/assets/img/slider/product1.webp"
            title={
              (
                <Display1
                  className={`text-transparent from-[rgba(255,255,255,1)] to-[rgba(173,173,173,1)] bg-gradient-to-r bg-clip-text`}
                >
                  Ender 3 S1 Pro
                </Display1>
              ) as ReactNode
            }
            subtitle="Efikasno Ispunite Velike Ambicije"
            description="Creality Ender 3 S1 Pro 3D printer 300℃ Visokotemperaturna mlaznica Sprite Full Metal Direct Drive Extruder CR Touch Auto Leveling Bed Silent Mainboard Filament Sensor Veličina ispisa 235x235x270"
            buttonText="Detaljnije"
            buttonOnClick={() => {
              router.push("/shop/product/8b2268b0-6ce6-11ee-a90e-137eed755a1c");
            }}
          />
        </SwiperSlide>

        <SwiperSlide>
          <SliderPage
            bgUrl="/assets/img/slider/background4.jpg"
            productUrl="/assets/img/slider/product4.png"
            title={
              (
                <Display1 className={`text-white`}>
                  <span className="text-transparent  from-[rgba(0,209,255,1)] to-[rgba(0,147,255,1)] bg-gradient-to-r bg-clip-text">
                    Registruj{""}
                  </span>
                  {""} se i ostvari
                  <span className="text-transparent t from-[rgba(0,209,255,1)] to-[rgba(0,147,255,1)] bg-gradient-to-r bg-clip-text">
                    {""} popust
                  </span>
                </Display1>
              ) as ReactNode
            }
            subtitle=""
            description="Pridruži nam se danas i iskoristi posebne pogodnosti! Registracijom na naš sajt dobijaš ekskluzivni popust  i pristup najnovijim ponudama, promotivnim akcijama i specijalnim događajima."
            buttonText="Registruj se"
            buttonOnClick={() => {
              dispatch(changeIsModalAuthVisible(true));
            }}
            priority={true}
          />
        </SwiperSlide>

        {/* <SwiperSlide>
          <SliderPage
            bgUrl="/assets/img/slider/bg1.jpg"
            productUrl="/assets/img/slider/product1.png"
            title="Ender 3 v2 Neo"
            subtitle="Safer, Smarter, Stronger"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit elit sit amet faucibus vehicula. Nunc vel diam id nulla tincidunt mollis a at massa. In non molestie lacus, sed viverra erat."
            buttonText="Detaljnije"
            buttonOnClick={() => {}}
            titleClassName="text-transparent from-[rgba(0,209,255,1)] to-[rgba(0,147,255,1)] bg-gradient-to-r bg-clip-text"
          />
        </SwiperSlide> */}
      </Swiper>
    </Container>
  );
};

export default Slider;
