import React from "react";
import HeaderInfo from "./header-info/HeaderInfo";
import Navbar from "./navbar/Navbar";

const Header = () => {
  return (
    <header className="lg:sticky lg:top-0 z-50 md:bg-none bg-[rgba(17,17,17,0.55)]">
      <div className="relative z-20">
        <HeaderInfo />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
