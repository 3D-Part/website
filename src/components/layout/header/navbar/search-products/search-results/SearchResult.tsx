import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { getMainImage } from "@/shared/helper/getMainImage";
import { ProductInterface } from "@/shared/interfaces/productsInterface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAddToCart } from "@/shared/hooks/useAddToCart";

const SearchResult: React.FC<{
  product: ProductInterface;
  closeDropdown: () => void;
  addToCart: ReturnType<typeof useAddToCart>["addToCart"];
}> = ({ product, closeDropdown, addToCart }) => {
  const canOrder = product.quantity > 0 || product.isBackorder;

  return (
    <Link
      href={`/shop/product/${product.id}`}
      onClick={() => {
        closeDropdown();
      }}
      prefetch
    >
      <div className="flex gap-4 p-2 border-[1px] border-solid border-primary-500 rounded-lg cursor-pointer items-center bg-ne">
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
            {parseFloat(
              product.salePrice ? product.salePrice : product.price
            ).toFixed(2)}{" "}
            KM
          </Paragraph>
          {canOrder ? (
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
                    salePrice: product.salePrice,
                  },
                  shouldNotify: true,
                });
              }}
            >
              Dodaj u korpu
            </button>
          ) : (
            <span className="text-sm text-neutral-300">Nema na stanju</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SearchResult;
