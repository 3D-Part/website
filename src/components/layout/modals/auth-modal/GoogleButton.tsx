"use client";
import React, { FC } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const GoogleButton: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <button
      className={`text-white  bg-[#2463EB] flex items-center transition-all justify-center p-3 rounded-[10px] gap-[10px] cursor-pointer hover:bg-[#2e69e8] ${className}`}
      onClick={() => {
        signIn("google");
      }}
    >
      <Image
        width={34}
        height={34}
        alt="google"
        src={"/assets/img/google.png"}
      />
      <p className="text-base font-semibold font-exo2">Continue with Google</p>
    </button>
  );
};

export default GoogleButton;
