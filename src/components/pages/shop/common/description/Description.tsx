import Paragraph from "@/components/common/text/paragraph/Paragraph";
import React from "react";

const Description: React.FC<{ description: string }> = ({ description }) => {
  return (
    <Paragraph size="L" weight="Regular" className="mt-5 text-neutral-200">
      {description}
    </Paragraph>
  );
};

export default Description;
