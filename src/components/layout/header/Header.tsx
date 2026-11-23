import React from "react";
import HeaderInfo from "./header-info/HeaderInfo";
import Navbar from "./navbar/Navbar";
import { MenuItem } from "@/shared/types";

/**
 * The menu is fetched here, on the server, so it is in the first HTML and the
 * header does not change shape when the links arrive. Kept for a minute, as
 * the menu hardly ever changes. When the fetch fails, the browser asks for it
 * itself (see Navbar).
 */
const getMenu = async (): Promise<MenuItem[] | null> => {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!base) return null;
  try {
    const response = await fetch(`${base}shop/menu`, { next: { revalidate: 60 } });
    if (!response.ok) return null;
    const data = await response.json();
    return Array.isArray(data?.menu?.items) ? data.menu.items : null;
  } catch {
    return null;
  }
};

const Header = async () => {
  const menu = await getMenu();
  return (
    <header className="relative z-50 bg-[rgba(17,17,17,0.72)] backdrop-blur-[14px] lg:sticky lg:top-0">
      <div className="relative z-20">
        <HeaderInfo />
        <Navbar initialMenu={menu} />
      </div>
    </header>
  );
};

export default Header;
