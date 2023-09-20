import React from "react";
import { TextComponentInterface } from "../../../../shared/interfaces/textInterfaces";

const Display2: React.FC<TextComponentInterface> = ({
  children,
  className = "",
}) => {
  return (
    <h4
      className={`text-[48px] font-semibold leading-[48px] lg:text-[56px] lg:leading-[72px] ${className}`}
    >
      {children}
    </h4>
  );
};

export default Display2;
