"use client";
import Heading2 from "@/components/common/text/heading/Heading2";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { useAppSelector } from "@/redux/hooks";
import {
  cartLengthSelector,
  cartProductsSelector,
} from "@/redux/slices/cartSelectors";
import { CartProductsType } from "@/redux/slices/cartSlice";
import { AnimatePresence, motion } from "framer-motion";
import CartProducts from "./CartProducts";

const calculatePriceAndPost = (cart: CartProductsType[]) => {
  let price = 0,
    post = 0;

  cart.forEach((x) => {
    price = price + x.amount * Number(x.productData.price);
  });

  return { price, post };
};

const Cart = () => {
  const cartLength = useAppSelector(cartLengthSelector);
  const cart = useAppSelector(cartProductsSelector);

  const { price, post } = calculatePriceAndPost(cart);

  return (
    <motion.div className="flex flex-col w-full h-full px-8 py-4 cursor-default bg-neutral-800">
      <Heading2>Korpa</Heading2>
      <div className="mt-[10px] bg-neutral-600 w-min px-2 py-1 rounded-[77px]">
        <Paragraph
          size="XS"
          weight="Regular"
          className="whitespace-nowrap"
        >{`${cartLength} ${
          cartLength === 1 ? "Proizvod" : "Proizvoda"
        } u korpi`}</Paragraph>
      </div>
      <div className="flex-1 my-4 overflow-x-hidden overflow-y-auto">
        <AnimatePresence>
          {cart.map((product) => {
            return <CartProducts product={product} key={product.idProduct} />;
          })}
        </AnimatePresence>
      </div>

      {/* --------------- */}
      <div className="h-[1px] bg-neutral-500"></div>
      <div className="flex items-center justify-between mt-3">
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
