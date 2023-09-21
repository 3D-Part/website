import Container from "@/components/common/container/Container";
import Cart from "@/components/layout/modals/cart-modal/cart/Cart";
import React from "react";

const Checkout = () => {
  return (
    <main className="relative min-h-screen ">
      <Container
        className="flex flex-col items-center
lg:items-start lg:flex-row lg:gap-[84px] gap-12 p-5 lg:p-9"
      >
        <div className="flex-1 border border-solid"></div>
        <div className="w-full h-[730px] lg:w-[586px] rounded-[32px] overflow-hidden">
          <Cart />
        </div>
      </Container>
    </main>
  );
};

export default Checkout;
