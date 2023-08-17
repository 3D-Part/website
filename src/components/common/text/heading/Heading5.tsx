import React from "react";
import { TextComponentInterface } from "../../../../shared/interfaces/textInterfaces";

const Heading5: React.FC<TextComponentInterface> = ({
  children,
  className = "",
}) => {
  return (
    <h5
      className={`lg:text-2xl font-semibold lg:leading-8 text-[20px] leading-7 ${className}`}
    >
      {children}
    </h5>
  );
};

export default Heading5;
