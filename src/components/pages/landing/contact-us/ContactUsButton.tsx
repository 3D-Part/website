"use client";
import Button from "@/components/common/button/Button";
import { useRouter } from "next/navigation";
import React from "react";

const ContactUsButton = () => {
  const router = useRouter();
  return (
    <div>
      <a
        className={`px-4 transition-all font-bold text-sm w-full mt-6 md:w-fit bg-primary-500 hover:bg-primary-400 active:bg-primary-600 disabled:bg-[rgba(59,130,246,0.5)] disabled:text-neutral-400 ${"py-3"} rounded-lg flex justify-center items-center
        disabled:cursor-not-allowed`}
        href="mailto:info@3dpartshop.com"
      >
        Kontaktirajte nas
      </a>
    </div>
  );
};

export default ContactUsButton;
