import React from "react";
import CartModal from "./cart-modal/CartModal";
import SpinnerModal from "./spinner-modal/SpinnerModal";
import AuthModal from "@/components/layout/modals/auth-modal/AuthModal";

const Modals = () => {
  return (
    <>
      <CartModal />
      <SpinnerModal />
      <AuthModal />
    </>
  );
};

export default Modals;
