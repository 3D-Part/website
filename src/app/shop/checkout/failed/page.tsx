"use client";

import Button from "@/components/common/button/Button";
import Heading3 from "@/components/common/text/heading/Heading3";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Failed = () => {
  const router = useRouter();
  return (
    <main className="min-h-screen px-4">
      <div className="pt-[68px] mx-auto w-full max-w-[588px] flex flex-col justify-center items-center h-full">
        <div className="w-[164px] h-[164px] animate-pulse">
          <Image
            alt="failed"
            src={"/assets/img/failed.svg"}
            width={164}
            height={164}
            className="w-[164px] h-[164px]"
          />
        </div>
        <Heading3 className="text-center">Neuspješan pokušaj plaćanja</Heading3>
        <Paragraph size="L" weight="Regular" className="mt-3 text-center">
          Nažalost, nismo u mogućnosti procesuirati vašu narudžbu. Molimo Vas,
          pokušajte ponovo ili probajte sa drugim načinom plaćanja.
        </Paragraph>

        <Button
          onClick={() => {
            router.push("/");
          }}
          type="primary"
          size="L"
          className="w-full mt-16"
        >
          <Paragraph size="M" weight="Bold">
            Vrati se na sajt
          </Paragraph>
        </Button>
      </div>
    </main>
  );
};

export default Failed;
