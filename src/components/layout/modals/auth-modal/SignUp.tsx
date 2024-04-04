import FacebookButton from "@/components/layout/modals/auth-modal/FacebookButton";
import GoogleButton from "@/components/layout/modals/auth-modal/GoogleButton";
import SignUpForm from "@/components/layout/modals/auth-modal/SignUpForm";
import React, { FC } from "react";

const SignUp: FC<{ setActiveModal: (x: number) => void }> = ({
  setActiveModal,
}) => {
  return (
    <div className="flex flex-col justify-center w-full">
      <SignUpForm />{" "}
      {/* ----------------------------------------------------- */}
      {/* <div className="flex items-center my-2 lg:mt-6 lg:my-4">
        <span className="flex-1 h-[1px] bg-neutral-500"></span>
        <p className="p-4">ili se ulogujte sa</p>
        <span className="flex-1 h-[1px] bg-neutral-500"></span>
      </div> */}
      {/* ----------------------------------------------------- */}
      {/* <GoogleButton /> */}
      {/* <FacebookButton className="mt-2" /> */}
      {/* ----------------------------------------------------- */}
      {/* <p className="mt-4 font-exo2 font-normal text-[#cccccc] text-xs">
        Klikom na ovo dugme slažete se sa našim{" "}
        <a href="#" className="underline text-[#3B82F6]">
          Uslovima korišćenja usluge
        </a>{" "}
        i{" "}
        <a href="#" className="underline text-[#3B82F6]">
          Politikom privatnosti
        </a>
        .
      </p> */}
      {/* ----------------------------------------------------- */}
      <p className="w-full mt-8 text-center">
        Da li imate kreiran račun?{" "}
        <span
          className="text-[#3B82F6] font-semibold cursor-pointer"
          onClick={() => {
            setActiveModal(0);
          }}
        >
          Ulogujte se
        </span>
      </p>
    </div>
  );
};

export default SignUp;
