/* eslint-disable no-unused-vars */
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/shared/types";

interface NavSubLinksProps {
  links: MenuItem[];
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
  const [localActive, setLocalActive] = useState<number | null>(null);
  const [arrowRotate, setArrowRotate] = useState<boolean>(false);

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
          className="w-[1px] h-[98%] my-auto mx-0 bg-gray-400"
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
              className={`flex w-full gap-1  rounded-lg  hover:bg-neutral-500 transition-all ${!showLine && activeLink === i ? "bg-neutral-600" : ""
                } ${x.children && x.children?.length > 0 && !showLine && activeLink === i
                  ? "px-2"
                  : ""
                } ${x.children && x.children?.length > 0 && !showLine && activeLink !== i
                  ? "pr-2"
                  : ""
                }`}
            >
              <div
                onClick={() => {
                  setLocalActive(i)
                  if (x.children && x.children?.length > 0) {
                    if (setActive) {
                      if (activeLink === i) {
                        setArrowRotate(false);
                        setActive(null);
                      } else {
                        setArrowRotate(true);
                        setActive(i);
                      }
                    } else {
                      if (localActive === i) {
                        setLocalActive(null);
                        setArrowRotate(false);
                      } else {
                        setArrowRotate(true);
                        setLocalActive(i);
                      }
                    }
                  } else {
                    onClick();
                    router.push(x.url || "#");
                  }
                }}
                className={`flex-1 flex items-start whitespace-nowrap`}
              >
                <div className="flex items-center">
                  <Paragraph size="M" weight="Regular" className={`p-[10px] px-2 ${activeLink === i ? "py-4" : ""}`}>
                    {x.label}
                  </Paragraph>
                  {x.children && x.children?.length > 0 && (
                    <IoIosArrowDown className={`transition-all cursor-pointer hover:scale-125 ${arrowRotate ? "-rotate-90" : ""}`}></IoIosArrowDown>
                  )}
                </div>
              </div>
              {x.children && x.children.length > 0 && (
                ((setActive && activeLink === i) || (!setActive && localActive === i)) && (
                  <NavSubLinks
                    links={x.children}
                    i={i}
                    activeLink={null}
                    showLine={true}
                    onClick={onClick}
                  />
                )
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default NavSubLinks;
