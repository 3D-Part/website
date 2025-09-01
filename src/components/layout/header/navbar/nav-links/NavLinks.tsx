"use client";
import React, { useState } from "react";
import NavLink from "./nav-link/NavLink";
import { MenuItem } from "@/shared/types";

const NavLinks: React.FC<{ links: MenuItem[] }> = ({ links }) => {
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [activeSubLink, setActiveSubLink] = useState<number | null>(null);

  if (links.length === 0) return <></>;

  return (
    <div className="items-center hidden md:w-full lg:flex flex-grow-1 justify-evenly">
      {links.map((link: MenuItem, i: number) => {
        return (
          <NavLink
            key={i}
            text={link.label}
            link={link.url || "#"}
            i={i}
            links={link.children}
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
