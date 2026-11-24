import React from "react";
import FooterSocial from "./footer-social/FooterSocial";
import FooterRights from "./footer-rights/FooterRights";
import FooterLinks from "./footer-links/FooterLinks";
import Newsletter from "@/components/layout/footer/newsletter/Newsletter";
import { getInfoPages } from "@/shared/services/infoPages";

const Footer = async () => {
  // the info pages the admin marked for the footer, in their order
  const infoPages = (await getInfoPages()).filter((page) => page.showInFooter);
  return (
    <footer className="bg-black">
      <div className="lg:px-9">
        <div className="w-full bg-[rgba(242,242,242,0.3)] h-[1px] "></div>
      </div>
      <div className="flex flex-wrap pt-11 lg:pt-24 lg:flex-nowrap">
        <div className="w-full lg:w-1/2">
          <FooterLinks infoPages={infoPages.map(({ title, slug }) => ({ title, slug }))} />
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
