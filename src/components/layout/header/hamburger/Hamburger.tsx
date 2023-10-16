"use client";

import { useIsPhone, useIsTablet } from "@/shared/hooks/useMediaQuerry";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import MobileMenu from "./mobile-menu/MobileMenu";

export const Path = (props: any) => (
  <motion.path
    fill="#fff"
    strokeWidth="3"
    stroke="#fff"
    strokeLinecap="round"
    {...props}
  />
);

const Hamburger: React.FC<{
  links: any;
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
}> = ({ links, isOpen, setIsOpen }) => {
  const isTablet = useIsTablet();
  const isPhone = useIsPhone();

  return (
    <>
      {isTablet && (
        <>
          <motion.button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className={`h-9 w-9 z-[300] transition-all duration-500 ${
              isOpen && isPhone && "translate-y-[-68px]"
            }`}
            animate={isOpen ? "open" : "closed"}
            aria-label="Menu"
          >
            <svg viewBox="0 0 21.5 20" className={`h-9 w-9`}>
              <Path
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5" },
                  open: { d: "M 3 16.5 L 17 2.5" },
                }}
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <Path
                variants={{
                  closed: { d: "M 2 16.346 L 20 16.346" },
                  open: { d: "M 3 2.5 L 17 16.346" },
                }}
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>
        </>
      )}
      <AnimatePresence>
        {isOpen && isTablet && (
          <MobileMenu
            links={links}
            onClick={() => {
              setIsOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Hamburger;
