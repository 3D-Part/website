"use client";
import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";
import Spinner from "@/components/common/spinner/Spinner";
import { useAppDispatch } from "@/redux/hooks";
import { changeIsGlobalLoading } from "@/redux/slices/ui/uiSlice";
import { newsletterService } from "@/shared/services/newsletterService";
import React, { useState } from "react";

const Newsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setIsSubmitting(true);
    dispatch(changeIsGlobalLoading(true));

    try {
      // ---
      newsletterService.subscribeToNewsletter(`${e.target.email.value}`);
    } catch (error) {}

    dispatch(changeIsGlobalLoading(false));
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center px-4 py-6 lg:px-8 lg:py-0">
      <p className="text-4xl font-bold">
        Pridružite se našem ekskluzivnom Newsletteru!
      </p>

      <p className="mt-6">
        Ne propustite nijednu važnu novost i budite uvijek u toku sa najnovijim
        događajima i ekskluzivnim ponudama!
      </p>

      <form onSubmit={handleSubmit} className="flex items-start gap-6 mt-6">
        <div>
          <input
            placeholder="Email"
            id={"email"}
            type="email"
            required
            className="flex-1 w-full px-6 py-3 transition-all border h-14 border-primary-500 focus:ring-0 focus:outline-none rounded-3xl disabled:cursor-not-allowed bg-neutral-700 disabled:text-neutral-400"
          />
          <p className="mt-2 font-exo2 font-normal text-[#cccccc] text-xs ">
            Klikom na ovo dugme slažete se sa našim{" "}
            <a href="#" className="underline text-[#3B82F6]">
              Uslovima korišćenja usluge
            </a>{" "}
            i{" "}
            <a href="#" className="underline text-[#3B82F6]">
              Politikom privatnosti
            </a>
            .
          </p>
        </div>
        <input
          type="submit"
          onSubmit={handleSubmit}
          disabled={isSubmitting}
          className="w-[220px] flex items-center justify-center h-14 bg-primary-500  hover:bg-primary-400 rounded-lg 
          disabled:cursor-not-allowed active:bg-primary-600 disabled:bg-[rgba(59,130,246,0.5)] disabled:text-neutral-400 cursor-pointer "
          value="Prijavi me"
        />
      </form>
    </div>
  );
};

export default Newsletter;
