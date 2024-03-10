"use client";
import Button from "@/components/common/button/Button";
import Container from "@/components/common/container/Container";
import Input from "@/components/common/input/Input";
import Heading2 from "@/components/common/text/heading/Heading2";
import Heading4 from "@/components/common/text/heading/Heading4";
import { notify } from "@/components/common/toast/Toastify";
import { useAppDispatch } from "@/redux/hooks";
import { changeIsGlobalLoading } from "@/redux/slices/ui/uiSlice";
import { userService } from "@/shared/services/userService";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

const ProfilePage: FC = () => {
  const [buttonDisabled, setBUttonDisabled] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    // state: "",
    city: "",
    postCode: "",
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await userService.getUserProfile();

        console.log("data", data);

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
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setBUttonDisabled(true);
    dispatch(changeIsGlobalLoading(true));

    const payload = {
      city: event.target.city.value,
      // email: event.target.email.value,
      fullName: event.target.fullName.value,
      phone: event.target.phone.value,
      postCode: event.target.postCode.value,
      street: event.target.street.value,
    };

    try {
      await userService.updateProfile(payload);
      notify("Profil uređen", { type: "success" });
    } catch (error: any) {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", error);
      notify(error?.response?.data?.errors[0]?.message, { type: "error" });

      console.error(error);
    }

    setBUttonDisabled(false);
    dispatch(changeIsGlobalLoading(false));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full">
        <Container className="min-h-screen py-6 bg-neutral-900 px-9">
          <div className="flex flex-col items-center lg:items-start lg:flex-row">
            <div className="lg:flex-1">
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
              <div className="lg:flex-row flex flex-col lg:gap-[78px] gap-6">
                <div>
                  <Heading4 className="my-9">Osnovni podaci</Heading4>
                  <Input
                    placeholder="Ime i prezime "
                    id={"fullName"}
                    value={userData.fullName}
                  />
                  <Input
                    placeholder="Email "
                    id={"email"}
                    className="mt-4"
                    value={userData.email}
                    disabled
                  />
                  <Input
                    placeholder="Broj telefona "
                    id={"phone"}
                    className="mt-4"
                    value={userData.phone}
                  />
                </div>
                <div>
                  <Heading4 className="my-9">Podaci o boravištu</Heading4>
                  <div className="flex gap-4">
                    <Input
                      placeholder="Ulica "
                      id={"street"}
                      value={userData.street}
                    />
                  </div>
                  {/* <Input
                  placeholder="Država "
                  id={"state"}
                  className="mt-4"
                  value={userData.state}
                /> */}
                  <div className="flex gap-4 mt-4">
                    <Input
                      placeholder="Grad "
                      id={"city"}
                      value={userData.city}
                    />
                    <Input
                      placeholder="Poštanski broj"
                      id={"postCode"}
                      value={userData.postCode}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* ----------------------------------------------------------- */}
            <input
              type="submit"
              disabled={buttonDisabled}
              onSubmit={handleSubmit}
              className="w-[190px] h-12 whitespace-nowrap bg-primary-600 mt-10 lg:mt-0 font-semibold rounded-lg cursor-pointer"
              value=" Sačuvaj promijene"
            />
          </div>

          <div className="flex justify-center w-full lg:justify-start">
            <Button
              onClick={() => {
                setBUttonDisabled(true);
                signOut();
                setBUttonDisabled(false);
              }}
              size="L"
              type="primary"
              disabled={buttonDisabled}
              className="w-[190px] h-12 whitespace-nowrap !bg-error-500 mt-6 lg:mt-16  font-semibold"
            >
              Odjavi se
            </Button>
          </div>
        </Container>
      </div>
    </form>
  );
};

export default ProfilePage;
