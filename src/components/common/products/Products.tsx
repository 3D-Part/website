"use client";
import { ProductInterface } from "@/shared/interfaces/productsInterface";
import React from "react";
import Button from "../button/Button";
import ProductsSlide from "./products-slide/ProductsSlide";
import { motion } from "framer-motion";

interface InterfaceProducts {
  products: ProductInterface[];
  children: React.ReactNode;
  linkToAll?: string;
  className?: string;
  animationVariants?: { initial: Object; animate: Object };
}

const Products: React.FC<InterfaceProducts> = ({
  children,
  products,
  linkToAll,
  className = "",
  animationVariants,
}) => {
  return (
    <motion.div
      className={`relative max-w-full ${className}`}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <div
        className={`flex flex-col w-full lg:flex-row  lg:items-center ${
          children ? "lg:justify-between" : "lg:justify-end"
        }`}
      >
        <div>{children}</div>
        {linkToAll && (
          <div className="hidden lg:block">
            <Button
              text="Pogledaj sve"
              onClick={() => {}}
              size="L"
              type="secondary"
              className="bottom-0 left-0 "
            ></Button>
          </div>
        )}
      </div>
      <ProductsSlide
        products={products}
        animationVariants={animationVariants}
      />
      {linkToAll && (
        <Button
          text="Pogledaj sve"
          onClick={() => {}}
          size="L"
          type="secondary"
          className="bottom-0 left-0 mx-auto mt-6 lg:hidden"
        ></Button>
      )}
    </motion.div>
  );
};

export default Products;
