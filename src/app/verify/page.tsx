"use client";

import Spinner from "@/components/common/spinner/Spinner";
import { notify } from "@/components/common/toast/Toastify";
import AuthAPI from "@/shared/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Verify = () => {
  const router = useRouter();
  const query = useSearchParams();
  const token = `${query.get("token")}`;

  useEffect(() => {
    notify("Verifikovanje...", { type: "info", position: "top-right" });

    const fetch = async () => {
      try {
        const res = await AuthAPI.verifyAccount({ code: token });
        notify("Profil uspješno verifikovan", {
          type: "success",
          position: "top-right",
        });
        router.replace("/profile-details");
      } catch (error) {
        router.replace("/profile-details");
      }
    };

    fetch();
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-[calc(100vh-150px)] overflow-hidden">
      <Spinner />
    </div>
  );
};

export default Verify;
