import Paragraph from "@/components/common/text/paragraph/Paragraph";
import React from "react";

const Price: React.FC<{
  priceMin: number | null;
  priceMax: number | null;
  setPriceMin: (x: number | null) => void;
  setPriceMax: (x: number | null) => void;
}> = ({ priceMax, priceMin, setPriceMax, setPriceMin }) => {
  return (
    <div>
      <Paragraph size="L" weight="Bold" className="mb-1">
        Cijena (KM)
      </Paragraph>

      <div className="flex flex-wrap gap-4">
        <input
          type="number"
          placeholder="Min"
          className="h-8 p-3 rounded-lg appearance-none bg-neutral-700 text-neutral-100 w-[138px]"
          value={priceMin !== null ? priceMin : ""}
          onChange={(e) => {
            // typewatch(() => setPriceMin(e.target.value), 1000);
            setPriceMin(
              isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber
            );
          }}
        />
        <input
          type="number"
          placeholder="Max"
          className="h-8 p-3 rounded-lg appearance-none bg-neutral-700 text-neutral-100 w-[138px]"
          value={priceMax !== null ? priceMax : ""}
          onChange={(e) => {
            setPriceMax(e.target.valueAsNumber);
          }}
        />
      </div>
    </div>
  );
};

export default Price;
