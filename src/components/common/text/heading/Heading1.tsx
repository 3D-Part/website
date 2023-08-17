import React from "react";
import { TextComponentInterface } from "../../../../shared/interfaces/textInterfaces";

const Heading1: React.FC<TextComponentInterface> = ({
  children,
  className = "",
}) => {
  return (
    <h1
      className={`text-[48px] font-semibold leading-[48px] lg:text-[56px] lg:leading-[72px] ${className}`}
    >
      {children}
    </h1>
  );
};

export default Heading1;
