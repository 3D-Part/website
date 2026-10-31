import Paragraph from "@/components/common/text/paragraph/Paragraph";
import Image from "next/image";
import React from "react";

const Stock: React.FC<{ stock: number; byOrder?: boolean }> = ({
  stock,
  byOrder = false,
}) => {
  if (byOrder) {
    return (
      <div className="flex items-center gap-2 px-8 py-4 rounded-lg w-fit bg-[rgba(234,179,8,0.2)]">
        <Paragraph size="M" weight="Regular">
          Po narudžbi
        </Paragraph>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 px-8 py-4 rounded-lg w-fit ${
        stock > 0 ? "bg-[rgba(34,197,94,0.2)]" : "bg-[rgba(239,68,68,0.2)]"
      }`}
    >
      <Image
        alt={"Stock icon"}
        src={
          stock > 0
            ? "/assets/img/stock/green.svg"
            : "/assets/img/stock/red.svg"
        }
        width={24}
        height={24}
      />
      <Paragraph size="M" weight="Regular">
        {stock > 0 ? "Na stanju" : "Nema na stanju"}
      </Paragraph>
    </div>
  );
};

export default Stock;
