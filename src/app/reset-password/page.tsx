"use client";
import Container from "@/components/common/container/Container";
import Spinner from "@/components/common/spinner/Spinner";
import Heading2 from "@/components/common/text/heading/Heading2";
import PasswordResetFlow from "@/components/layout/modals/auth-modal/PasswordResetFlow";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

/**
 * Change of the password: the code goes to the customer's e-mail and is typed
 * here. A logged in customer does not type the e-mail; anyone else does.
 * (Links with a token from old e-mails land here too and just start over.)
 */
const PasswordPage: FC = () => {
  const { data: session, status } = useSession();
  const [done, setDone] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-screen h-[calc(100vh-150px)] overflow-hidden">
        <Spinner />
      </div>
    );
  }

  const loggedIn = status === "authenticated" && !!session?.user?.email;

  return (
    <div className="flex flex-col items-center justify-center bg-neutral-900">
      <Container className="flex !max-w-auto flex-col items-center min-h-screen py-10 bg-neutral-900 px-6">
        <Image
          alt="3d part logo"
          src={"/assets/img/logo.svg"}
          width={138 * 2}
          height={44 * 2}
          priority
        />
        <Heading2 className="mt-7">
          {loggedIn ? "Promjena lozinke" : "Zaboravili ste lozinku?"}
        </Heading2>
        <div className="w-full max-w-[430px] mt-6">
          {done ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-neutral-200">
                Vaša lozinka je promijenjena.
                {loggedIn ? " Pri sljedećoj prijavi koristite novu lozinku." : " Sada se možete prijaviti novom lozinkom."}
              </p>
              <Link
                href={loggedIn ? "/profile-details" : "/"}
                className="px-6 py-3 font-bold bg-[#2463EB] rounded-lg"
              >
                {loggedIn ? "Nazad na profil" : "Na početnu"}
              </Link>
            </div>
          ) : (
            <PasswordResetFlow
              email={loggedIn ? session?.user?.email ?? undefined : undefined}
              onDone={() => setDone(true)}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default PasswordPage;
