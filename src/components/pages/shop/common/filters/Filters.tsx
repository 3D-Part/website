/* eslint-disable no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Price from "./price/Price";
import Sorter from "./sorter/Sorter";
import { categoriesServices } from "../../../../../../services/categoriesServices";
import { get } from "http";
import Categories from "./categories/Categories";

const Filters: React.FC<{
  priceMin: number | null;
  setPriceMin: (x: number | null) => void;
  priceMax: number | null;
  setPriceMax: (x: number | null) => void;
  order: "ASC" | "DESC" | null;
  setOrder: (x: "ASC" | "DESC" | null) => void;
  filterByProductAttributes: string | undefined;
  setFilterByProductAttributes: (x: string | undefined) => void;
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
  filterByProductAttributes,
  setFilterByProductAttributes,
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
        {/* TODO - add filters for category attributes */}
        <Categories filterByProductAttributes={filterByProductAttributes} setFilterByProductAttributes={setFilterByProductAttributes} />
      </div>
    );
  };

export default Filters;
