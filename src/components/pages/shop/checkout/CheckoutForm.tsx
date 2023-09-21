"use client";

import Input from "@/components/common/input/Input";
import Radio from "@/components/common/radio/Radio";
import Heading2 from "@/components/common/text/heading/Heading2";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import Textarea from "@/components/common/textarea/Textarea";
import { orderServices } from "../../../../../services/orderServices";
import { useAppSelector } from "@/redux/hooks";
import { cartProductsForOrderSelector } from "@/redux/slices/cartSelectors";

const CheckoutForm = () => {
  const products = useAppSelector(cartProductsForOrderSelector);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    orderServices.createOrder({
      city: event.target.city.value,
      email: event.target.email.value,
      fullName: event.target.name.value + " " + event.target.surname.value,
      phone: event.target.phone.value,
      postCode: event.target.postCode.value,
      products,
      street: event.target.street.value,
    });
  };

  return (
    <div className="w-full">
      <Heading2>Kompletirajte svoju narudžbu</Heading2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex mt-8">
          <Radio
            name="pay"
            title="Plaćanje pouzećem"
            value="0"
            checked={true}
          />
        </div>
        {/* ----- */}
        <div className="flex flex-col gap-3">
          <Paragraph size="L" weight="Medium" className="mt-4">
            1. Informacije o kupcu
          </Paragraph>
          <div className="flex gap-4">
            <Input placeholder="Ime" id={"name"} />
            <Input placeholder="Prezime" id={"surname"} />
          </div>
          <Input placeholder="Email" id={"email"} type="email" />
          <Input placeholder="Telefon" id={"phone"} type="tel" />
          <Input placeholder="Država" id={"country"} />
          <Input placeholder="Ulica" id={"street"} />
          <div className="flex gap-4">
            <Input placeholder="Grad" id={"city"} />
            <Input placeholder="ZIP" id={"postCode"} type="number" />
          </div>
          <Input placeholder="JIB" id={"jib"} />
          <Textarea
            cols={50}
            id="description"
            maxLength={500}
            placeholder="Dodatni opis"
            rows={4}
          />
        </div>
        {/* ------ */}
        <input
          type="submit"
          value="Završi kupovinu"
          onSubmit={handleSubmit}
          className="w-full h-12 mt-10 text-base font-bold rounded-lg cursor-pointer bg-primary-500"
        />
      </form>
    </div>
  );
};

export default CheckoutForm;
