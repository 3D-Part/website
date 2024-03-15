"use client";
import Spinner from "@/components/common/spinner/Spinner";
import { UserIcon } from "@/components/layout/modals/auth-modal/SignUpForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isUserVerifiedSelector } from "@/redux/slices/ui/uiSelectors";
import {
  changeIsModalAuthVisible,
  changeIsUserVerified,
} from "@/redux/slices/ui/uiSlice";
import { userService } from "@/shared/services/userService";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathName = usePathname();

  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();

  const isVerified = useAppSelector(isUserVerifiedSelector);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await userService.getUserProfile();

        if (!data) {
          return;
        }

        dispatch(changeIsUserVerified(true));
      } catch (error: any) {
        console.error("Error fetching user profile:", error);
        if (error?.response?.data.key === "FORBIDDEN_ERROR") {
          dispatch(changeIsUserVerified(false));
        }
      }
    };

    fetchUserProfile();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-screen h-[calc(100vh-150px)] overflow-hidden">
        <Spinner />
      </div>
    );
  }

  if (!(session && session.user)) {
    router.push("/");
    dispatch(changeIsModalAuthVisible(true));
  }

  return (
    <div className="flex flex-col lg:flex-row lg:w-full">
      <div className="flex items-center justify-center h-auto gap-4 p-2 lg:px-6 lg:py-3 border-b border-solid border-neutral-600 bg-neutral-900 lg:flex-col lg:justify-start lg:w-[300px] lg:w-[300px] lg:border-r lg:border-b-0">
        <Link
          href="/profile-details"
          type="button"
          className={`flex items-center justify-center p-3 rounded-lg transition-all  h-14 w-14 lg:gap-5   lg:w-full ${
            pathName === "/profile-details"
              ? "bg-neutral-600 lg:text-white lg:bg-transparent lg:hover:bg-neutral-700"
              : "bg-neutral-800 hover:bg-neutral-700 lg:bg-transparent lg:hover:bg-neutral-700 lg:text-[#888888]"
          }`}
        >
          <div className="flex items-center flex-1 gap-2">
            <UserIcon
              scale={2}
              fill={pathName === "/profile-details" ? "#387BE8" : "#1A3A73"}
            />
            <span className="hidden lg:block">Uredi profil</span>
          </div>
          <ArrowSvg
            fill={pathName === "/profile-details" ? "white" : "#888888"}
          />
        </Link>
        {isVerified && (
          <>
            <Link
              href="/profile-details/coupons"
              type="button"
              className={`flex items-center justify-center p-3 rounded-lg transition-all  h-14 w-14 lg:gap-5  lg:w-full  ${
                pathName === "/profile-details/coupons"
                  ? "bg-neutral-600 lg:text-white lg:bg-transparent lg:hover:bg-neutral-700"
                  : "bg-neutral-800 hover:bg-neutral-700 lg:bg-transparent lg:hover:bg-neutral-700 lg:text-[#888888]"
              }`}
            >
              <div className="flex items-center flex-1 gap-2">
                <PromoSvg
                  scale={1.5}
                  fill={
                    pathName === "/profile-details/coupons"
                      ? "#387BE8"
                      : "#1A3A73"
                  }
                />
                <span className="hidden lg:block">Promo kodovi</span>
              </div>
              <ArrowSvg
                fill={
                  pathName === "/profile-details/coupons" ? "white" : "#888888"
                }
              />
            </Link>
            <Link
              href="/reset-password"
              type="button"
              className={`flex items-center justify-center p-3 rounded-lg transition-all  h-14 w-14 lg:gap-5  lg:w-full ${
                pathName === "/reset-password"
                  ? "bg-neutral-600 lg:text-white lg:bg-transparent lg:hover:bg-neutral-700"
                  : "bg-neutral-800 hover:bg-neutral-700 lg:bg-transparent lg:hover:bg-neutral-700 lg:text-[#888888]"
              }`}
            >
              <div className="flex items-center flex-1 gap-2">
                <LockSvg
                  scale={1.5}
                  fill={pathName === "/reset-password" ? "#387BE8" : "#1A3A73"}
                />
                <span className="hidden lg:block">Postavke i sigurnost</span>
              </div>
              <ArrowSvg
                fill={pathName === "/reset-password" ? "white" : "#888888"}
              />
            </Link>
          </>
        )}
      </div>
      <div className="flex-1 lg:max-w-[calc(100%-300px)]">{children}</div>
    </div>
  );
};

export default Layout;

const PromoSvg: FC<{ scale?: number; fill?: string }> = ({
  scale = 1,
  fill = "#387BE8",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20 * scale}
      height={20 * scale}
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0_129_12414)">
        <path
          d="M13.3333 0H13.225C12.8521 0.00354318 12.4908 0.130844 12.1981 0.361916C11.9053 0.592988 11.6976 0.914744 11.6075 1.27667C11.511 1.62903 11.3014 1.93994 11.011 2.16155C10.7205 2.38316 10.3653 2.5032 10 2.5032C9.63467 2.5032 9.27945 2.38316 8.98901 2.16155C8.69856 1.93994 8.48898 1.62903 8.3925 1.27667C8.30241 0.914744 8.09468 0.592988 7.80192 0.361916C7.50916 0.130844 7.14795 0.00354318 6.775 0L6.66667 0C5.562 0.00132321 4.50296 0.440735 3.72185 1.22185C2.94073 2.00296 2.50132 3.062 2.5 4.16667V17.5C2.5 18.163 2.76339 18.7989 3.23223 19.2678C3.70107 19.7366 4.33696 20 5 20H6.775C7.14795 19.9965 7.50916 19.8692 7.80192 19.6381C8.09468 19.407 8.30241 19.0853 8.3925 18.7233C8.48898 18.371 8.69856 18.0601 8.98901 17.8385C9.27945 17.6168 9.63467 17.4968 10 17.4968C10.3653 17.4968 10.7205 17.6168 11.011 17.8385C11.3014 18.0601 11.511 18.371 11.6075 18.7233C11.6976 19.0853 11.9053 19.407 12.1981 19.6381C12.4908 19.8692 12.8521 19.9965 13.225 20H15C15.663 20 16.2989 19.7366 16.7678 19.2678C17.2366 18.7989 17.5 18.163 17.5 17.5V4.16667C17.4987 3.062 17.0593 2.00296 16.2782 1.22185C15.497 0.440735 14.438 0.00132321 13.3333 0ZM15 18.3333L13.2142 18.2808C13.0184 17.5737 12.5949 16.9509 12.0091 16.509C11.4233 16.0671 10.7082 15.8308 9.97444 15.8368C9.24073 15.8428 8.52949 16.0907 7.95102 16.5421C7.37255 16.9934 6.95917 17.6231 6.775 18.3333H5C4.77899 18.3333 4.56702 18.2455 4.41074 18.0893C4.25446 17.933 4.16667 17.721 4.16667 17.5V14.1667H5.83333C6.05435 14.1667 6.26631 14.0789 6.42259 13.9226C6.57887 13.7663 6.66667 13.5543 6.66667 13.3333C6.66667 13.1123 6.57887 12.9004 6.42259 12.7441C6.26631 12.5878 6.05435 12.5 5.83333 12.5H4.16667V4.16667C4.16667 3.50363 4.43006 2.86774 4.8989 2.3989C5.36774 1.93006 6.00363 1.66667 6.66667 1.66667L6.78583 1.71917C6.98102 2.42202 7.40083 3.0417 7.98118 3.48363C8.56153 3.92555 9.27055 4.16543 10 4.16667C10.7393 4.16038 11.4563 3.91275 12.0419 3.46147C12.6275 3.01019 13.0497 2.37995 13.2442 1.66667H13.3333C13.9964 1.66667 14.6323 1.93006 15.1011 2.3989C15.5699 2.86774 15.8333 3.50363 15.8333 4.16667V12.5H14.1667C13.9457 12.5 13.7337 12.5878 13.5774 12.7441C13.4211 12.9004 13.3333 13.1123 13.3333 13.3333C13.3333 13.5543 13.4211 13.7663 13.5774 13.9226C13.7337 14.0789 13.9457 14.1667 14.1667 14.1667H15.8333V17.5C15.8333 17.721 15.7455 17.933 15.5893 18.0893C15.433 18.2455 15.221 18.3333 15 18.3333Z"
          fill={fill}
        />
        <path
          d="M10.834 12.5H9.16732C8.9463 12.5 8.73434 12.5878 8.57806 12.7441C8.42178 12.9004 8.33398 13.1123 8.33398 13.3333C8.33398 13.5543 8.42178 13.7663 8.57806 13.9226C8.73434 14.0789 8.9463 14.1667 9.16732 14.1667H10.834C11.055 14.1667 11.267 14.0789 11.4232 13.9226C11.5795 13.7663 11.6673 13.5543 11.6673 13.3333C11.6673 13.1123 11.5795 12.9004 11.4232 12.7441C11.267 12.5878 11.055 12.5 10.834 12.5Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_129_12414">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
const LockSvg: FC<{ scale?: number; fill?: string }> = ({
  scale = 1,
  fill = "#387BE8",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20 * scale}
      height={20 * scale}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_129_12199)">
        <path
          d="M12.6673 5.616V4.66667C12.6673 3.42899 12.1757 2.242 11.3005 1.36684C10.4253 0.491665 9.23833 0 8.00065 0C6.76297 0 5.57599 0.491665 4.70082 1.36684C3.82565 2.242 3.33398 3.42899 3.33398 4.66667V5.616C2.74022 5.87514 2.23485 6.30168 1.87965 6.84347C1.52445 7.38527 1.33484 8.01882 1.33398 8.66667V12.6667C1.33504 13.5504 1.68657 14.3976 2.31146 15.0225C2.93636 15.6474 3.78359 15.9989 4.66732 16H11.334C12.2177 15.9989 13.0649 15.6474 13.6898 15.0225C14.3147 14.3976 14.6663 13.5504 14.6673 12.6667V8.66667C14.6665 8.01882 14.4768 7.38527 14.1217 6.84347C13.7665 6.30168 13.2611 5.87514 12.6673 5.616ZM4.66732 4.66667C4.66732 3.78261 5.01851 2.93477 5.64363 2.30964C6.26875 1.68452 7.1166 1.33333 8.00065 1.33333C8.88471 1.33333 9.73255 1.68452 10.3577 2.30964C10.9828 2.93477 11.334 3.78261 11.334 4.66667V5.33333H4.66732V4.66667ZM13.334 12.6667C13.334 13.1971 13.1233 13.7058 12.7482 14.0809C12.3731 14.456 11.8644 14.6667 11.334 14.6667H4.66732C4.13689 14.6667 3.62818 14.456 3.2531 14.0809C2.87803 13.7058 2.66732 13.1971 2.66732 12.6667V8.66667C2.66732 8.13623 2.87803 7.62753 3.2531 7.25245C3.62818 6.87738 4.13689 6.66667 4.66732 6.66667H11.334C11.8644 6.66667 12.3731 6.87738 12.7482 7.25245C13.1233 7.62753 13.334 8.13623 13.334 8.66667V12.6667Z"
          fill={fill}
        />
        <path
          d="M8.00065 9.33325C7.82384 9.33325 7.65427 9.40349 7.52925 9.52851C7.40422 9.65354 7.33398 9.82311 7.33398 9.99992V11.3333C7.33398 11.5101 7.40422 11.6796 7.52925 11.8047C7.65427 11.9297 7.82384 11.9999 8.00065 11.9999C8.17746 11.9999 8.34703 11.9297 8.47206 11.8047C8.59708 11.6796 8.66732 11.5101 8.66732 11.3333V9.99992C8.66732 9.82311 8.59708 9.65354 8.47206 9.52851C8.34703 9.40349 8.17746 9.33325 8.00065 9.33325Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_129_12199">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
const ArrowSvg: FC<{ scale?: number; fill?: string }> = ({
  scale = 1,
  fill = "white",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={scale * 6}
      height={scale * 12}
      viewBox="0 0 6 12"
      fill="none"
      className="hidden lg:block"
    >
      <path
        d="M0.435786 0.249225C0.36392 0.328898 0.306879 0.423688 0.267952 0.528127C0.229025 0.632565 0.208984 0.744586 0.208984 0.857726C0.208984 0.970867 0.229025 1.08289 0.267952 1.18733C0.306879 1.29177 0.36392 1.38655 0.435786 1.46623L3.94749 5.3915C4.01936 5.47117 4.0764 5.56596 4.11532 5.6704C4.15425 5.77484 4.17429 5.88686 4.17429 6C4.17429 6.11314 4.15425 6.22516 4.11532 6.3296C4.0764 6.43404 4.01936 6.52883 3.94749 6.6085L0.435787 10.5338C0.363921 10.6134 0.306879 10.7082 0.267952 10.8127C0.229026 10.9171 0.208984 11.0291 0.208984 11.1423C0.208984 11.2554 0.229026 11.3674 0.267952 11.4719C0.306879 11.5763 0.363921 11.6711 0.435787 11.7508C0.579447 11.9104 0.77378 12 0.976344 12C1.17891 12 1.37324 11.9104 1.5169 11.7508L5.03627 7.81694C5.46703 7.33485 5.70898 6.68135 5.70898 6C5.70898 5.31865 5.46703 4.66515 5.03627 4.18306L1.5169 0.249225C1.37324 0.0895996 1.17891 9.11278e-07 0.976343 9.20132e-07C0.77378 9.28986e-07 0.579446 0.0895996 0.435786 0.249225Z"
        fill={fill}
      />
    </svg>
  );
};
