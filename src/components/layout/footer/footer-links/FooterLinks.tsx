'use client'

import Container from "@/components/common/container/Container";
import Heading5 from "@/components/common/text/heading/Heading5";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import useSettingsApi from "@/redux/api/useSettingsApi";
import Link from "next/link";
import React from "react";

const FooterLinks = () => {
  const { settings } = useSettingsApi();


  return (
    <Container className="grid grid-cols-2 px-4 mx-auto gap-y-6 lg:grid-cols-3 lg:justify-center ">
      <div className="flex flex-col lg:mx-auto gap:4 lg:flex">
        <Heading5 className="mb-2">Proizvodi</Heading5>
        <Paragraph size="M" weight="Regular" className="py-1 text-neutral-200">
          <Link prefetch href={"/shop/category/filamenti"}>
            Filamenti
          </Link>
        </Paragraph>
        <Paragraph size="M" weight="Regular" className="py-1 text-neutral-200">
          <Link prefetch href={"/shop/category/resini"}>
            Resini
          </Link>
        </Paragraph>
        <Paragraph size="M" weight="Regular" className="py-1 text-neutral-200">
          <Link prefetch href={"/shop/category/3d-printeri"}>
            3D Printeri
          </Link>
        </Paragraph>
        <Paragraph size="M" weight="Regular" className="py-1 text-neutral-200">
          <Link prefetch href={"/shop/category/laseri"}>
            Laseri
          </Link>
        </Paragraph>
        <Paragraph size="M" weight="Regular" className="py-1 text-neutral-200">
          <Link prefetch href={"/shop/category/dijelovi"}>
            Dijelovi
          </Link>
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
          {settings.settings.company.emails.map((e, i) => (
            <Paragraph key={`email-${i}`} size="M" weight="Regular" className="text-neutral-200">
              {e}
            </Paragraph>
          ))}
        </div>
        <div>
          <Paragraph size="M" weight="Semibold">
            Ulica:
          </Paragraph>
          <Paragraph size="M" weight="Regular" className="text-neutral-200">
            {settings.settings.company.address}
          </Paragraph>
          <Paragraph size="M" weight="Regular" className="text-neutral-200">
            {settings.settings.company.town}
          </Paragraph>
        </div>
      </div>
    </Container>
  );
};

export default FooterLinks;
