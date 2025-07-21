"use client";
import Button from "@/components/common/button/Button";
import Container from "@/components/common/container/Container";
import Input from "@/components/common/input/Input";
import Spinner from "@/components/common/spinner/Spinner";
import Heading2 from "@/components/common/text/heading/Heading2";
import Heading4 from "@/components/common/text/heading/Heading4";
import { notify } from "@/components/common/toast/Toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isUserVerifiedSelector } from "@/redux/slices/ui/uiSelectors";
import {
  changeIsGlobalLoading,
  changeIsUserVerified,
} from "@/redux/slices/ui/uiSlice";
import JWT from "@/shared/helper/jwtToken";
import AuthAPI from "@/shared/services/auth";
import { userService } from "@/shared/services/userService";
import { signOut, useSession } from "next-auth/react";
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
    image: "/assets/img/logo.svg",
    discount: 0
  });

  const [isLoading, setIsLoading] = useState(false);
  const isVerified = useAppSelector(isUserVerifiedSelector);

  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsLoading(true);

    const fetchProfile = async () => {
      const data = await userService.fetchUserProfile();

      if (!data) return;

      console.info('profile-details')

      setUserData({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        street: data.street || "",
        // state: data.state || "",
        city: data.city || "",
        postCode: data.postCode || "",
        image: data.image || "/assets/img/logo.svg",
        discount: data.discount || 0
      });
    }

    try {
      fetchProfile();

      dispatch(changeIsUserVerified(true));
    } catch (error: any) {
      console.error("Error fetching user profile:", error);
      if (error?.response?.data.key === "FORBIDDEN_ERROR") {
        dispatch(changeIsUserVerified(false));
      }
    }

    setIsLoading(false);
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
      notify(error?.response?.data?.errors[0]?.message, { type: "error" });

      console.error(error);
    }

    setBUttonDisabled(false);
    dispatch(changeIsGlobalLoading(false));
  };

  if (isLoading || isVerified === null || !session || !session.user) {
    return (
      <div className="flex items-center justify-center w-screen h-[calc(100vh-150px)] overflow-hidden">
        <Spinner />
      </div>
    );
  }

  if (isVerified === false) {
    return (
      <Container className="flex flex-col items-center min-h-screen gap-4 py-6 max-w-auto bg-neutral-900 px-9">
        <Image
          alt="3d part logo"
          src={"/assets/img/logo.svg"}
          width={138 * 2}
          height={44 * 2}
          priority
          className="my-6 "
        />
        <p className="text-4xl text-center">Nalog nije verifikovan</p>
        <p className="text-lg text-center">
          Ako niste zaprimili kod na vaš mail, možete ponovo poslati kod
        </p>
        <Button
          onClick={() => {
            AuthAPI.resendVerificationCode();
            notify("Kod poslat", { type: "success" });
          }}
          type="primary"
          size="L"
        >
          Pošalji ponovo
        </Button>
      </Container>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full bg-neutral-900">
        <Container className="min-h-screen py-6 !max-w-auto bg-neutral-900 px-9">
          <div className="flex flex-col items-center lg:items-start lg:flex-row">
            <div className="lg:flex-1">
              <div className="flex flex-col items-center gap-9 lg:items-start">
                <Heading2 className="">Uredi profil</Heading2>
                <Image
                  width={151}
                  height={151}
                  alt="profile photo"
                  src={userData.image}
                  className="border border-white rounded-full w-[155px] h-[155px] p-1"
                />
                {userData.discount > 0 && <div className="lg:text-[28px] font-semibold lg:leading-9 text-2xl leading-8">Discount: <span className="text-primary-400">{userData.discount}%</span></div>}
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
              value=" Sačuvaj promjene"
            />
          </div>

          <div className="flex justify-center w-full lg:justify-start">
            <Button
              onClick={() => {
                setBUttonDisabled(true);
                signOut();
                JWT.deleteJwtTokens();
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
