"use client";

import Spinner from "@/components/common/spinner/Spinner";
import { useAppDispatch } from "@/redux/hooks";
import { changeIsModalAuthVisible } from "@/redux/slices/ui/uiSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(changeIsModalAuthVisible(true));
    }, 500);
    router.replace("/");
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-[calc(100vh-150px)] overflow-hidden">
      <Spinner />
    </div>
  );
};

export default Login;
