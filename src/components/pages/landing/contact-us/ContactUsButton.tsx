"use client";
import useSettingsApi from "@/redux/api/useSettingsApi";
import { useAppDispatch } from "@/redux/hooks";
import { changeIsContactModalVisible } from "@/redux/slices/ui/uiSlice";
import React from "react";

const ContactUsButton = () => {
  const { settings } = useSettingsApi();
  const dispatch = useAppDispatch();

  return (
    <div>
      <div
        className={`px-4 transition-all font-bold text-sm w-full mt-6 md:w-fit bg-primary-500 hover:bg-primary-400 active:bg-primary-600 disabled:bg-[rgba(59,130,246,0.5)] disabled:text-neutral-400 ${"py-3"} rounded-lg flex justify-center items-center
        disabled:cursor-not-allowed`}
        onClick={() => dispatch(changeIsContactModalVisible(true))}
      >
        Kontaktirajte nas
      </div>
    </div>
  );
};

export default ContactUsButton;
