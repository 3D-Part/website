import Container from "@/components/common/container/Container";
import Mail from "@/components/common/social/Mail";
import PhoneNumber from "@/components/common/social/PhoneNumber";
import SocialApps from "@/components/common/social/SocialApps";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FooterSocial = () => {
  return (
    <Container className="px-4 mt-11 lg:grid lg:grid-cols-3 lg:justify-content-center pb-7 lg:pb-4 lg:mt-16">
      <div className="flex items-center mb-6 gap-9 lg:order-1 lg:mb-0 lg:justify-center lg:w-full">
        <PhoneNumber />
        <Mail />
      </div>
      <SocialApps
        className="gap-10 mb-11 lg:order-3 lg:mb-0 lg:justify-center lg:w-full lg:gap-8"
        facebookWidth={31}
        olxWidth={53}
      />
      <div className="flex items-center justify-center w-full lg:order-2 ">
        <Link href={"/"} shallow>
          <Image
            src="/assets/img/logo.svg"
            width={172}
            height={54.8604566872}
            alt="3D Part white logo"
          />
        </Link>
      </div>
    </Container>
  );
};

export default FooterSocial;
