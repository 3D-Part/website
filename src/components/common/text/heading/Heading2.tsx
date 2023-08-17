import React from "react";
import { TextComponentInterface } from "../../../../shared/interfaces/textInterfaces";

const Heading2: React.FC<TextComponentInterface> = ({
  children,
  className = "",
}) => {
  return (
    <h2
      className={`lg:text-5xl font-bold lg:leading-[48px] text-[32px] leading-10 ${className}`}
    >
      {children}
    </h2>
  );
};

export default Heading2;
