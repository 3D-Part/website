import Container from "@/components/common/container/Container";
import React from "react";
import ContactUsImage from "./ContactUsImage";
import ContactUsText from "./ContactUsText";

const ContactUs = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[rgba(36,99,235,0.69)] to-transparent">
      <Container className="p-4 md:px-[52px] md:py-8 md:flex md:items-center md:gap-10 lg:gap-20 overflow-hidden">
        <ContactUsImage />

        <ContactUsText />
      </Container>
    </div>
  );
};

export default ContactUs;
