"use client";
import Button from "@/components/common/button/Button";
import Container from "@/components/common/container/Container";
import Heading2 from "@/components/common/text/heading/Heading2";
import Heading4 from "@/components/common/text/heading/Heading4";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import {
  EyeIcon,
  LockIcon,
} from "@/components/layout/modals/auth-modal/SignUpForm";
import { FC, useState } from "react";

const Security: FC = () => {
  const [passType, setPassType] = useState("password");
  return (
    <div className="w-full">
      <Container className="flex flex-col items-center min-h-screen py-6 lg:items-start bg-neutral-900 px-9">
        <Heading2 className="">Postavke i sigurnost</Heading2>
        <Heading4 className="mt-7">Promijeni lozinku</Heading4>
        <Paragraph size="M" weight="Medium" className="mt-4 max-w-[550px]">
          Lozinka mora sadržavati barem jedan specijalan znak, veliko slovo i
          broj. Minimalna dužina lozinke treba biti 8 karaktera.
        </Paragraph>
        <div className="flex items-center p-1 bg-[#313131] rounded-xl px-3 py-2 gap-3 mt-4 w-[430px]">
          <LockIcon />
          <input
            type={passType}
            placeholder="Password"
            className="bg-transparent text-[#cccccc] outline-none flex-1"
            id="password"
          />
          <button
            type="button"
            onClick={() => {
              if (passType === "password") {
                setPassType("text");
              } else {
                setPassType("password");
              }
            }}
          >
            <EyeIcon fill={passType === "password" ? "#999999" : "#3B82F6"} />
          </button>
        </div>
        <div className="flex items-center p-1 bg-[#313131] rounded-xl px-3 py-2 gap-3 mt-4 w-[430px]">
          <LockIcon />
          <input
            type={passType}
            placeholder="Password"
            className="bg-transparent text-[#cccccc] outline-none flex-1"
            id="password"
          />
          <button
            type="button"
            onClick={() => {
              if (passType === "password") {
                setPassType("text");
              } else {
                setPassType("password");
              }
            }}
          >
            <EyeIcon fill={passType === "password" ? "#999999" : "#3B82F6"} />
          </button>
        </div>

        <Button
          size="L"
          type="primary"
          onClick={() => {
            console.log("asd");
          }}
          className="mt-4 font-semibold bg-primary-600"
        >
          Sačuvaj promijene{" "}
        </Button>
      </Container>
    </div>
  );
};

export default Security;
