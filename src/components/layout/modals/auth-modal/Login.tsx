import FacebookButton from "@/components/layout/modals/auth-modal/FacebookButton";
import GoogleButton from "@/components/layout/modals/auth-modal/GoogleButton";
import LoginForm from "@/components/layout/modals/auth-modal/LoginForm";
import PasswordResetFlow from "@/components/layout/modals/auth-modal/PasswordResetFlow";
import React, { FC, useState } from "react";

const Login: FC<{ setActiveModal: (x: number) => void }> = ({
  setActiveModal,
}) => {
  // the login, or the change of a forgotten password inside the same window
  const [view, setView] = useState<"login" | "reset">("login");

  if (view === "reset") {
    return (
      <div className="flex flex-col justify-center w-full">
        <h2 className="mb-4 text-xl font-semibold">Zaboravili ste lozinku?</h2>
        <PasswordResetFlow onDone={() => setView("login")} onBack={() => setView("login")} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center w-full">
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

      {/* <div className="flex items-center my-2 lg:mt-6 lg:my-4">
        <span className="flex-1 h-[1px] bg-neutral-500"></span>
        <p className="p-4">ili</p>
        <span className="flex-1 h-[1px] bg-neutral-500"></span>
      </div> */}

      {/* ----------------------------------------------------- */}
      <LoginForm onForgotPassword={() => setView("reset")} />
      {/* ----------------------------------------------------- */}
      <p className="w-full text-center">
        Nemate kreiran račun?{" "}
        <span
          className="text-[#3B82F6] font-semibold cursor-pointer"
          onClick={() => {
            setActiveModal(1);
          }}
        >
          Kreirajte sada.
        </span>
      </p>
    </div>
  );
};

export default Login;
