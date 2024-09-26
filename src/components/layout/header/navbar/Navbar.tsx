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

const creality = "062c42d0-3dab-11ee-bb4e-994af83111f0";
const azurefilm = "03cbbd90-3dab-11ee-bb4e-994af83111f0";
const flashforge = "0c796b90-3dab-11ee-bb4e-994af83111f0";
const snapmaker = "0ef0fb40-3dab-11ee-bb4e-994af83111f0";
const prusa = "11d97530-3dab-11ee-bb4e-994af83111f0";
const bambuLab = "c443cf80-711e-11ee-827a-7b9a99b62772";

const links: any = [
  {
    text: "Filamenti",
    link: "/shop/category/filament",
    links: [
      { text: "Sve", link: "/shop/category/filamenti", links: [] },
      {
        text: "Azurefilm",
        link: "/",
        links: [
          {
            text: "Sve",
            link: "/shop/category/filamenti?manufacturerId=" + azurefilm,
            links: [],
          },
          {
            text: "PLA",
            link: "/shop/category/pla?manufacturerId=" + azurefilm,
            links: [],
          },
          {
            text: "PLA+",
            link: "/shop/category/plaplus?manufacturerId=" + azurefilm,
            links: [],
          },
          {
            text: "PETG",
            link: "/shop/category/ptg?manufacturerId=" + azurefilm,
            links: [],
          },
          {
            text: "Silk",
            link: "/shop/category/silk?manufacturerId=" + azurefilm,
            links: [],
          },
          {
            text: "ABS",
            link: "/shop/category/abs?manufacturerId=" + azurefilm,
            links: [],
          },
          {
            text: "ASA",
            link: "/shop/category/asa?manufacturerId=" + azurefilm,
            links: [],
          },
          {
            text: "Fleksibilni",
            link: "/shop/category/fleksibilni?manufacturerId=" + azurefilm,
            links: [],
          },
          {
            text: "PCTG",
            link: "/shop/category/pctg?manufacturerId=" + azurefilm,
            links: [],
          },
          {
            text: "Pet Carbon",
            link: "/shop/category/pet-carbon?manufacturerId=" + azurefilm,
            links: [],
          },
          {
            text: "Paht Carbon",
            link: "/shop/category/paht-carbon?manufacturerId=" + azurefilm,
            links: [],
          },
          {
            text: "Nylon",
            link: "/shop/category/nylon?manufacturerId=" + azurefilm,
            links: [],
          },
          {
            text: "Wood",
            link: "/shop/category/wood?manufacturerId=" + azurefilm,
            links: [],
          },
        ],
      },
      {
        text: "Creality",
        link: "/",
        links: [
          {
            text: "Sve",
            link: "/shop/category/filamenti?manufacturerId=" + creality,
            links: [],
          },
          {
            text: "PLA",
            link: "/shop/category/pla?manufacturerId=" + creality,
            links: [],
          },
          {
            text: "PLA+",
            link: "/shop/category/plaplus?manufacturerId=" + creality,
            links: [],
          },
          {
            text: "PLA Matte",
            link: "/shop/category/pla-matte?manufacturerId=" + creality,
            links: [],
          },
          // {
          //   text: "PLA Rainbow",
          //   link: "/shop/category/pla-rainbow?manufacturerId=" + creality,
          //   links: [],
          // },
          // {
          //   text: "PLA Wood",
          //   link: "/shop/category/pla-wood?manufacturerId=" + creality,
          //   links: [],
          // },
          {
            text: "PETG",
            link: "/shop/category/petg?manufacturerId=" + creality,
            links: [],
          },
          {
            text: "Silk",
            link: "/shop/category/silk?manufacturerId=" + creality,
            links: [],
          },
          {
            text: "ABS",
            link: "/shop/category/abs?manufacturerId=" + creality,
            links: [],
          },
          {
            text: "TPU",
            link: "/shop/category/tpu?manufacturerId=" + creality,
            links: [],
          },
          {
            text: "Floroscent",
            link: "/shop/category/floroscent?manufacturerId=" + creality,
            links: [],
          },
        ],
      },
    ],
  },
  {
    text: "Resini",
    link: "/shop/category/resini",
    links: [
      // { text: "Sve", link: "/shop/category/resini", links: [] },
      {
        text: "Creality",
        link: "/shop/category/resini?manufacturerId=" + creality,
      },
    ],
  },
  {
    text: "3D Printeri",
    link: "/shop/category/3d-printeri",
    links: [
      {
        text: "Sve",
        link: "/shop/category/3d-printeri",
      },
      {
        text: "Creality",
        link: "/",
        links: [
          {
            text: "Sve",
            link: "/shop/category/3d-printeri?manufacturerId=" + creality,
          },
          {
            text: "FDM",
            link: "/shop/category/fdm?manufacturerId=" + creality,
            links: [],
          },
          {
            text: "Resin",
            link: "/shop/category/resin?manufacturerId=" + creality,
            links: [],
          },
        ],
      },
      {
        text: "Flash Forge",
        link: "/shop/category/3d-printeri?manufacturerId=" + flashforge,
        links: [],
      },
      {
        text: "Snapmaker",
        link: "/shop/category/3d-printeri?manufacturerId=" + snapmaker,
        links: [],
      },
      {
        text: "Prusa",
        link: "/shop/category/3d-printeri?manufacturerId=" + prusa,
        links: [],
      },
      // TODO: OPASNO, NE DIRAJ
      // {
      //   text: "Bambu Lab",
      //   link: "/shop/category/3d-printeri?manufacturerId=" + bambuLab,
      //   links: [],
      // },
    ],
  },
  {
    text: "3D Skeneri",
    link: "/shop/category/3d-skeneri",
    links: [],
  },
  {
    text: "Laseri",
    link: "/shop/category/laseri",
    links: [
      { text: "Sve", link: "/shop/category/laseri", links: [] },
      {
        text: "Creality",
        link: "/shop/category/laseri?manufacturerId=" + creality,
        links: [],
      },
    ],
  },
  {
    text: "Dijelovi",
    link: "/shop/category/dijelovi",
    links: [
      { text: "Sve", link: "/shop/category/dijelovi", links: [] },
      { text: "Dizne", link: "/shop/category/dizne", links: [] },
      {
        text: "Podloge",
        link: "/shop/category/podloge",
        links: [
          { text: "Sve", link: "/shop/category/podloge", links: [] },
          { text: "Soft", link: "/shop/category/soft", links: [] },
          { text: "Pei", link: "/shop/category/pei", links: [] },
          {
            text: "Carbon Glass",
            link: "/shop/category/carbon-glass",
            links: [],
          },
        ],
      },
      {
        text: "Full Hotend Kit",
        link: "/shop/category/full-hotend-kit",
        links: [],
      },
      { text: "Hotend Kit", link: "/shop/category/hotend-kit", links: [] },
      { text: "Ekstruderi", link: "/shop/category/ekstruderi", links: [] },
      { text: "Heat Block", link: "/shop/category/heat-block", links: [] },
      {
        text: "Ventilatori",
        link: "/shop/category/ventilatori",
        links: [
          { text: "Sve", link: "/shop/category/ventilatori", links: [] },
          { text: "Blower Fan", link: "/shop/category/blower-fan", links: [] },
          { text: "Axial Fan", link: "/shop/category/axial-fan", links: [] },
        ],
      },
      {
        text: "Stepper Motori",
        link: "/shop/category/stepper-motori",
        links: [],
      },
      // { text: "Zupčanici", link: "/shop/category/zupčanici", links: [] },
      { text: "Ležajevi", link: "/shop/category/ležajevi", links: [] },
      // { text: "Remeni", link: "/shop/category/remeni", links: [] },
      // {
      //   text: "Silicon Cover",
      //   link: "/shop/category/silicon-cover",
      //   links: [],
      // },
      // { text: "Opruge", link: "/shop/category/opruge", links: [] },
      { text: "-- OSTALO --", link: "/shop/category/ostalo", links: [] },
    ],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
          <NavLinks links={links} />
          <SearchProducts />

          <div className="items-center hidden gap-3 lg:flex">
            {session && session.user && <FavoritesIcon />}
            <CartIcon className="" />
            <ProfileIcon />
          </div>

          <Hamburger links={links} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
