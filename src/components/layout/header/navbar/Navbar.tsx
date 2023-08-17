"use client";
import Image from "next/image";
import React, { useState } from "react";
import Hamburger from "../hamburger/Hamburger";
import SearchProducts from "./search-products/SearchProducts";
import NavLinks from "./nav-links/NavLinks";
import Link from "next/link";
import { useRouter } from "next/navigation";

const links: any = [
  {
    text: "Filamenti",
    link: "/shop/category/filament",
    links: [
      { text: "Sve", link: "/", links: [] },
      {
        text: "Azurefilm",
        link: "/",
        links: [
          { text: "Sve", link: "/", links: [] },
          { text: "PLA", link: "/", links: [] },
          { text: "PTG", link: "/", links: [] },
          { text: "Silk", link: "/", links: [] },
          { text: "ABS", link: "/", links: [] },
          { text: "ASA", link: "/", links: [] },
          { text: "Fleksibilni", link: "/", links: [] },
          { text: "PCTG", link: "/", links: [] },
          {
            text: "Pet Carbon",
            link: "/",
            links: [],
          },
          {
            text: "Paht Carbon",
            link: "/",
            links: [],
          },
          { text: "Nylon", link: "/", links: [] },
          { text: "Wood", link: "/", links: [] },
        ],
      },
      {
        text: "Creality",
        link: "/",
        links: [
          { text: "Sve", link: "/", links: [] },
          { text: "PLA", link: "/", links: [] },
          { text: "PLA Matte", link: "/", links: [] },
          { text: "PLA Rainbow", link: "/", links: [] },
          { text: "PLA Wood", link: "/", links: [] },
          { text: "PETG", link: "/", links: [] },
          { text: "Silk", link: "/", links: [] },
          { text: "ABS", link: "/", links: [] },
          { text: "TPU", link: "/", links: [] },
          { text: "Floroscent", link: "/", links: [] },
        ],
      },
    ],
  },
  {
    text: "Resini",
    link: "/shop/category/resini",
    links: [
      {
        text: "Creality",
        link: "/",
      },
    ],
  },
  {
    text: "3D Printeri",
    link: "/shop/category/3d-printeri",
    links: [
      {
        text: "Sve",
        link: "/",
      },
      {
        text: "Creality",
        link: "/",
        links: [
          {
            text: "Sve",
            link: "/",
          },
          { text: "FDM", link: "/", links: [] },
          { text: "Resin", link: "/", links: [] },
        ],
      },
      { text: "Flash Forge", link: "/", links: [] },
      { text: "Snapmaker", link: "/", links: [] },
      { text: "Prusa", link: "/", links: [] },
    ],
  },
  {
    text: "3D Skeneri",
    link: "/shop/category/3d-skeneri",
    links: [{ text: "Sve", link: "/", links: [] }],
  },
  {
    text: "Laseri",
    link: "/shop/category/laseri",
    links: [
      { text: "Sve", link: "/", links: [] },
      { text: "Creality", link: "/", links: [] },
    ],
  },
  {
    text: "Dijelovi",
    link: "/shop/category/dijelovi",
    links: [
      { text: "Sve", link: "/", links: [] },
      { text: "Dizne", link: "/", links: [] },
      {
        text: "Podloge",
        link: "/",
        links: [
          { text: "Sve", link: "/", links: [] },
          { text: "Soft", link: "/", links: [] },
          { text: "Pei", link: "/", links: [] },
          { text: "Carbon Glass", link: "/", links: [] },
        ],
      },
      { text: "Full Hotend Kit", link: "/", links: [] },
      { text: "Hotend Kit", link: "/", links: [] },
      { text: "Ekstruderi", link: "/", links: [] },
      { text: "Heat Block", link: "/", links: [] },
      {
        text: "Ventilatori",
        link: "/",
        links: [
          { text: "Sve", link: "/", links: [] },
          { text: "Blower Fan", link: "/", links: [] },
          { text: "Axial Fan", link: "/", links: [] },
        ],
      },
      { text: "Stepper Motori", link: "/", links: [] },
      { text: "Zupčanici", link: "/", links: [] },
      { text: "Ležajevi", link: "/", links: [] },
      { text: "Remeni", link: "/", links: [] },
      { text: "Silicon Cover", link: "/", links: [] },
      { text: "Opruge", link: "/", links: [] },
      { text: "-- OSTALO --", link: "/", links: [] },
    ],
  },
  {
    text: "Aksesoari",
    link: "/shop/category/aksesoari",
    links: [
      { text: "Sve", link: "/", links: [] },
      { text: "Šarafcigeri", link: "/", links: [] },
      { text: "Imbusi", link: "/", links: [] },
      { text: "Kliješta", link: "/", links: [] },
      { text: "Lakovi", link: "/", links: [] },
      { text: "Baterije", link: "/", links: [] },
      { text: "Ključevi", link: "/", links: [] },
    ],
  },
  {
    text: "Akcija",
    link: "/shop/category/akcije",
    links: [],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="md:bg-[rgba(17,17,17,0.55)] md:backdrop-blur-[30px] md:border-t border-b border-[rgba(242,242,242,0.3)] border-solid lg:sticky lg:top-0 lg:left-0 z-50">
      <div className="px-4 py-2 md:px-9 md:flex md:justify-between lg:max-w-[1920px] lg:mx-auto">
        <div
          className={`flex items-center justify-between w-full py-2 md:w-auto md:px-0 transition-all`}
        >
          <Link
            href={"/"}
            shallow
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              alt="3d part logo"
              src={"/assets/img/logo.svg"}
              width={138}
              height={44}
            />
          </Link>
        </div>
        <div className="flex items-center h-[69px] gap-4 py-[10.5px] md:px-2 w-full md:w-auto lg:w-full md:flex-grow-1 ">
          <NavLinks links={links} />
          <SearchProducts />

          <Hamburger links={links} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
