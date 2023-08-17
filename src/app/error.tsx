"use client";

import Heading3 from "@/components/common/text/heading/Heading3";

const error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Heading3> Ooops... Nešto je pošlo po zlu. Pokušaj kasnije...</Heading3>
    </div>
  );
};

export default error;
