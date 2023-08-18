import Container from "@/components/common/container/Container";
import Heading5 from "@/components/common/text/heading/Heading5";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import Link from "next/link";
import React from "react";

const FooterLinks = () => {
  return (
    <Container className="grid grid-cols-2 px-4 mx-auto pt-11 gap-y-6 lg:grid-cols-3 lg:justify-center lg:pt-24">
      <div className="flex flex-col lg:mx-auto gap:4 lg:flex">
        <Heading5 className="mb-2">Proizvodi</Heading5>
        <Paragraph size="M" weight="Regular" className="py-1 text-neutral-200">
          <Link href={"/shop/category/filamenti"}>Filamenti</Link>
        </Paragraph>
        <Paragraph size="M" weight="Regular" className="py-1 text-neutral-200">
          <Link href={"/shop/category/resini"}>Resini</Link>
        </Paragraph>
        <Paragraph size="M" weight="Regular" className="py-1 text-neutral-200">
          <Link href={"/shop/category/3d-printeri"}>3D Printeri</Link>
        </Paragraph>
        <Paragraph size="M" weight="Regular" className="py-1 text-neutral-200">
          <Link href={"/shop/category/laseri"}>Laseri</Link>
        </Paragraph>
        <Paragraph size="M" weight="Regular" className="py-1 text-neutral-200">
          <Link href={"/shop/category/dijelovi"}>Dijelovi</Link>
        </Paragraph>
      </div>
      <div className="flex flex-col gap:4 lg:flex lg:mx-auto">
        <Heading5 className="mb-2">Podrška</Heading5>
        <Paragraph size="M" weight="Regular" className="py-1 text-neutral-200">
          Česta pitanja
        </Paragraph>
        <Paragraph size="M" weight="Regular" className="py-1 text-neutral-200">
          Metode plaćanja
        </Paragraph>
        <Paragraph size="M" weight="Regular" className="py-1 text-neutral-200">
          Uslovi korišćenja
        </Paragraph>
      </div>
      <div className="flex flex-col col-span-2 gap-4 lg:flex lg:mx-auto lg:col-span-1">
        <Heading5 className="mb-2">Kontakt</Heading5>
        <div>
          <Paragraph size="M" weight="Semibold">
            Email:
          </Paragraph>
          <Paragraph size="M" weight="Regular" className="text-neutral-200">
            info@3dpartshop.com
          </Paragraph>
        </div>
        <div>
          <Paragraph size="M" weight="Semibold">
            Email:
          </Paragraph>
          <Paragraph size="M" weight="Regular" className="text-neutral-200">
            info@3dpartshop.com
          </Paragraph>
        </div>
        <div>
          <Paragraph size="M" weight="Semibold">
            Ulica:
          </Paragraph>
          <Paragraph size="M" weight="Regular" className="text-neutral-200">
            Blagoja Parovića 108
          </Paragraph>
          <Paragraph size="M" weight="Regular" className="text-neutral-200">
            Banja Luka, 78000
          </Paragraph>
        </div>
      </div>
    </Container>
  );
};

export default FooterLinks;
