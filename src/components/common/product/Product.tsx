"use client";

import { ProductInterface } from "@/shared/interfaces/productsInterface";
import Image from "next/image";
import React from "react";
import Paragraph from "../text/paragraph/Paragraph";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMainImage } from "@/shared/helper/getMainImage";

let stock = 10;

interface ProductInterfaceComponent extends ProductInterface {
  className?: string;
  imageWidth?: string;
}

const Product: React.FC<ProductInterfaceComponent> = ({
  id,
  name,
  price,
  images,
  className = "",
  imageWidth = "200px",
}) => {
  const router = useRouter();

  return (
    <Link
      href={"/shop/product/" + id}
      onClick={() => {
        router.push("/shop/product/" + id);
      }}
      shallow
    >
      <motion.div
        className={`cursor-pointer bg-neutral-800 p-[10px] rounded-xl max-w-[220px] max-h-[324px] ${className}`}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.35, type: "spring" },
        }}
      >
        <div
          className={`overflow-hidden aspect-square rounded-xl w-[${imageWidth}]`}
        >
          <div className="relative aspect-square bg-neutral-700 rounded-xl">
            <Image
              alt={name}
              src={getMainImage(images)}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="max-w-full mt-4 overflow-hidden overflow-ellipsis">
          <Paragraph
            size="L"
            weight="Semibold"
            className="overflow-hidden overflow-ellipsis break-keep whitespace-nowrap"
          >
            {/* {textFormatter(name, 25)} */}
            {name}
          </Paragraph>
          <div className="flex items-center gap-2 mt-2">
            <Image
              alt={name}
              src={
                stock > 0
                  ? "/assets/img/stock/green.svg"
                  : "/assets/img/stock/red.svg"
              }
              width={15}
              height={15}
            />
            <Paragraph size="XS" weight="Regular">
              {stock > 0 ? "Na stanju" : "Nema na stanju"}
            </Paragraph>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {/* {salePrice && (
              <Paragraph
                size="S"
                weight="Bold"
                className="text-[rgba(248,250,252,0.5)] line-through"
              >
                {price.toFixed(2)} KM
              </Paragraph>
            )} */}
            <Paragraph size="L" weight="Bold">
              {`${parseFloat(price).toFixed(2)} KM`}
            </Paragraph>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default Product;
