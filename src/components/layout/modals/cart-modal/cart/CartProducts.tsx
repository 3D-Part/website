"use client";
import { useAppDispatch } from "@/redux/hooks";
import {
  CartProductsType,
  addProductWithAmount,
  decreaseProductWithAmount,
  removeProduct,
} from "@/redux/slices/cart/cartSlice";
import Image from "next/image";
import { motion } from "framer-motion";
import Heading6 from "@/components/common/text/heading/Heading6";
import Paragraph from "@/components/common/text/paragraph/Paragraph";

const CartProducts: React.FC<{ product: CartProductsType }> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <motion.div
      className="flex items-center w-full gap-2 p-2"
      exit={{ x: 600, opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <X
        onClick={() => {
          dispatch(removeProduct({ productId: product.idProduct }));
        }}
      />
      <div className="border-solid rounded-lg border-primary-500 border-[2px] lg:w-[80px] lg:h-[80px] w-[70px] h-[70px] relative mr-[6px]">
        <Image
          src={product.productData.image}
          alt={product.productData.name}
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <Heading6 className="text-base text-white lg:text-lg md:text-lg">
          {product.productData.name}
        </Heading6>
        <p className="text-xs font-normal text-neutral-200">
          Težina:{" "}
          <span className="text-white ">
            {parseFloat(product.productData.weight) * product.amount} g
          </span>
        </p>
        <div className="flex items-center justify-between w-full">
          <div className="bg-neutral-700 lg:p-[3px] p-[2px] flex gap-3 lg:gap-4 items-center rounded-lg mt-[3px] lg:mt-[6px]">
            <motion.button
              className="lg:w-6 lg:h-6 w-4 h-4 rounded-[4px] flex items-center justify-center bg-neutral-900 cursor-pointer"
              whileTap="tap"
              onClick={() => {
                dispatch(
                  decreaseProductWithAmount({
                    productId: product.idProduct,
                    amount: 1,
                  })
                );
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
              {product.amount}
            </Paragraph>
            <motion.button
              className="lg:w-6 lg:h-6 w-4 h-4 rounded-[4px] flex items-center justify-center bg-neutral-900 cursor-pointer"
              whileTap="tap"
              onClick={() => {
                dispatch(
                  addProductWithAmount({
                    productId: product.idProduct,
                    productData: product.productData,
                    shouldNotify: false,
                    amount: 1,
                  })
                );
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
          <p className="text-white  text-[16px] lg:text-[20px] font-exo2 font-semibold">{`${(
            product.amount *
            Number(
              product.productData.salePrice
                ? product.productData.salePrice
                : product.productData.price
            )
          ).toFixed(2)} KM`}</p>
        </div>
      </div>
    </motion.div>
  );
};

const X: React.FC<{ onClick: any }> = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      onClick={() => {
        onClick();
      }}
      className="cursor-pointer"
    >
      <rect width="24" height="24" rx="12" fill="#EF4444" fillOpacity="0.2" />
      <path
        d="M12.0225 12.9214L7.52254 17.4214C7.39397 17.55 7.24397 17.6143 7.07254 17.6143C6.90112 17.6143 6.75112 17.55 6.62254 17.4214C6.49397 17.2928 6.42969 17.1428 6.42969 16.9714C6.42969 16.8 6.49397 16.65 6.62254 16.5214L11.1225 12.0214L6.62254 7.52142C6.49397 7.39284 6.42969 7.24284 6.42969 7.07142C6.42969 6.89999 6.49397 6.74999 6.62254 6.62142C6.75112 6.49284 6.90112 6.42856 7.07254 6.42856C7.24397 6.42856 7.39397 6.49284 7.52254 6.62142L12.0225 11.1214L16.5225 6.62142C16.6511 6.49284 16.8011 6.42856 16.9725 6.42856C17.144 6.42856 17.294 6.49284 17.4225 6.62142C17.5511 6.74999 17.6154 6.89999 17.6154 7.07142C17.6154 7.24284 17.5511 7.39284 17.4225 7.52142L12.9225 12.0214L17.4225 16.5214C17.5511 16.65 17.6154 16.8 17.6154 16.9714C17.6154 17.1428 17.5511 17.2928 17.4225 17.4214C17.294 17.55 17.144 17.6143 16.9725 17.6143C16.8011 17.6143 16.6511 17.55 16.5225 17.4214L12.0225 12.9214Z"
        fill="#EF4444"
      />
    </svg>
  );
};

export default CartProducts;
