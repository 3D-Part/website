"use client";
import Heading2 from "@/components/common/text/heading/Heading2";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { useAppSelector } from "@/redux/hooks";
import { cartLengthSelector } from "@/redux/slices/cartSelectors";
import { motion } from "framer-motion";

const Cart = () => {
  const cartLength = useAppSelector(cartLengthSelector);
  return (
    <motion.div className="w-full h-full px-8 py-4 bg-neutral-800">
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
    </motion.div>
  );
};

export default Cart;
