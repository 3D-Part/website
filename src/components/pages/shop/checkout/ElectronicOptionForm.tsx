import Input from "@/components/common/input/Input";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import Textarea from "@/components/common/textarea/Textarea";
import React from "react";

const ElectronicOptionForm = () => {
  return (
    <>
      <Paragraph size="L" weight="Medium" className="mt-4">
        1. Informacije o kupcu
      </Paragraph>
      <div className="flex gap-4">
        <Input placeholder="Ime" required id={"name"} />
        <Input placeholder="Prezime" required id={"surname"} />
      </div>
      <Input placeholder="Email" id={"email"} type="email" />
      <Input placeholder="Telefon" required id={"phone"} type="tel" />
      {/* <Input placeholder="Država" id={"country"} /> */}
      {/* <Input placeholder="Ulica" id={"street"} /> */}
      <div className="flex gap-4">
        <Input placeholder="Grad" id={"city"} />
        <Input placeholder="ZIP" id={"postCode"} type="number" />
      </div>
      <Input placeholder="JIB" id={"jib"} required />
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
