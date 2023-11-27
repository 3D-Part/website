"use client";

import Input from "@/components/common/input/Input";
import Radio from "@/components/common/radio/Radio";
import Heading2 from "@/components/common/text/heading/Heading2";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import Textarea from "@/components/common/textarea/Textarea";
import { orderServices } from "../../../../../services/orderServices";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { notify } from "@/components/common/toast/Toastify";
import { useState } from "react";
import { changeIsGlobalLoading } from "@/redux/slices/ui/uiSlice";
import { useRouter } from "next/navigation";
import { cartProductsSelector } from "@/redux/slices/cart/cartSelectors";
import {
  changeSuccessfulOrder,
  resetCart,
} from "@/redux/slices/cart/cartSlice";
import PickupOptionForm from "./PickupOptionForm";
import ElectronicOptionForm from "./ElectronicOptionForm";

const CheckoutForm = () => {
  const products = useAppSelector(cartProductsSelector);

  const [buttonDisabled, setBUttonDisabled] = useState(false);
  const [payingOption, setPayingOption] = useState("0");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setBUttonDisabled(true);
    dispatch(changeIsGlobalLoading(true));

    try {
      const data = await orderServices.createOrder({
        city: event.target.city.value,
        email: event.target.email.value,
        fullName: event.target.name.value + " " + event.target.surname.value,
        phone: event.target.phone.value,
        postCode: event.target.postCode.value,
        products: products.map((x) => {
          return { productId: x.idProduct, quantity: x.amount };
        }),
        street: event.target.street.value,
      });
      notify("Narudžba kreirana", { type: "success" });
      dispatch(resetCart());
      dispatch(changeSuccessfulOrder(data));
      router.push("/shop/checkout/successful");
    } catch (error: any) {
      const parsedError = JSON.parse(error.message);
      if (parsedError.key === "VALIDATION_ERROR") {
        parsedError.errors.forEach((err: any, i: number) => {
          setTimeout(() => {
            notify(err.message, { type: "error" });
          }, 100 * i);
        });
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
          className="w-full h-12 mt-10 text-base font-bold rounded-lg cursor-pointer bg-primary-500"
          disabled={buttonDisabled}
        />
      </form>
    </div>
  );
};

export default CheckoutForm;
