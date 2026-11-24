"use client";
import Container from "@/components/common/container/Container";
import Spinner from "@/components/common/spinner/Spinner";
import Heading2 from "@/components/common/text/heading/Heading2";
import PasswordResetFlow from "@/components/layout/modals/auth-modal/PasswordResetFlow";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

/**
 * Change of the password: the code goes to the customer's e-mail and is typed
 * here. A logged in customer does not type the e-mail; anyone else does.
 * (Links with a token from old e-mails land here too and just start over.)
 * The e-mail the staff send has a link with the address and code=sent: the
 * page then opens where the code from that e-mail is typed.
 */
const PasswordPage: FC = () => {
  const { data: session, status } = useSession();
  const [done, setDone] = useState(false);
  const [fromMail, setFromMail] = useState<{ email?: string; codeSent: boolean }>({ codeSent: false });
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email")?.trim();
    setFromMail({ email: email || undefined, codeSent: !!email && params.get("code") === "sent" });
  }, []);

  // a logged in customer changes the password in the profile, next to its menu;
  // the link from the staff's e-mail (with the address) still opens here
  const plainVisit = status === "authenticated" && !!session?.user?.email && !fromMail.email;
  useEffect(() => {
    if (plainVisit && !new URLSearchParams(window.location.search).get("email")) {
      router.replace("/profile-details/security");
    }
  }, [plainVisit, router]);

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
              email={loggedIn ? session?.user?.email ?? undefined : fromMail.email}
              codeSent={fromMail.codeSent}
              onDone={() => setDone(true)}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default PasswordPage;
