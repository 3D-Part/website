"use client";
import Product from "@/components/common/product/Product";
import { ProductInterface } from "@/shared/interfaces/productsInterface";
import React from "react";
import { motion } from "framer-motion";
import { useIsTablet } from "@/shared/hooks/useMediaQuerry";

interface ProductGridInterface {
  productList: ProductInterface[];
}

const ProductGrid: React.FC<ProductGridInterface> = ({ productList }) => {
  const isTablet = useIsTablet();

  if (!productList || productList.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 lg:py-24 px-4">
        <div className="text-center max-w-lg lg:max-w-2xl">
          <svg
            className="mx-auto h-20 w-20 lg:h-28 lg:w-28 text-gray-300 mb-6 lg:mb-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-3 lg:mb-4">
            Nema dostupnih proizvoda
          </h3>
          <p className="text-base lg:text-lg text-gray-500">
            Trenutno nema proizvoda koji odgovaraju vašim filterima. Pokušajte promijeniti kriterije pretrage.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid  justify-items-center w-full grid-cols-2 sm:grid-cols-[repeat(auto-fill,220px)] justify-center gap-2 sm:gap-4 lg:gap-6 gap-y-6 lg:gap-y-10">
      {productList.map((product, i) => {
        return (
          <div
            key={i}
            // initial="initial"
            // whileInView="animate"
            // viewport={{ once: true }}
            // transition={{
            //   delay:
            //     isTablet === false ? ((i + 4) % 4) * 0.1 : ((i + 2) % 2) * 0.25,
            // }}
            // variants={{
            //   initial: { scale: 0.75, opacity: 0, x: -20 },
            //   animate: { scale: 1, opacity: 1, x: 0 },
            // }}
            className="w-full max-w-[220px]"
          >
            <Product {...product} imageWidth="auto" className="w-full " />
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
