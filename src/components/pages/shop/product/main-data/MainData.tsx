"use client";
import Display2 from "@/components/common/text/display/Display2";
import Heading2 from "@/components/common/text/heading/Heading2";
import Heading6 from "@/components/common/text/heading/Heading6";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { ProductInterface } from "@/shared/interfaces/productsInterface";
import React, { useState } from "react";
import Stock from "../stock/Stock";
import { motion } from "framer-motion";
import SimilarProducts from "./similar-products/SimilarProducts";
import Button from "@/components/common/button/Button";
import { CartIcon } from "@/components/common/product/Product";
import { useAppDispatch } from "@/redux/hooks";
import { addProductWithAmount } from "@/redux/slices/cartSlice";
import { getMainImage } from "@/shared/helper/getMainImage";
import { useIsTablet } from "@/shared/hooks/useMediaQuerry";

const MainData: React.FC<{
  productData: ProductInterface;
  similarProducts: ProductInterface[];
}> = ({ productData, similarProducts }) => {
  let { name, price, sku, description, weight, images, quantity } = productData;
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

  const [amount, setAmount] = useState(1);
  const dispatch = useAppDispatch();

  const isTablet = useIsTablet();

  const amountHandler = (newAmount: number) => {
    if (newAmount >= 1) {
      setAmount(newAmount);
    }
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
            className="mt-4 text-lg font-normal leading-7 lg:text-start text-neutral-200"
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
        className="flex mt-[60px] gap-9 flex-wrap"
      >
        <Display2>{parseFloat(price).toFixed(2)} KM</Display2>
        {!isTablet && <Stock stock={productData.quantity} />}
      </motion.div>

      <motion.div
        variants={dropUpVariants}
        className="flex mt-[60px] gap-9 flex-wrap items-center"
      >
        <div className="bg-neutral-700 p-[3px] flex gap-4 items-center rounded-lg w-min h-[46px]">
          <motion.button
            className="w-10 h-10 rounded-[4px] flex items-center justify-center bg-neutral-900 cursor-pointer"
            whileTap="tap"
            onClick={() => {
              amountHandler(amount - 1);
            }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="4"
              viewBox="0 0 10 4"
              fill="none"
              variants={{ initial: { scale: 1 }, tap: { scale: 1.5 } }}
            >
              <path
                d="M8.75 3.25H1.25C0.918479 3.25 0.600537 3.1183 0.366116 2.88388C0.131696 2.64946 0 2.33152 0 2C0 1.66848 0.131696 1.35054 0.366116 1.11612C0.600537 0.881696 0.918479 0.75 1.25 0.75H8.75C9.08152 0.75 9.39946 0.881696 9.63388 1.11612C9.8683 1.35054 10 1.66848 10 2C10 2.33152 9.8683 2.64946 9.63388 2.88388C9.39946 3.1183 9.08152 3.25 8.75 3.25Z"
                fill="white"
              />
            </motion.svg>
          </motion.button>
          <Paragraph size="L" weight="Bold">
            {amount}
          </Paragraph>
          <motion.button
            className="w-10 h-10 rounded-[4px] flex items-center justify-center bg-neutral-900 cursor-pointer"
            whileTap="tap"
            onClick={() => {
              amountHandler(amount + 1);
            }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              variants={{ initial: { scale: 1 }, tap: { scale: 1.5 } }}
            >
              <path
                d="M8.75 3.75H6.25V1.25C6.25 0.918479 6.1183 0.600537 5.88388 0.366116C5.64946 0.131696 5.33152 0 5 0C4.66848 0 4.35054 0.131696 4.11612 0.366116C3.8817 0.600537 3.75 0.918479 3.75 1.25V3.75H1.25C0.918479 3.75 0.600537 3.8817 0.366116 4.11612C0.131696 4.35054 0 4.66848 0 5C0 5.33152 0.131696 5.64946 0.366116 5.88388C0.600537 6.1183 0.918479 6.25 1.25 6.25H3.75V8.75C3.75 9.08152 3.8817 9.39946 4.11612 9.63388C4.35054 9.8683 4.66848 10 5 10C5.33152 10 5.64946 9.8683 5.88388 9.63388C6.1183 9.39946 6.25 9.08152 6.25 8.75V6.25H8.75C9.08152 6.25 9.39946 6.1183 9.63388 5.88388C9.8683 5.64946 10 5.33152 10 5C10 4.66848 9.8683 4.35054 9.63388 4.11612C9.39946 3.8817 9.08152 3.75 8.75 3.75Z"
                fill="white"
              />
            </motion.svg>
          </motion.button>
        </div>
        {isTablet && <Stock stock={productData.quantity} />}
        <Button
          onClick={() => {
            dispatch(
              addProductWithAmount({
                productId: productData.id,
                amount,
                productData: {
                  image: getMainImage(images),
                  weight,
                  price,
                  quantity,
                  name,
                },
                shouldNotify: true,
              })
            );
          }}
          size="L"
          type="primary"
          className="flex  w-full lg:w-[186px] h-12"
          disabled={productData.quantity < 1}
        >
          <div className="flex gap-2">
            Dodaj u korpu
            <CartIcon
              color={productData.quantity < 1 ? "#7a7a7a" : "#ffffff"}
            />
          </div>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default MainData;
