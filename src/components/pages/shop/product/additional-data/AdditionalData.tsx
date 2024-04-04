"use client";
import Heading5 from "@/components/common/text/heading/Heading5";
import { ProductsAttributesInterface } from "@/shared/interfaces/productAttributesInterface";
import React, { useState } from "react";
import ProductAttributes from "./product-attributes/ProductAttributes";

const AdditionalData: React.FC<{
  detailedDescription?: string;
  productsAttributes: ProductsAttributesInterface[];
}> = ({ detailedDescription = "", productsAttributes }) => {
  const [activeSection, setActiveSection] = useState(0);
  return (
    <div className="w-full ">
      <div className="flex w-full max-w-fit overflow-x-auto gap-3 p-2  rounded-lg  bg-neutral-800 mt-[60px] lg:mt-8 ">
        <button
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            activeSection === 0 ? "bg-neutral-700" : "bg-neutral-800"
          }`}
          onClick={() => {
            setActiveSection(0);
          }}
        >
          <Heading5 className="inline-block whitespace-nowrap">
            Detaljan opis
          </Heading5>
        </button>
        {productsAttributes.length ? (
          <button
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              activeSection === 1 ? "bg-neutral-700" : "bg-neutral-800"
            }`}
            onClick={() => {
              setActiveSection(1);
            }}
          >
            <Heading5 className="inline-block whitespace-nowrap">
              Tehničke specifikacije
            </Heading5>
          </button>
        ) : (
          <></>
        )}
      </div>
      {activeSection === 0 && (
        <p
          dangerouslySetInnerHTML={{ __html: detailedDescription }}
          className="mt-6 mb-12 text-lg font-normal lg:text-start text-neutral-300"
        />
      )}
      {activeSection === 1 && (
        <ProductAttributes productsAttributes={productsAttributes} />
      )}
    </div>
  );
};

export default AdditionalData;
