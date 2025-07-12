"use client";
import Input from "@/components/common/input/Input";
import Spinner from "@/components/common/spinner/Spinner";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import Textarea from "@/components/common/textarea/Textarea";
import { userService } from "@/shared/services/userService";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const PickupOptionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    // state: "",
    city: "",
    postCode: "",
    image: "/assets/img/logo.svg",
  });

  const { status } = useSession();

  useEffect(() => {
    if (status === "loading" || status === "unauthenticated") {
      return;
    }
    setIsLoading(true);
    const fetchUserProfile = async () => {
      try {
        const data = await userService.getUserProfile();

        console.log(data)

        if (!data) {
          return;
        }

        setUserData({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          street: data.street || "",
          // state: data.state || "",
          city: data.city || "",
          postCode: data.postCode || "",
          image: data.image || "/assets/img/logo.svg",
        });
      } catch (error: any) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Paragraph size="L" weight="Medium" className="mt-4">
        1. Informacije o kupcu
      </Paragraph>
      <div className="flex gap-4">
        <Input
          placeholder="Ime i prezime"
          required
          id={"fullName"}
          value={userData.fullName}
        />
      </div>
      <Input
        placeholder="Email"
        id={"email"}
        type="email"
        value={userData.email}
      />
      <Input
        placeholder="Telefon"
        required
        id={"phone"}
        type="tel"
        value={userData.phone}
      />
      {/* <Input placeholder="Država" id={"country"} value={userData.fullName} /> */}
      <Input placeholder="Ulica" id={"street"} value={userData.street} />
      <div className="flex gap-4">
        <Input placeholder="Grad" id={"city"} value={userData.city} />
        <Input
          placeholder="ZIP"
          id={"postCode"}
          type="number"
          value={userData.postCode}
        />
      </div>
      {/* <Input placeholder="JIB" id={"jib"} /> */}
      <Textarea
        cols={50}
        id="description"
        maxLength={500}
        placeholder="Dodatni opis"
        rows={4}
      />
    </>
  );
};

export default PickupOptionForm;
