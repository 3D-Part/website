"use client";
import Button from "@/components/common/button/Button";
import Container from "@/components/common/container/Container";
import Input from "@/components/common/input/Input";
import Heading2 from "@/components/common/text/heading/Heading2";
import Heading4 from "@/components/common/text/heading/Heading4";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { notify } from "@/components/common/toast/Toastify";
import {
  EyeIcon,
  LockIcon,
} from "@/components/layout/modals/auth-modal/SignUpForm";
import { useAppDispatch } from "@/redux/hooks";
import { changeIsGlobalLoading } from "@/redux/slices/ui/uiSlice";
import AuthAPI from "@/shared/services/auth";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useState } from "react";

const Security: FC = () => {
  const [passType, setPassType] = useState("password");
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();
  const query = useSearchParams();
  const token = `${query.get("token")}`;

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(changeIsGlobalLoading(true));
    const pass1 = e.target.password.value;
    const pass2 = e.target.newPassword.value;

    if (pass1 !== pass2) {
      notify("Lozinke se ne poklapaju", { type: "error", toastId: 12412 });
    } else {
      try {
        await AuthAPI.resetPassword({ password: pass1, code: token });
        notify("Lozinka promjenjena", { type: "success" });
        router.replace("/");
      } catch (error: any) {
        notify(error?.response?.data?.errors[0].message, { type: "error" });
      }
    }

    dispatch(changeIsGlobalLoading(false));
  };
  return (
    <div className="flex flex-col items-center justify-center bg-neutral-900">
      {/* <Image
        alt="3d part logo"
        src={"/assets/img/logo.svg"}
        width={138 * 1}
        height={44 * 1}
        priority
        className=""
      /> */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center w-full">
          <Container className="flex flex-col items-center min-h-screen py-6 bg-neutral-900 px-9">
            <Image
              alt="3d part logo"
              src={"/assets/img/logo.svg"}
              width={138 * 2}
              height={44 * 2}
              priority
              className=""
            />
            <Heading2 className="mt-7">Promijeni lozinku</Heading2>
            <Paragraph size="M" weight="Medium" className="mt-4 max-w-[550px]">
              Lozinka mora sadržavati barem jedan specijalan znak, veliko slovo
              i broj. Minimalna dužina lozinke treba biti 8 karaktera.
            </Paragraph>
            <div className="flex items-center p-1 bg-[#313131] rounded-xl px-3 py-2 gap-3 mt-4 w-[430px]">
              <LockIcon />
              <input
                required
                type={passType}
                placeholder="Nova lozinka"
                className="bg-transparent text-[#cccccc] outline-none flex-1"
                id="password"
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
                <EyeIcon
                  fill={passType === "password" ? "#999999" : "#3B82F6"}
                />
              </button>
            </div>
            <div className="flex items-center p-1 bg-[#313131] rounded-xl px-3 py-2 gap-3 mt-6 w-[430px]">
              <LockIcon />
              <input
                required
                type={passType}
                placeholder="Potvrdite novu lozinku"
                className="bg-transparent text-[#cccccc] outline-none flex-1"
                id="newPassword"
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
                <EyeIcon
                  fill={passType === "password" ? "#999999" : "#3B82F6"}
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
    </div>
  );
};

export default Security;
