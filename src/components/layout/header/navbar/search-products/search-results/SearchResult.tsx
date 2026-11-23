import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { getSalePrice } from "@/shared/helper/getSalePrice";
import { getMainImage } from "@/shared/helper/getMainImage";
import { ProductInterface } from "@/shared/interfaces/productsInterface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAddToCart } from "@/shared/hooks/useAddToCart";
import { highlightFrame } from "@/shared/helper/highlightFrame";

const SearchResult: React.FC<{
  product: ProductInterface;
  closeDropdown: () => void;
  addToCart: ReturnType<typeof useAddToCart>["addToCart"];
}> = ({ product, closeDropdown, addToCart }) => {
  return (
    <Link
      href={`/shop/product/${product.id}`}
      onClick={() => {
        closeDropdown();
      }}
      prefetch
    >
      <div
        className="flex gap-4 p-2 border-[1px] border-solid border-primary-500 rounded-lg cursor-pointer items-center bg-ne"
        style={
          product.highlightColor
            ? { ...highlightFrame(product.highlightColor), borderColor: product.highlightColor }
            : undefined
        }
      >
        <div className="relative overflow-hidden rounded-lg w-28 h-28 md:w-16 md:h-16 ">
          <Image
            alt={product.name}
            src={getMainImage(product.images)}
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="flex flex-col flex-1 gap-4 md:gap-1">
          <Paragraph
            weight="Semibold"
            size="M"
            className="text-xl text-white md:text-base"
          >
            {product.name}
          </Paragraph>
          <Paragraph weight="Semibold" size="S" className="text-lg md:text-sm">
            {parseFloat(getSalePrice(product) ?? product.price).toFixed(2)}{" "}
            KM
            <span className="ml-2 text-xs font-normal text-neutral-300">
              {product.quantity > 0 ? "Na stanju" : product.isBackorder ? "Po narudžbi" : "Nema na stanju"}
            </span>
          </Paragraph>
          <button
              type="button"
              className="px-3 py-1 text-sm font-semibold text-white rounded-lg w-fit bg-primary-500 hover:bg-primary-600"
              onClick={(event) => {
                // the whole row is a link to the product
                event.preventDefault();
                event.stopPropagation();
                addToCart({
                  amount: 1,
                  productId: product.id,
                  productData: {
                    image: getMainImage(product.images),
                    weight: product.weight,
                    price: product.price,
                    quantity: product.quantity,
                    name: product.name,
                    salePrice: getSalePrice(product) ?? undefined,
                    isBackorder: product.isBackorder,
                  },
                  shouldNotify: true,
                });
              }}
            >
              Dodaj u korpu
            </button>
        </div>
      </div>
    </Link>
  );
};

export default SearchResult;
