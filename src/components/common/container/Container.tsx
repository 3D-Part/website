import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`w-full max-w-[1512px] mx-auto my-0 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
