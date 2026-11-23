"use client";
import React from "react";
import useScrollThreshold from "@/shared/hooks/useScrollThreshold";

/**
 * The header stays on top while the page scrolls; once the page has moved, it
 * turns darker so it reads well over the content (and the yellow stripe goes
 * under it).
 */
const HeaderShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrolled = useScrollThreshold(10);
  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-[rgba(10,10,10,0.94)] backdrop-blur-[14px] shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
          : "bg-[rgba(17,17,17,0.72)] backdrop-blur-[14px]"
      }`}
    >
      {children}
    </header>
  );
};

export default HeaderShell;
