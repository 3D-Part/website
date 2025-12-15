/* eslint-disable no-unused-vars */
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import React, { useState } from "react";

const Sorter: React.FC<{
  order: "ASC" | "DESC" | null;
  setOrder: (x: "ASC" | "DESC" | null) => void;
  field: "name" | "price" | null;
  setField: (x: "name" | "price" | null) => void;
}> = ({ field, order, setField, setOrder }) => {
  const [selected, setSelected] = useState("0");

  return (
    <div>
      <Paragraph size="L" weight="Bold" className="mb-1">
        Sortiraj po
      </Paragraph>

      <select
        onChange={(event) => {
          const x = event.target.value;

          setSelected(x);

          if (x === "0") {
            setOrder(null);
            setField(null);
          } else if (x === "1") {
            setOrder("DESC");
            setField("price");
          } else if (x === "2") {
            setOrder("ASC");
            setField("price");
          } else if (x === "3") {
            setOrder("DESC");
            setField("name");
          } else if (x === "4") {
            setOrder("ASC");
            setField("name");
          }
        }}
        className="bg-neutral-700 h-8 w-[174px] rounded-lg px-3 focus:ring-primary-600 focus:border-primary-400 block dark:bg-black dark:border-black dark:placeholder-bg-success-400 dark:text-white dark:focus:ring-error-400 dark:focus:border-success-100 select"
        value={selected}
      >
        <option value={"0"}>Najpopularnije</option>
        <option value={"1"}>Cijena opadajuće</option>
        <option value={"2"}>Cijena rastuće</option>
        <option value={"3"}>Naziv rastuće</option>
        <option value={"4"}>Naziv opadajuće</option>
      </select>
    </div>
  );
};

export default Sorter;
