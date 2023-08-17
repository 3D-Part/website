import Heading3 from "@/components/common/text/heading/Heading3";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "404 Greška | 3D Part",
  description: "404 Greška - Stranica nije pronađena",
};

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Heading3> 404 Greška - Stranica nije pronađena</Heading3>
    </div>
  );
};

export default NotFound;
