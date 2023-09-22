import Container from "@/components/common/container/Container";
import Cart from "@/components/layout/modals/cart-modal/cart/Cart";
import CheckoutForm from "@/components/pages/shop/checkout/CheckoutForm";
import React from "react";

const Checkout = () => {
  return (
    <main className="relative">
      <Container
        className="flex flex-col-reverse items-center
lg:items-start lg:flex-row lg:gap-[84px] gap-12 p-6 lg:p-9"
      >
        <div className="flex-1 w-full">
          <CheckoutForm />
        </div>
        <div className="w-full h-[730px] lg:w-[586px] rounded-lg lg:rounded-[32px] overflow-hidden">
          <Cart />
        </div>
      </Container>
    </main>
  );
};

export default Checkout;
