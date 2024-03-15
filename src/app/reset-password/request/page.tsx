"use client";
import Container from "@/components/common/container/Container";
import Heading2 from "@/components/common/text/heading/Heading2";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { notify } from "@/components/common/toast/Toastify";

import { useAppDispatch } from "@/redux/hooks";
import { changeIsGlobalLoading } from "@/redux/slices/ui/uiSlice";
import AuthAPI from "@/shared/services/auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useState } from "react";

const Security: FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const dispatch = useAppDispatch();

  const { data: session } = useSession();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setDisabled(true);
    dispatch(changeIsGlobalLoading(true));
    const email = e.target.email.value;

    try {
      await AuthAPI.requestResetPassword({ email });
      notify(`Zahtjev poslat na mail ${email}`, { type: "success" });
      setRequestSent(true);
    } catch (error) {}

    dispatch(changeIsGlobalLoading(false));
    setDisabled(false);
  };
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-neutral-900">
      <Image
        alt="3d part logo"
        src={"/assets/img/logo.svg"}
        width={138 * 2}
        height={44 * 2}
        priority
        className=""
      />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center w-full">
          <Container className="flex flex-col items-center min-h-screen py-6 bg-neutral-900 px-9">
            <Heading2 className="">
              {session && session.user
                ? "Promjena Lozinke"
                : "Zaboravili ste lozinku?"}
            </Heading2>
            <Paragraph
              size="M"
              weight="Medium"
              className="mt-4 max-w-[550px] text-center"
            >
              {`
              ${
                session && session.user
                  ? "Klikom na dugme ispod, poslaćete zahtjev za promjenu lozinke na vaš mail. "
                  : "Molimo vas unesite vašu email adresu kako biste poslali zahtjev zaresetovanje lozinke"
              }`}
            </Paragraph>
            <div className="flex items-center p-1 bg-[#313131] rounded-xl px-3 py-2 gap-3 mt-4 w-[430px]">
              <input
                required
                type={"email"}
                placeholder="Email"
                className="bg-transparent text-[#cccccc] outline-none flex-1 disabled:text-[#818181] disabled:cursor-not-allowed"
                id="email"
                defaultValue={`${
                  session && session.user ? session.user.email : ""
                }`}
                disabled={Boolean(session && session.user)}
              />
              {/* 
          <Input
            placeholder="Poštanski broj"
            id={"postCode"}
          /> */}
            </div>

            <input
              type="submit"
              onSubmit={handleSubmit}
              disabled={disabled || requestSent}
              className="w-[220px] flex items-center justify-center h-14 bg-primary-500  hover:bg-primary-400 rounded-lg 
           disabled:cursor-not-allowed active:bg-primary-600 disabled:bg-[rgba(59,130,246,0.5)] disabled:text-neutral-400 cursor-pointer  mt-6 transition-all"
              value="Pošalji "
            />
          </Container>
        </div>
      </form>
    </div>
  );
};

export default Security;
