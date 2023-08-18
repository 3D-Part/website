/* eslint-disable no-unused-vars */
"use client";

import Link from "next/link";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import NavSubLinks from "../nav-sub-links/NavSubLinks";
import { IoIosArrowDown } from "react-icons/io";
import OutsideAlerter from "@/shared/hooks/useOutsideAlerter";

export interface NavLinkProps {
  i?: number;
  text: string;
  link: string;
  links: NavLinkProps[];
  activeLink: null | number;
  activeSubLink: null | number;
  setActiveLink: (x: number | null) => void;
  setActiveSubLink: (x: number | null) => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  i = 0,
  text,
  link,
  links,
  activeSubLink,
  activeLink,
  setActiveLink,
  setActiveSubLink,
}) => {
  return (
    <OutsideAlerter
      outsideClickHandler={() => {
        if (activeLink === i) {
          setActiveLink(null);
          setActiveSubLink(null);
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 * i }}
        className="relative left-0 flex items-center cursor-pointer"
      >
        <div
          onClick={() => {
            if (activeLink === i) {
              console.log("reset");
              setActiveLink(null);
              setActiveSubLink(null);
            } else {
              console.log("i");
              setActiveLink(i);
              setActiveSubLink(null);
            }
          }}
          className="flex items-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ ease: "easeInOut", type: "tween" }}
            className="flex items-center"
          >
            <Paragraph size="M" weight="Regular" className="p-[10px] pr-1 ">
              {text}
            </Paragraph>
            <IoIosArrowDown></IoIosArrowDown>
          </motion.div>
        </div>

        {activeLink !== null && activeLink === i && (
          <div
            className={
              "absolute  rounded-lg left-0  bg-neutral-800 top-[68px] flex py-4 overflow-hidden transition-all "
            }
          >
            {activeLink === i && (
              <NavSubLinks
                links={links}
                setActive={(x: number | null) => {
                  setActiveSubLink(x);
                }}
                i={activeLink}
                activeLink={activeSubLink}
              />
            )}
            {activeSubLink !== null && (
              <NavSubLinks
                links={links[activeSubLink].links}
                i={activeSubLink}
                activeLink={0}
                showLine={true}
              />
            )}
          </div>
        )}
      </motion.div>
    </OutsideAlerter>
  );
};

export default NavLink;
