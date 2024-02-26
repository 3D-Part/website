"use client";
import Button from "@/components/common/button/Button";
import Container from "@/components/common/container/Container";
import Input from "@/components/common/input/Input";
import Heading2 from "@/components/common/text/heading/Heading2";
import Heading4 from "@/components/common/text/heading/Heading4";
import Image from "next/image";
import { FC } from "react";

const ProfilePage: FC = () => {
  return (
    <div className="w-full">
      <Container className="flex flex-col items-center min-h-screen py-6 lg:items-start lg:flex-row bg-neutral-900 px-9">
        <div className=" lg:flex-1">
          <div className="flex flex-col items-center gap-9 lg:items-start">
            <Heading2 className="">Uredi profil</Heading2>
            <Image
              width={151}
              height={151}
              alt="profile photo"
              src={"/assets/img/slider/product2.png"}
              className="rounded-full "
            />
          </div>
          {/* ----------------------------------------------------------- */}
          <form className="lg:flex-row flex flex-col lg:gap-[78px] gap-6">
            <div>
              <Heading4 className="my-9">Osnovni podaci</Heading4>
              <div className="flex gap-4">
                <Input placeholder="Ime " id={"ime"} />
                <Input placeholder="Prezime" id={"prezime"} />
              </div>
              <Input placeholder="Email " id={"email"} className="mt-4" />
              <Input
                placeholder="Broj telefona "
                id={"telefon"}
                className="mt-4"
              />
            </div>
            <div>
              <Heading4 className="my-9">Podaci o boravištu</Heading4>
              <div className="flex gap-4">
                <Input placeholder="Ulica " id={"ulica"} />
              </div>
              <Input placeholder="Država " id={"drzava"} className="mt-4" />
              <div className="flex gap-4 mt-4">
                <Input placeholder="Grad " id={"grad"} />
                <Input placeholder="Poštanski broj" id={"postanskiBroj"} />
              </div>
            </div>
          </form>
        </div>
        {/* ----------------------------------------------------------- */}
        <Button
          onClick={() => {
            console.log("sacuvaj promjene");
          }}
          size="L"
          type="primary"
          disabled={false}
          className="w-[190px] h-12 whitespace-nowrap bg-primary-600 mt-10 lg:mt-0 font-semibold"
        >
          Sačuvaj promijene
        </Button>
      </Container>
    </div>
  );
};

export default ProfilePage;
