import React from "react";
import FooterSocial from "./footer-social/FooterSocial";
import FooterRights from "./footer-rights/FooterRights";
import FooterLinks from "./footer-links/FooterLinks";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="lg:px-9">
        <div className="w-full bg-[rgba(242,242,242,0.3)] h-[1px] "></div>
      </div>
      <FooterLinks />
      <FooterSocial />
      <FooterRights />
    </footer>
  );
};

export default Footer;
