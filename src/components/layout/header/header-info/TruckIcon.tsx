"use client";
import React from "react";
import { FaTruckMoving } from "react-icons/fa";
import { motion } from "framer-motion";
const TruckIcon = () => {
  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, delay: 1.5, type: "tween" }}
    >
      <FaTruckMoving className="min-w-[24px] min-h-[22px] items-center text-[rgba(248,250,252,0.5)] mr-2 h-11" />
    </motion.div>
  );
};

export default TruckIcon;
