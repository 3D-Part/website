"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Hamburger from "../hamburger/Hamburger";
import SearchProducts from "./search-products/SearchProducts";
import NavLinks from "./nav-links/NavLinks";
import Link from "next/link";
import CartIcon from "../cart-icon/CartIcon";
import ProfileIcon from "@/components/layout/header/profile-icon/ProfileIcon";
import { favoritesService } from "@/shared/services/favoritesService";
import { useAppDispatch } from "@/redux/hooks";
import { changeFavoriteProducts } from "@/redux/slices/ui/uiSlice";
import { useSession } from "next-auth/react";
import FavoritesIcon from "@/components/layout/header/navbar/favorites-icon/FavoritesIcon";
import axios from "axios";
import { MenuItem } from "@/shared/types";
import { menuService } from "@/shared/services/menuService";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuLinks, setMenuLinks] = useState<MenuItem[]>([]);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await favoritesService.fetchFavorites();

        if (!data) {
          return;
        }

        const favorites = data.rows.map((x) => {
          return x.id;
        });

        dispatch(changeFavoriteProducts(favorites));
      } catch (error: any) {
        console.error("Error ", error);
      }
    };

    if (session && session.user) {
      fetchFavorites();
    }
  }, [dispatch, session]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await menuService.fetchMenuItems();

        setMenuLinks(response.menu.items);

      } catch (error) {
        console.error('Error loading menu structure:', error);

        // Fallback to hardcoded links if JSON fails to load
        const response = await axios.get('/menu-structure.json');

        setMenuLinks(response.data);
      }
    };

    fetchLinks();
  }, [])

  return (
    <div className="md:bg-[rgba(17,17,17,0.55)] md:backdrop-blur-[30px] md:border-t border-b border-[rgba(242,242,242,0.3)] border-solid lg:sticky lg:top-0 lg:left-0 z-50">
      <div className="px-4 py-2 lg:px-9 lg:flex md:justify-between lg:max-w-[1920px] lg:mx-auto">
        <div
          className={`flex items-center justify-between w-full py-2 md:w-auto md:px-0 transition-all`}
        >
          <Link href={"/"}>
            <Image
              alt="3d part logo"
              src={"/assets/img/logo.svg"}
              width={138}
              height={44}
            />
          </Link>

          <div className="flex items-center gap-3 lg:hidden">
            {session && session.user && <FavoritesIcon />}
            <CartIcon className="" />
            <ProfileIcon />
          </div>
        </div>
        <div className="flex items-center h-[69px] gap-4 py-[10.5px] md:px-2 w-full md:w-auto lg:w-full md:flex-grow-1 ">
          <NavLinks links={menuLinks} />
          <SearchProducts />

          <div className="items-center hidden gap-3 lg:flex">
            {session && session.user && <FavoritesIcon />}
            <CartIcon className="" />
            <ProfileIcon />
          </div>

          <Hamburger links={menuLinks} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
