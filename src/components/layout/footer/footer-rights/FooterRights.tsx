import Paragraph from "@/components/common/text/paragraph/Paragraph";
import React from "react";

const FooterRights = () => {
  return (
    <div className="flex items-center justify-center w-full h-10 bg-neutral-700">
      <Paragraph size="M" weight="Regular">
        © 2023 3D Print - Sva prava zadržana
      </Paragraph>
    </div>
  );
};

export default FooterRights;
