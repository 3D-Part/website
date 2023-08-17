import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image
        alt="3d part logo"
        src={"/assets/img/logo.svg"}
        width={138 * 2}
        height={44 * 2}
        className="animate-pulse translate-y-[-42.5px] lg:translate-y-[-72.5px]"
      />
    </div>
  );
};

export default loading;
