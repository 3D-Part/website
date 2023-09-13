"use client";
import React from "react";
import Paragraph from "../text/paragraph/Paragraph";
import { motion } from "framer-motion";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  type: "primary" | "secondary";
  onClick: () => void;
  disabled?: boolean;
  size: "M" | "L";
  text?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  type,
  onClick,
  disabled,
  size,
  text,
}) => {
  let colors = "";
  if (type === "primary") {
    colors =
      "bg-primary-500 hover:bg-primary-400 active:bg-primary-600 disabled:bg-[rgba(59,130,246,0.5)] disabled:text-neutral-400 ";
  } else if (type === "secondary") {
    colors =
      "bg-[rgba(59,130,246,0.2)] text-white border border-primary-500 hover:border-primary-400 hover:bg-[rgba(59,130,246,0.5)] active:bg-[rgba(59,130,246,0.2)] active:border-primary-600 disabled:border-primary-400 disabled:bg-[rgba(59,130,246,0.2)] disabled:text-primary-400";
  }
  return (
    <motion.button
      whileHover={!disabled ? "animate" : ""}
      whileTap={{ scale: !disabled ? 0.95 : 1 }}
      disabled={disabled}
      onClick={(e) => {
        onClick();
        e.stopPropagation();
        e.preventDefault();
      }}
      className={`px-4 transition-all ${className} ${colors} ${
        size === "M" ? "py-3" : "py-4"
      } rounded-lg flex justify-center items-center
        disabled:cursor-not-allowed`}
    >
      <motion.div
        initial={{ scale: 1 }}
        variants={{
          animate: {
            scale: 1.05,
            transition: { duration: 0.25, type: "tween" },
          },
        }}
      >
        <Paragraph size={size === "M" ? "S" : "M"} weight="Bold">
          {text}
        </Paragraph>
      </motion.div>
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;
