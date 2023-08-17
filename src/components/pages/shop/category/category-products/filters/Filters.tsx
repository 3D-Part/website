/* eslint-disable no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Price from "./price/Price";
import Sorter from "./sorter/Sorter";

const Filters: React.FC<{
  priceMin: number | null;
  setPriceMin: (x: number | null) => void;
  priceMax: number | null;
  setPriceMax: (x: number | null) => void;
  order: "ASC" | "DESC" | null;
  setOrder: (x: "ASC" | "DESC" | null) => void;
  field: "name" | "price" | null;
  setField: (x: "name" | "price" | null) => void;
  isLoading: boolean;
}> = ({
  priceMax,
  priceMin,
  setPriceMax,
  setPriceMin,
  field,
  order,
  setField,
  setOrder,
  isLoading,
}) => {
  return (
    <div className="flex flex-wrap gap-8 mt-8">
      <Price
        priceMin={priceMin}
        priceMax={priceMax}
        setPriceMax={(x) => {
          setPriceMax(x);
        }}
        setPriceMin={(x) => {
          setPriceMin(x);
        }}
      />
      <Sorter
        field={field}
        order={order}
        setField={setField}
        setOrder={setOrder}
      />
      {isLoading && (
        <div className="flex items-center justify-center ">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};

export default Filters;
