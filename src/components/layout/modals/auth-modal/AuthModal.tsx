"use client";
import Button from "@/components/common/button/Button";
import { Path } from "@/components/layout/header/hamburger/Hamburger";
import Login from "@/components/layout/modals/auth-modal/Login";
import SignUp from "@/components/layout/modals/auth-modal/SignUp";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isModalAuthVisibleSelector } from "@/redux/slices/ui/uiSelectors";
import { changeIsModalAuthVisible } from "@/redux/slices/ui/uiSlice";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

const AuthModal = () => {
  const [activeModal, setActiveModal] = useState(0);
  const isOpen = useAppSelector(isModalAuthVisibleSelector);
  const dispatch = useAppDispatch();

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full ">
          <div
            className="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(17,17,17,0.78)] cursor-pointer min-w-[360px]"
            onClick={() => {
              dispatch(changeIsModalAuthVisible(false));
            }}
          ></div>
          <motion.div
            initial={{ top: -100 }}
            animate={{ top: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              duration: 0.3,
              damping: 16,
            }}
            className="relative bg-neutral-800 rounded-2xl max-w-[425px] min-w-[360px] flex flex-col items-center gap-8 z-50 w-[425px] p-6"
          >
            {/* ----------- */}
            <Image
              alt="3d part logo"
              src={"/assets/img/logo.svg"}
              width={138}
              height={44}
              priority
              className=""
            />

            <motion.button
              onClick={() => {
                dispatch(changeIsModalAuthVisible(false));
              }}
              className={`h-10 w-10 transition-all duration-500 absolute right-4 top-8 rounded-lg flex justify-center items-center`}
              initial={"initial"}
              animate={"open"}
              variants={{
                initial: { opacity: 0, scale: 0 },
                open: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.1 },
                },
              }}
              aria-label="Menu"
            >
              <svg viewBox="0 0 21.5 20" className={`h-6 w-6`}>
                <Path
                  variants={{
                    open: { d: "M 3 16.5 L 17 2.5" },
                  }}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <Path
                  d="M 2 9.423 L 20 9.423"
                  variants={{
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.1 }}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <Path
                  variants={{
                    open: { d: "M 3 2.5 L 17 16.346" },
                  }}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
            {/* --------- */}

            <div className="flex items-center justify-start w-full gap-4">
              <button
                className={`rounded-[56px] px-4 py-2  ${
                  activeModal === 0
                    ? "bg-primary-500 text-white font-semibold"
                    : "text-[#B1BAD3] "
                }   `}
                onClick={() => {
                  setActiveModal(0);
                }}
              >
                Uloguj se
              </button>
              <button
                className={`rounded-[56px]  px-4 py-2 ${
                  activeModal === 1
                    ? "bg-primary-600 text-white font-semibold"
                    : "text-[#B1BAD3]"
                }  `}
                onClick={() => {
                  setActiveModal(1);
                }}
              >
                Kreiraj račun
              </button>
            </div>

            <>
              {activeModal === 0 && <Login />}
              {activeModal === 1 && <SignUp />}
            </>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
