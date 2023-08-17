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

  return (
    <div className="grid  justify-items-center w-full grid-cols-[repeat(auto-fill,220px)] justify-center gap-4 lg:gap-6 gap-y-6 lg:gap-y-10">
      {productList.map((product, i) => {
        return (
          <motion.div
            key={i}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: isTablet === false ? i * 0.05 : 0.25 }}
            variants={{
              initial: { scale: 0.75, opacity: 0, x: -20 },
              animate: { scale: 1, opacity: 1, x: 0 },
            }}
          >
            <Product {...product} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
