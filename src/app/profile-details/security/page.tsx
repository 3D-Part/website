"use client";

import Container from "@/components/common/container/Container";
import Heading2 from "@/components/common/text/heading/Heading2";
import PasswordResetFlow from "@/components/layout/modals/auth-modal/PasswordResetFlow";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";

/**
 * "Postavke i sigurnost": the logged in customer changes the password here,
 * inside the profile, so the profile's menu stays at hand. The code goes to
 * the customer's e-mail, which is not typed again.
 */
const Security: FC = () => {
  const { data: session } = useSession();
  const [done, setDone] = useState(false);
  const email = session?.user?.email ?? undefined;

  return (
    <div className="w-full bg-neutral-900">
      <Container className="flex !max-w-auto flex-col items-center min-h-screen gap-8 py-6 bg-neutral-900 px-9 lg:items-start ">
        <Heading2>Postavke i sigurnost</Heading2>
        <div className="w-full max-w-[430px]">
          <h3 className="mb-4 text-xl font-semibold text-neutral-100">Promjena lozinke</h3>
          {done ? (
            <div className="flex flex-col items-start gap-4">
              <p className="text-neutral-200">
                Vaša lozinka je promijenjena. Pri sljedećoj prijavi koristite novu lozinku.
              </p>
              <Link href="/profile-details" className="px-6 py-3 font-bold bg-[#2463EB] rounded-lg">
                Nazad na profil
              </Link>
            </div>
          ) : (
            email && <PasswordResetFlow email={email} onDone={() => setDone(true)} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Security;
