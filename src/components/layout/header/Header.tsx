import { cached } from "../../../../services/setup";
import React from "react";
import HeaderInfo from "./header-info/HeaderInfo";
import Navbar from "./navbar/Navbar";
import HeaderShell from "./HeaderShell";
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
    const response = await fetch(`${base}shop/menu`, { next: cached });
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
    <HeaderShell>
      <div className="relative z-20">
        <HeaderInfo />
        <Navbar initialMenu={menu} />
      </div>
    </HeaderShell>
  );
};

export default Header;
