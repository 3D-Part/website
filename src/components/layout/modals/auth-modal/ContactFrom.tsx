"use client";
import React, { FC } from "react";
import { notify } from "@/components/common/toast/Toastify";
import { useAppDispatch } from "@/redux/hooks";
import { changeIsContactModalVisible, changeIsGlobalLoading } from "@/redux/slices/ui/uiSlice";
import contactService from "@/shared/services/contact";
import { IContactFormBody } from "@/shared/types";

const ContactFrom: FC = () => {
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        dispatch(changeIsGlobalLoading(true));

        const payload: IContactFormBody = {
            title: e.target.title.value,
            body: e.target.body.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            name: e.target.name.value, // backend expects name in validation example
        };

        try {
            // use contactService
            await contactService.contactUs(payload);

        } catch (error: any) {
            // Handeled error in contact service
        } finally {
            e.target.reset();
            dispatch(changeIsGlobalLoading(false));
            dispatch(changeIsContactModalVisible(false))
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex items-center p-1 bg-[#313131] rounded-xl px-3 py-2 gap-3">
                <UserIcon />
                <input
                    type="text"
                    placeholder="Ime i prezime"
                    className="bg-transparent text-[#cccccc] outline-none flex-1"
                    id="name"
                    autoComplete="off"
                />
            </div>

            <div className="flex items-center p-1 bg-[#313131] rounded-xl px-3 py-2 gap-3 mt-4">
                <EmailIcon />
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-transparent text-[#cccccc] outline-none flex-1"
                    id="email"
                    autoComplete="off"
                />
            </div>

            <div className="flex items-center p-1 bg-[#313131] rounded-xl px-3 py-2 gap-3 mt-4">
                <PhoneIcon />
                <input
                    type="text"
                    placeholder="Telefon"
                    className="bg-transparent text-[#cccccc] outline-none flex-1"
                    id="phone"
                    autoComplete="off"
                />
            </div>

            <div className="mt-4">
                <label className="sr-only" htmlFor="title">Naslov</label>
                <div className="flex items-center p-1 bg-[#313131] rounded-xl px-3 py-2 gap-3">
                    <input
                        type="text"
                        placeholder="Naslov poruke"
                        className="bg-transparent text-[#cccccc] outline-none flex-1"
                        id="title"
                        autoComplete="off"
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="sr-only" htmlFor="body">Poruka</label>
                <textarea
                    id="body"
                    placeholder="Vaša poruka"
                    className="w-full p-3 bg-[#313131] text-[#cccccc] rounded-xl outline-none resize-none h-28 mt-2"
                />
            </div>

            <button
                type="submit"
                className="w-full h-12 text-base font-bold bg-[#2463EB] font-exo2 rounded-lg mt-8"
            >
                Pošaljite upit
            </button>
        </form>


    );
};

/* --- icons copied/styled similarly to SignUpForm.tsx --- */
const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12.6667 0.503296H3.33333C2.4496 0.504354 1.60237 0.855884 0.97748 1.48078C0.352588 2.10567 0.00105857 2.9529 0 3.83663L0 11.8366C0.00105857 12.7204 0.352588 13.5676 0.97748 14.1925C1.60237 14.8174 2.4496 15.1689 3.33333 15.17H12.6667C13.5504 15.1689 14.3976 14.8174 15.0225 14.1925C15.6474 13.5676 15.9989 12.7204 16 11.8366V3.83663C15.9989 2.9529 15.6474 2.10567 15.0225 1.48078C14.3976 0.855884 13.5504 0.504354 12.6667 0.503296ZM3.33333 1.83663H12.6667C13.0659 1.83741 13.4557 1.95764 13.786 2.18183C14.1163 2.40602 14.3719 2.72393 14.52 3.09463L9.41467 8.20063C9.03895 8.57484 8.53028 8.78494 8 8.78494C7.46972 8.78494 6.96105 8.57484 6.58533 8.20063L1.48 3.09463C1.6281 2.72393 1.88374 2.40602 2.21403 2.18183C2.54432 1.95764 2.93414 1.83741 3.33333 1.83663ZM12.6667 13.8366H3.33333C2.8029 13.8366 2.29419 13.6259 1.91912 13.2508C1.54405 12.8758 1.33333 12.3671 1.33333 11.8366V4.83663L5.64267 9.1433C6.26842 9.76747 7.11617 10.118 8 10.118C8.88383 10.118 9.73158 9.76747 10.3573 9.1433L14.6667 4.83663V11.8366C14.6667 12.3671 14.456 12.8758 14.0809 13.2508C13.7058 13.6259 13.1971 13.8366 12.6667 13.8366Z" fill="#3B82F6" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10.0934 0.000500005C10.0749 -0.000166668 5.92513 -0.000166668 5.90657 0.000500005C4.02557 0.0165002 2.5 1.50585 2.5 3.3332V12.6666C2.5 14.5047 4.04207 16 5.93751 16H10.0625C11.9579 16 13.5 14.5047 13.5 12.6666V3.33387C13.5 1.50585 11.9744 0.0171669 10.0934 0.000500005ZM12.125 12.6666C12.125 13.7693 11.1996 14.6667 10.0625 14.6667H5.93751C4.80038 14.6667 3.875 13.7693 3.875 12.6666V3.33387C3.875 2.36519 4.58863 1.55585 5.53257 1.37252L6.0097 2.29852C6.12588 2.52453 6.36445 2.66719 6.62501 2.66719H9.37499C9.63556 2.66719 9.87343 2.52453 9.99031 2.29852L10.4674 1.37252C11.4114 1.55518 12.125 2.36519 12.125 3.33387V12.6666ZM8.68751 13.3333H7.31251C6.93301 13.3333 6.62501 13.0346 6.62501 12.6666C6.62501 12.2986 6.93301 12 7.31251 12H8.68751C9.06701 12 9.37499 12.2986 9.37499 12.6666C9.37499 13.0346 9.06701 13.3333 8.68751 13.3333Z" fill="#3B82F6" />
    </svg>
);

const UserIcon: FC<{ scale?: number; fill?: string }> = ({ scale = 1, fill = "#387BE8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={16 * scale} height={17 * scale} viewBox="0 0 16 17" fill="none">
        <g clipPath="url(#clip0_1106_5489)">
            <path d="M8 8.6731C8.79113 8.6731 9.56448 8.4385 10.2223 7.99898C10.8801 7.55945 11.3928 6.93474 11.6955 6.20383C11.9983 5.47293 12.0775 4.66866 11.9231 3.89274C11.7688 3.11681 11.3878 2.40408 10.8284 1.84467C10.269 1.28526 9.55629 0.904297 8.78036 0.749956C8.00444 0.595615 7.20017 0.674829 6.46927 0.977579C5.73836 1.28033 5.11365 1.79302 4.67412 2.45082C4.2346 3.10861 4 3.88197 4 4.6731C4.00106 5.73364 4.42283 6.75044 5.17274 7.50036C5.92266 8.25027 6.93946 8.67204 8 8.6731Z" fill={fill} />
            <path d="M8 10.0065C6.40924 10.0082 4.88414 10.6409 3.75931 11.7658C2.63447 12.8906 2.00176 14.4157 2 16.0065C2 16.1833 2.07024 16.3529 2.19526 16.4779C2.32029 16.6029 2.48986 16.6731 2.66667 16.6731C2.84348 16.6731 3.01305 16.6029 3.13807 16.4779C3.2631 16.3529 3.33333 16.1833 3.33333 16.0065C3.33333 14.7688 3.825 13.5818 4.70017 12.7066C5.57534 11.8315 6.76232 11.3398 8 11.3398C9.23768 11.3398 10.4247 11.8315 11.2998 12.7066C12.175 13.5818 12.6667 14.7688 12.6667 16.0065C12.6667 16.1833 12.7369 16.3529 12.8619 16.4779C12.987 16.6029 13.1565 16.6731 13.3333 16.6731C13.5101 16.6731 13.6797 16.6029 13.8047 16.4779C13.9298 16.3529 14 16.1833 14 16.0065C13.9982 14.4157 13.3655 12.8906 12.2407 11.7658C11.1159 10.6409 9.59076 10.0082 8 10.0065Z" fill={fill} />
        </g>
        <defs>
            <clipPath id="clip0_1106_5489"><rect width="16" height="16" fill="white" transform="translate(0 0.673096)" /></clipPath>
        </defs>
    </svg>
);

export default ContactFrom;