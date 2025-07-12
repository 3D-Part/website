'use client'

import React, { useEffect } from "react";
import { TextComponentInterface } from "../../../../shared/interfaces/textInterfaces";
import { userService } from "@/shared/services/userService";
import { useAppDispatch } from "@/redux/hooks";
import { changeDiscount } from "@/redux/slices/cart/cartSlice";

const Heading1: React.FC<TextComponentInterface> = ({
  children,
  className = "",
}) => {
  const dispatch = useAppDispatch();
  const fetchProfileData = async () => {
    const data = await userService.fetchUserProfile()

    if (!data) return

    dispatch(changeDiscount(data.discount || 0))
  }

  useEffect(() => {
    fetchProfileData()
  }, [])
  return (
    <h1
      className={`text-[48px] font-semibold leading-[48px] lg:text-[56px] lg:leading-[72px] ${className}`}
    >
      {children}
    </h1>
  );
};

export default Heading1;
