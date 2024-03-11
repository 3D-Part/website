"use client";
import Button from "@/components/common/button/Button";
import Container from "@/components/common/container/Container";
import Input from "@/components/common/input/Input";
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
  const [passType2, setPassType2] = useState("password");
  const [disabled, setDisabled] = useState(false);
  const [payload, setPayload] = useState({ oldPassword: "", newPassword: "" });

  const handleSubmit = () => {};
  return (
    <form onSubmit={handleSubmit}>
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
              required
              type={passType}
              placeholder="Stara lozinka"
              className="bg-transparent text-[#cccccc] outline-none flex-1"
              id="password"
              onChange={(e) => {
                setPayload({
                  oldPassword: e.target.value,
                  newPassword: payload.newPassword,
                });
              }}
            />
            {/* 
          <Input
            placeholder="Poštanski broj"
            id={"postCode"}
          /> */}
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
          <div className="flex items-center p-1 bg-[#313131] rounded-xl px-3 py-2 gap-3 mt-6 w-[430px]">
            <LockIcon />
            <input
              required
              type={passType2}
              placeholder="Nova lozinka"
              className="bg-transparent text-[#cccccc] outline-none flex-1"
              id="newPassword"
              onChange={(e) => {
                setPayload({
                  oldPassword: payload.oldPassword,
                  newPassword: e.target.value,
                });
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (passType2 === "password") {
                  setPassType2("text");
                } else {
                  setPassType2("password");
                }
              }}
            >
              <EyeIcon
                fill={passType2 === "password" ? "#999999" : "#3B82F6"}
              />
            </button>
          </div>

          <input
            type="submit"
            onSubmit={handleSubmit}
            disabled={disabled}
            className="w-[220px] flex items-center justify-center h-14 bg-primary-500  hover:bg-primary-400 rounded-lg 
           disabled:cursor-not-allowed active:bg-primary-600 disabled:bg-[rgba(59,130,246,0.5)] disabled:text-neutral-400 cursor-pointer  mt-6 transition-all"
          />
        </Container>
      </div>
    </form>
  );
};

export default Security;
