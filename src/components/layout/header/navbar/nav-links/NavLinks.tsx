"use client";
import React, { useState } from "react";
import NavLink from "./nav-link/NavLink";

const NavLinks: React.FC<{ links: any }> = ({ links }) => {
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [activeSubLink, setActiveSubLink] = useState<number | null>(null);

  console.log("state:", activeLink);

  return (
    <div className="items-center hidden md:w-full lg:flex flex-grow-1 justify-evenly">
      {links.map((link: any, i: number) => {
        return (
          <NavLink
            key={i}
            text={link.text}
            link={link.link}
            i={i}
            links={link.links}
            activeLink={activeLink}
            activeSubLink={activeSubLink}
            setActiveLink={(x: number | null) => {
              setActiveLink(x);
            }}
            setActiveSubLink={(x: number | null) => {
              setActiveSubLink(x);
            }}
          />
        );
      })}
    </div>
  );
};

export default NavLinks;
