"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { AnimatePresence, motion } from "framer-motion";
import Cart from "./cart/Cart";
import { Path } from "../../header/hamburger/Hamburger";
import Button from "@/components/common/button/Button";
import { useRouter } from "next/navigation";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import {
  cartModalVisibleSelector,
  promoCodeSelectorAmount,
} from "@/redux/slices/cart/cartSelectors";
import { changeCartModalVisible } from "@/redux/slices/cart/cartSlice";
import Link from "next/link";

const CartModal = () => {
  const isOpen = useAppSelector(cartModalVisibleSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(17,17,17,0.78)] cursor-pointer min-w-[360px]"
            onClick={() => {
              dispatch(changeCartModalVisible(false));
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full h-full lg:w-[500px] ml-auto">
              <motion.button
                onClick={() => {
                  dispatch(changeCartModalVisible(false));
                }}
                className={`h-10 w-10 z-[300] transition-all duration-500 absolute right-8 top-4 bg-neutral-700 rounded-lg flex justify-center items-center`}
                initial={"initial"}
                animate={"open"}
                variants={{
                  initial: { opacity: 0, scale: 0 },
                  open: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.1 },
                  },
                }}
                aria-label="Menu"
              >
                <svg viewBox="0 0 21.5 20" className={`h-6 w-6`}>
                  <Path
                    variants={{
                      open: { d: "M 3 16.5 L 17 2.5" },
                    }}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <Path
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                      open: { opacity: 0 },
                    }}
                    transition={{ duration: 0.1 }}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <Path
                    variants={{
                      open: { d: "M 3 2.5 L 17 16.346" },
                    }}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.button>
              <motion.div
                initial={{ x: 500 }}
                animate={{ x: 0 }}
                exit={{ x: 500 }}
                transition={{ type: "tween", ease: "easeInOut" }}
                className="flex flex-col w-full h-full"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Cart />
                <div className=" px-4 lg:px-8 flex items-center gap-3 pb-8 lg:pb-[58px] bg-neutral-800">
                  <Button
                    onClick={() => {
                      dispatch(changeCartModalVisible(false));
                    }}
                    type="secondary"
                    size="L"
                    className="w-1/2"
                  >
                    <Paragraph size="M" weight="Bold">
                      Nastavi kupovinu
                    </Paragraph>
                  </Button>
                  <Link
                    href={"/shop/checkout"}
                    onClick={() => {
                      router.push("/shop/checkout");
                      dispatch(changeCartModalVisible(false));
                    }}
                    className="w-1/2"
                    prefetch
                  >
                    <Button
                      onClick={() => {
                        router.push("/shop/checkout");
                        dispatch(changeCartModalVisible(false));
                      }}
                      type="primary"
                      size="L"
                      className="w-full"
                    >
                      <Paragraph size="M" weight="Bold">
                        Kupi
                      </Paragraph>
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartModal;
