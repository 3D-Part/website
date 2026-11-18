"use client";
import React, { useState } from "react";
import NavLink from "./nav-link/NavLink";
import { MenuItem } from "@/shared/types";

// While the menu loads, the same space is kept with grey bars of the size of the
// links, so the search box and the icons beside it do not jump when it arrives.
// Widths measured on the real links: full width from about 1200px, and the two
// middle ones ("3D Printeri", "3D Skeneri") may shrink to their minimum on
// narrower screens, like the real links wrap. Same space, so no jump.
const PLACEHOLDER_WIDTHS = [98, 74, 107, 91, 74, 83];
const PLACEHOLDER_MIN_WIDTHS = [98, 74, 84, 68, 74, 83];

const NavLinks: React.FC<{ links: MenuItem[]; loading?: boolean }> = ({
  links,
  loading = false,
}) => {
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [activeSubLink, setActiveSubLink] = useState<number | null>(null);

  if (links.length === 0) {
    // the same box as the real menu, so nothing beside it moves; empty once it is known there is no menu
    return (
      <div
        className="items-center hidden md:w-full lg:flex flex-grow-1 justify-evenly"
        aria-hidden
      >
        {loading &&
          PLACEHOLDER_WIDTHS.map((width, i) => (
            <span
              key={i}
              className="h-4 rounded bg-neutral-700/60 animate-pulse"
              style={{ width, minWidth: PLACEHOLDER_MIN_WIDTHS[i] }}
            />
          ))}
      </div>
    );
  }

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
