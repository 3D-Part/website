"use client";
import Button from "@/components/common/button/Button";
import { useRouter } from "next/navigation";
import React from "react";

const ContactUsButton = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        type="primary"
        size="M"
        onClick={() => {
          router.push("/");
        }}
        className="w-full mt-6 md:w-fit"
        text="Kontaktirajte nas"
      ></Button>
    </div>
  );
};

export default ContactUsButton;
