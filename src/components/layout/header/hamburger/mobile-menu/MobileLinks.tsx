"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const MobileLinks: React.FC<{
  links: any;
  className?: string;
  onClick: () => void;
  nestedIteration: number;
}> = ({ className = "", links, onClick, nestedIteration }) => {
  return (
    <motion.div className={`flex flex-col items-center transition-all ${className}`}>
      {
        links.map((x: any, i: number) => {
          return (
            <LinkSection
              onClick={() => {
                onClick();
              }}
              key={i}
              x={x}
              i={i}
              showLine={nestedIteration === 0 || i < links.length - 1}
            />
          );
        })
      }
    </motion.div >
  );
};

export default MobileLinks;

const LinkSection: React.FC<{
  onClick: () => void;
  x: any;
  i: number;
  showLine: boolean;
}> = ({ onClick, x, i, showLine }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  return (
    <motion.div
      className={`w-full px-4 py-2 border-b border-neutral-600 cursor-pointer ${showLine ? "border-solid" : ""
        }`}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        delay: i * .1,
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.3, duration: 0.1 }}
        className="flex items-center justify-between w-full"
        onClick={() => {
          if (x.links && x.links?.length > 0) {
            setIsOpen(!isOpen);
          } else {
            onClick();
            router.push(x.link);
          }
        }}
      >
        <div className="flex items-center justify-center p-2 font-bold">
          {x.text}
        </div>
        {x.links && x.links?.length > 0 && !isOpen && (
          <IoIosArrowDown className="text-2xl cursor-pointer"></IoIosArrowDown>
        )}
        {x.links && x.links?.length > 0 && isOpen && (
          <IoIosArrowUp className="text-2xl cursor-pointer"></IoIosArrowUp>
        )}
      </motion.div>
      {isOpen && (
        <MobileLinks
          links={x.links}
          onClick={() => {
            onClick();
          }}
          className="text-xl"
          nestedIteration={1}
        />
      )}
    </motion.div>
  );
};
