import { ProductsAttributesInterface } from "@/shared/interfaces/productAttributesInterface";
import React from "react";
import Paragraph from "@/components/common/text/paragraph/Paragraph";

const ProductAttributes: React.FC<{
  productsAttributes: ProductsAttributesInterface[];
}> = ({ productsAttributes }) => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-6 mb-12 overflow-hidden rounded-xl">
      {productsAttributes.map((attr) => {
        return (
          <div
            key={attr.id}
            className={`bg-[rgba(248,250,252,0.1)] h-[70px] flex items-center justify-center `}
          >
            <Paragraph size="L" weight="Regular">
              {attr.attribute.name}: {attr.value}
            </Paragraph>
          </div>
        );
      })}
    </div>
  );
};

export default ProductAttributes;
