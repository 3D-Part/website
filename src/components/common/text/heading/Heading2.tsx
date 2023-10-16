import React from "react";
import { TextComponentInterface } from "../../../../shared/interfaces/textInterfaces";

const Heading2: React.FC<TextComponentInterface> = ({
  children,
  className = "",
}) => {
  return (
    <h2
      className={`lg:text-4xl font-bold  text-[28px] leading-10 ${className}`}
    >
      {children}
    </h2>
  );
};

export default Heading2;
