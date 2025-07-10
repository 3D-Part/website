import Link from "next/link";
import Image from "next/image";
import { getMainImage } from "@/shared/helper/getMainImage";
import { ProductInterface } from "@/shared/interfaces/productsInterface";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

const SimilarProducts: React.FC<{
  data: ProductInterface[];
  productId: string;
}> = ({ data, productId }) => {
  data.forEach((product, i) => {
    if (product.id === productId) {
      const temp = data[0];
      data[0] = product;
      data[i] = temp;
    }
  });

  return (
    <div className="w-full mt-4">
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView="auto"
        grabCursor={true}
        navigation={true}
        spaceBetween={16}
        className="swiper_products2"
        scrollbar={{
          hide: true,
        }}
      >
        {data.map((product) => {
          return (
            <SwiperSlide
              key={product.id}
              className={`w-[90px] h-[90px] bg-neutral-700 rounded-lg `}
              style={{ width: "90px", height: "90px" }}
            >
              <div className="w-[90px] h-[90px] ">
                <Link
                  href={`/shop/product/${product.id}`}
                  className={`w-[90px] h-[90px] flex items-center ${product.id === productId
                      ? "border-[1px] border-primary-500 border-solid rounded-lg "
                      : ""
                    } `}
                  prefetch
                >
                  <Image
                    className="border border-solid "
                    alt={product.name}
                    src={getMainImage(product.images)}
                    width={90}
                    height={90}
                  ></Image>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SimilarProducts;
