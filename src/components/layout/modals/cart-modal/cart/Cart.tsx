"use client";
import Heading2 from "@/components/common/text/heading/Heading2";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { useAppSelector } from "@/redux/hooks";

import { AnimatePresence, motion } from "framer-motion";
import CartProducts from "./CartProducts";
import { CartProductsType } from "@/redux/slices/cart/cartSlice";
import {
  cartLengthSelector,
  cartProductsSelector,
  promoCodeSelectorAmount,
} from "@/redux/slices/cart/cartSelectors";
import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";

const freeShippingBoundary = 100;

const calculateShippingPrice = (weight: number): number => {
  if (weight === 0) {
    return 0;
  }
  weight = weight / 1000;

  switch (true) {
    case weight <= 10:
      return 8;
    case weight <= 20:
      return 12;
    case weight <= 30:
      return 15;
    case weight <= 40:
      return 23;
    case weight <= 50:
      return 33;
    default:
      const weightLeft = weight - 50;
      const price: number = 33 + (weightLeft / 5) * 2;
      return Math.round(price * 1e2) / 1e2;
  }
};

const calculatePriceAndPost = (
  cart: CartProductsType[],
  promoCode: null | number
) => {
  let price = 0,
    post = 0,
    weight = 0;

  cart.forEach((x) => {
    price = price + x.amount * Number(x.productData.price);
    weight += parseFloat(x.productData.weight) * x.amount;
  });

  post = calculateShippingPrice(weight);

  if (price >= freeShippingBoundary) {
    post = 0;
  }

  if (promoCode) {
    price = price - price * (promoCode / 100);
  }

  return { price, post };
};

const Cart = () => {
  const cartLength = useAppSelector(cartLengthSelector);
  const cart = useAppSelector(cartProductsSelector);
  const promoCode = useAppSelector(promoCodeSelectorAmount);

  const { price, post } = calculatePriceAndPost(cart, promoCode);

  return (
    <motion.div className="flex flex-col w-full h-full px-4 py-2 overflow-y-auto cursor-default lg:px-8 lg:py-4 bg-neutral-800">
      <Heading2>Korpa</Heading2>
      <div className="lg:mt-[10px] mt-1 bg-neutral-600 w-min px-2 py-1 rounded-[77px]">
        <Paragraph
          size="XS"
          weight="Regular"
          className="whitespace-nowrap"
        >{`${cartLength} ${
          cartLength === 1 ? "Proizvod" : "Proizvoda"
        } u korpi`}</Paragraph>
      </div>
      <div className="flex-1 my-2 overflow-x-hidden overflow-y-auto lg:my-4">
        <AnimatePresence>
          {cart.map((product) => {
            return <CartProducts product={product} key={product.idProduct} />;
          })}
        </AnimatePresence>
      </div>

      {/* --------------- */}
      <div className="h-[1px] bg-neutral-500"></div>
      <div className="flex items-center gap-5 mt-4">
        <input
          type="text"
          placeholder={"Promo kod"}
          className="w-full h-10 px-4 py-3 rounded-[66px] border border-primary-500 disabled:cursor-not-allowed bg-transparent disabled:text-neutral-400"
          required
        />
        <Button
          onClick={() => {}}
          size="L"
          type="secondary"
          className="w-[100px] h-12"
        >
          Uracunaj
        </Button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Paragraph size="L" weight="Regular" className="text-neutral-200">
          Zbir{" "}
        </Paragraph>
        <p className="text-white text-[28px] font-exo2 font-semibold">{`${price.toFixed(
          2
        )} KM`}</p>
      </div>

      <div className="flex items-center justify-between my-3">
        <Paragraph size="L" weight="Regular" className="text-neutral-200">
          Poštarina{" "}
        </Paragraph>
        <p className="text-white text-[28px] font-exo2 font-semibold">{`${post.toFixed(
          2
        )} KM`}</p>
      </div>
      <div className="h-[1px] bg-neutral-500"></div>

      <div className="flex items-center justify-between my-3">
        <p className="text-white text-[20px] font-semibold">UKUPNO </p>
        <p className="text-success-500 text-[28px] font-exo2 font-semibold">{`${(
          price + post
        ).toFixed(2)} KM`}</p>
      </div>
    </motion.div>
  );
};

export default Cart;
