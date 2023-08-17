import React from "react";
import { TextComponentInterface } from "../../../../shared/interfaces/textInterfaces";

const Heading4: React.FC<TextComponentInterface> = ({
  children,
  className = "",
}) => {
  return (
    <h4
      className={` lg:text-[28px] font-semibold lg:leading-9 text-2xl leading-8 ${className}`}
    >
      {children}
    </h4>
  );
};

export default Heading4;
