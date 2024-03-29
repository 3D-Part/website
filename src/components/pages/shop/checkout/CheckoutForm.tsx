"use client";

import Radio from "@/components/common/radio/Radio";
import Heading2 from "@/components/common/text/heading/Heading2";
import { orderServices } from "../../../../../services/orderServices";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { notify } from "@/components/common/toast/Toastify";
import { useState } from "react";
import { changeIsGlobalLoading } from "@/redux/slices/ui/uiSlice";
import { useRouter } from "next/navigation";
import {
  cartProductsSelector,
  promoCodeSelectorAmount,
} from "@/redux/slices/cart/cartSelectors";
import {
  changePromoCodeInCart,
  changeSuccessfulOrder,
  resetCart,
} from "@/redux/slices/cart/cartSlice";
import PickupOptionForm from "./PickupOptionForm";
import ElectronicOptionForm from "./ElectronicOptionForm";
import { saveElectronPaymentToLocal } from "@/components/pages/shop/checkout/saveElectronPaymentToLocal";
import { clearCartProducts } from "@/shared/helper/cartProducts";

const CheckoutForm = () => {
  const products = useAppSelector(cartProductsSelector);
  const promoCode = useAppSelector(promoCodeSelectorAmount);

  const [buttonDisabled, setBUttonDisabled] = useState(false);
  const [payingOption, setPayingOption] = useState("0");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const isButtonDisabled = buttonDisabled || products.length === 0;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setBUttonDisabled(true);
    dispatch(changeIsGlobalLoading(true));

    const payload: any =
      payingOption === "0"
        ? {
            city: event.target.city.value,
            email: event.target.email.value,
            fullName: event.target.fullName.value,
            phone: event.target.phone.value,
            postCode: event.target.postCode.value,
            products: products.map((x) => {
              return { productId: x.idProduct, quantity: x.amount };
            }),
            street: event.target.street.value,
          }
        : {
            companyName: event.target.companyName.value,
            companyPdv: event.target.companyPdv.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            // country: event.target.country.value,
            street: event.target.street.value,
            city: event.target.city.value,
            postCode: event.target.postCode.value,
            jib: event.target.jib.value,
            description: event.target.description.value,

            products: products.map((x) => {
              return { productId: x.idProduct, quantity: x.amount };
            }),
          };

    if (promoCode) {
      payload.code = promoCode.code;
    }

    try {
      const data = await orderServices.createOrder(payload);
      notify("Narudžba kreirana", { type: "success" });
      dispatch(resetCart());
      dispatch(changeSuccessfulOrder(data));

      if (payingOption === "1") {
        saveElectronPaymentToLocal(payload);
      }

      dispatch(changePromoCodeInCart(null));
      clearCartProducts();
      router.push("/shop/checkout/successful");
    } catch (error: any) {
      if (error?.response?.data.errors[0].message) {
        setTimeout(() => {
          notify(error?.response?.data.errors[0].message, { type: "error" });
        }, 300);
      } else {
        router.push("/shop/checkout/failed");
      }
    }
    setBUttonDisabled(false);
    dispatch(changeIsGlobalLoading(false));
  };

  return (
    <div className="w-full ">
      <Heading2>Kompletirajte svoju narudžbu</Heading2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex gap-2 mt-8">
          <Radio
            name="pay"
            title="Plaćanje pouzećem"
            value={"0"}
            checked={payingOption === "0"}
            onChange={() => {
              setPayingOption("0");
            }}
          />
          <Radio
            name="pay"
            title="Plaćanje Žiralno"
            value={"1"}
            checked={payingOption === "1"}
            onChange={() => {
              setPayingOption("1");
            }}
          />
        </div>
        {/* ----- */}
        <div className="flex flex-col gap-3">
          {payingOption === "0" && <PickupOptionForm />}
          {payingOption === "1" && <ElectronicOptionForm />}
        </div>
        {/* ------ */}
        <input
          type="submit"
          value={`Završi kupovinu `}
          onSubmit={handleSubmit}
          className={`w-full h-12 mt-10 text-base font-bold rounded-lg ${
            isButtonDisabled
              ? "cursor-not-allowed bg-neutral-500"
              : "cursor-pointer bg-primary-500"
          }`}
          disabled={isButtonDisabled}
        />
      </form>
    </div>
  );
};

export default CheckoutForm;
