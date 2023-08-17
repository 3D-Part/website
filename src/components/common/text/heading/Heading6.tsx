import React from "react";
import { TextComponentInterface } from "../../../../shared/interfaces/textInterfaces";

const Heading6: React.FC<TextComponentInterface> = ({
  children,
  className = "",
}) => {
  return (
    <h6
      className={`lg:text-[20px] font-semibold lg:leading-7 text-lg leading-7 ${className}`}
    >
      {children}
    </h6>
  );
};

export default Heading6;
