import React from "react";
import { TextComponentInterface } from "../../../../shared/interfaces/textInterfaces";

const Heading3: React.FC<TextComponentInterface> = ({
  children,
  className = "",
}) => {
  return (
    <h3
      className={`lg:text-3xl font-bold  lg:leading-9 text-[28px] leading-9 ${className}`}
    >
      {children}
    </h3>
  );
};

export default Heading3;
