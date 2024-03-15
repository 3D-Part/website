/* eslint-disable no-unused-vars */
"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";

interface NavSubLinksProps {
  links: { text: string; link: string; links: any[] }[];
  setActive?: (x: number | null) => void;
  activeLink?: number | null;
  i: number;
  showLine?: boolean;
  onClick: () => void;
}

const NavSubLinks: React.FC<NavSubLinksProps> = ({
  links,
  setActive,
  i,
  activeLink,
  showLine,
  onClick,
}) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: showLine ? -20 : 0,
        y: showLine ? -20 : 0,
        width: showLine ? 0 : "auto",
        height: !showLine ? 0 : "auto",
      }}
      animate={{ opacity: 1, y: 0, x: 0, width: "auto", height: "auto" }}
      exit={{
        opacity: 0,
        x: showLine ? -20 : 0,
        y: showLine ? -20 : 0,
        width: showLine ? 0 : "auto",
        height: !showLine ? 0 : "auto",
      }}
      transition={{ width: { duration: 0.2 } }}
      className="flex "
    >
      {showLine && (
        <motion.div
          className="w-[1px] h-full bg-neutral-600"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, opacity: { delay: 0.25 } }}
        ></motion.div>
      )}
      <div className="flex flex-col gap-1 px-4">
        {links.map((x, i) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.25 }}
              className={`flex items-center w-full gap-1  rounded-lg  hover:bg-primary-500 transition-all ${
                !showLine && activeLink === i ? "bg-primary-500" : ""
              } ${
                x.links && x.links?.length > 0 && !showLine && activeLink === i
                  ? "px-2"
                  : ""
              } ${
                x.links && x.links?.length > 0 && !showLine && activeLink !== i
                  ? "pr-2"
                  : ""
              }`}
            >
              <div
                onClick={() => {
                  if (x.links && x.links?.length > 0) {
                    if (!setActive) return;
                    if (activeLink === i) {
                      setActive(null);
                    } else {
                      setActive(i);
                    }
                  } else {
                    onClick();
                    router.push(x.link);
                  }
                }}
                className={`flex-1  flex items-center whitespace-nowrap`}
              >
                <Paragraph size="M" weight="Regular" className="p-[10px] px-2 ">
                  {x.text}
                </Paragraph>
                {x.links && x.links?.length > 0 && (
                  <IoIosArrowDown className="transition-all cursor-pointer hover:scale-125 "></IoIosArrowDown>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default NavSubLinks;
