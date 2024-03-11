import React from "react";
import FooterSocial from "./footer-social/FooterSocial";
import FooterRights from "./footer-rights/FooterRights";
import FooterLinks from "./footer-links/FooterLinks";
import Newsletter from "@/components/layout/footer/newsletter/Newsletter";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="lg:px-9">
        <div className="w-full bg-[rgba(242,242,242,0.3)] h-[1px] "></div>
      </div>
      <div className="flex flex-wrap pt-11 lg:pt-24 lg:flex-nowrap">
        <div className="w-full lg:w-1/2">
          <FooterLinks />
        </div>
        <div className="w-full mt-10 lg:w-1/2 lg:mt-0">
          <Newsletter />
        </div>
      </div>
      <FooterSocial />
      <FooterRights />
    </footer>
  );
};

export default Footer;
