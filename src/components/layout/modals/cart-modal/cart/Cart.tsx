"use client";
import Heading2 from "@/components/common/text/heading/Heading2";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { AnimatePresence, motion } from "framer-motion";
import CartProducts from "./CartProducts";
import {
  CartProductsType,
  changePromoCodeInCart,
} from "@/redux/slices/cart/cartSlice";
import {
  cartLengthSelector,
  cartProductsSelector,
  promoCodeSelectorAmount,
} from "@/redux/slices/cart/cartSelectors";
import Button from "@/components/common/button/Button";
import { changeIsGlobalLoading } from "@/redux/slices/ui/uiSlice";
import { couponsService } from "@/shared/services/couponsService";
import { useRef } from "react";
import { MdClear } from "react-icons/md";
import { notify } from "@/components/common/toast/Toastify";

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

const calculatePriceAndPost = (cart: CartProductsType[]) => {
  let price = 0,
    post = 0,
    weight = 0;

  cart.forEach((x) => {
    price =
      price +
      x.amount *
        Number(
          x.productData.salePrice
            ? x.productData.salePrice
            : x.productData.price
        );
    weight += parseFloat(x.productData.weight) * x.amount;
  });

  post = calculateShippingPrice(weight);

  if (price >= freeShippingBoundary) {
    post = 0;
  }

  return { price, post };
};

const Cart = () => {
  const cartLength = useAppSelector(cartLengthSelector);
  const cart = useAppSelector(cartProductsSelector);
  const promoCode = useAppSelector(promoCodeSelectorAmount);
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const { price, post } = calculatePriceAndPost(cart);

  const fetchCouponsAndAddDiscount = async (code: string) => {
    if (!code) {
      return;
    }
    try {
      dispatch(changeIsGlobalLoading(true));
      const res = await couponsService.fetchCoupons();
      let found = false;
      res.rows.forEach((row) => {
        if (row.code === code && !row.userPromotionCode[0].isRedeemed) {
          dispatch(changePromoCodeInCart(row));
          found = true;
        } else {
          //
        }
      });
      if (!found) {
        notify("Kod nije validan", { type: "error", toastId: 25252 });
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(changeIsGlobalLoading(false));
  };

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
        <div className="relative flex w-full">
          <input
            type="text"
            placeholder={"Promo kod"}
            className={`w-full h-10 px-4 py-3 rounded-[66px] border border-primary-500 disabled:cursor-not-allowed bg-transparent disabled:text-neutral-400 ${
              promoCode ? "!border-success-500" : ""
            }`}
            required
            defaultValue={promoCode?.code}
            ref={inputRef}
          />
          {promoCode && (
            <MdClear
              className=" text-neutral-200 min-w-[20px] min-h-[20px] cursor-pointer absolute top-[10px] right-4"
              onClick={() => {
                dispatch(changePromoCodeInCart(null));
              }}
            />
          )}
        </div>
        <Button
          onClick={() => {
            fetchCouponsAndAddDiscount(inputRef.current?.value || "");
          }}
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
        <div className="flex gap-2">
          <p
            className={`text-white text-[28px] font-exo2 font-semibold ${
              promoCode ? "line-through !text-neutral-300 !font-light" : ""
            }`}
          >{`${price.toFixed(2)} KM 
          `}</p>
          {promoCode && (
            <p className=" text-[28px] font-exo2 font-semibold text-success-500">{`${(
              price -
              price * (Number(promoCode.discountPercentage) / 100)
            ).toFixed(2)} KM`}</p>
          )}
        </div>
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
          price -
          (promoCode
            ? price * (Number(promoCode.discountPercentage) / 100)
            : 0) +
          post
        ).toFixed(2)} KM`}</p>
      </div>
    </motion.div>
  );
};

export default Cart;
