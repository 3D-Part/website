"use client";
import Display2 from "@/components/common/text/display/Display2";
import Heading2 from "@/components/common/text/heading/Heading2";
import Heading6 from "@/components/common/text/heading/Heading6";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { ProductInterface } from "@/shared/interfaces/productsInterface";
import React from "react";
import Stock from "../stock/Stock";
import { motion } from "framer-motion";
import SimilarProducts from "./similar-products/SimilarProducts";

const MainData: React.FC<{
  productData: ProductInterface;
  similarProducts: ProductInterface[];
}> = ({ productData, similarProducts }) => {
  let { name, price, sku, description } = productData;
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };
  const dropUpVariants = {
    hidden: {
      y: "300",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col lg:w-[calc(100%-586px-56px)] mt-6 lg:mt-0"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div>{/* CATEGORY */}</div>
      <motion.div variants={dropUpVariants}>
        <Heading2>{name}</Heading2>

        <Paragraph weight="Regular" size="L">
          <p
            dangerouslySetInnerHTML={{ __html: description + "" }}
            className="mt-4 text-lg font-normal leading-7 text-center lg:text-start text-neutral-200"
          />
        </Paragraph>
      </motion.div>

      <motion.div variants={dropUpVariants} className="w-full mt-4">
        {similarProducts.length > 1 && (
          <div className="w-full">
            <Heading6> Slični proizvodi:</Heading6>
            <SimilarProducts
              data={similarProducts}
              productId={productData.id}
            />
          </div>
        )}

        <Paragraph size="L" weight="Regular" className="mt-4 text-neutral-200">
          Šifra artikla: {sku}
        </Paragraph>
      </motion.div>

      <motion.div
        variants={dropUpVariants}
        className="flex mt-[60px] gap-9 flex-col xl:flex-row"
      >
        <Display2>{parseFloat(price).toFixed(2)} KM</Display2>
        <Stock stock={10} />
      </motion.div>
    </motion.div>
  );
};

export default MainData;
