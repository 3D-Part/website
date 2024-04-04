import Input from "@/components/common/input/Input";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import Textarea from "@/components/common/textarea/Textarea";
import { readElectronPaymentFromLocal } from "@/components/pages/shop/checkout/saveElectronPaymentToLocal";
import React from "react";

const ElectronicOptionForm = () => {
  const userData = readElectronPaymentFromLocal();

  return (
    <>
      <Paragraph size="L" weight="Medium" className="mt-4">
        1. Informacije o kupcu
      </Paragraph>
      <div className="flex gap-4">
        <Input
          placeholder="Ime firme"
          required
          id={"companyName"}
          value={userData ? userData.companyName : ""}
        />
        <Input
          placeholder="Pdv broj firme"
          required
          id={"companyPdv"}
          value={userData ? userData.companyPdv : ""}
        />
      </div>
      <Input
        placeholder="Email"
        id={"email"}
        type="email"
        value={userData ? userData.email : ""}
      />
      <Input
        placeholder="Telefon"
        required
        id={"phone"}
        type="tel"
        value={userData ? userData.phone : ""}
      />
      {/* <Input placeholder="Država" id={"country"} /> */}
      <Input
        placeholder="Ulica"
        id={"street"}
        value={userData ? userData.street : ""}
      />
      <div className="flex gap-4">
        <Input
          placeholder="Grad"
          id={"city"}
          value={userData ? userData.city : ""}
        />
        <Input
          placeholder="ZIP"
          id={"postCode"}
          type="number"
          value={userData ? userData.postCode : ""}
        />
      </div>
      <Input
        placeholder="JIB"
        id={"jib"}
        required
        value={userData ? userData.jib : ""}
      />
      <Textarea
        cols={50}
        id="description"
        maxLength={500}
        placeholder="Dodatni opis"
        rows={4}
      />
    </>
  );
};

export default ElectronicOptionForm;
