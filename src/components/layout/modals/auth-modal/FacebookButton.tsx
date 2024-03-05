"use client";

import React, { FC } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const FacebookButton: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <button
      className={`text-[#1E1E1E]  bg-white flex items-center transition-all justify-center p-3 rounded-[10px] gap-[10px] cursor-pointer hover:bg-[#f2f2f2] ${className}`}
      onClick={() => {
        signIn("facebook");
      }}
    >
      <Image
        width={34}
        height={34}
        alt="google"
        src={"/assets/img/facebook.png"}
      />
      <p className="text-base font-semibold font-exo2">
        Continue with Facebook
      </p>
    </button>
  );
};

export default FacebookButton;
