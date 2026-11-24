import { useAppDispatch } from "@/redux/hooks";
import { changeIsModalAuthVisible } from "@/redux/slices/ui/uiSlice";
import React, { useState } from "react";
import { useProfile } from "@/shared/hooks/useTierInfo";
import TierBadge from "@/components/common/tier-badge/TierBadge";
import { avatarSrc, useAvatars } from "@/shared/avatars";

/** First letters of the first and the last name, e.g. "MP". */
const initialsOf = (name?: string | null) =>
  (name ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .filter((_, i, parts) => i === 0 || i === parts.length - 1)
    .map((part) => part[0]!.toUpperCase())
    .join("");

/**
 * A logged in customer sees their avatar here (or their initials when they
 * have none); everyone else the plain icon.
 */
const ProfilePicture: React.FC<{ image?: string | null; name?: string | null }> = ({ image, name }) => {
  const avatars = useAvatars();
  const [broken, setBroken] = useState<string | null>(null);
  const src = image ? avatarSrc(image, avatars) : null;
  // an avatar the admin removed falls back to the logo: initials look better
  const usable = src && !src.endsWith("/logo.svg") && broken !== src;
  const initials = initialsOf(name);

  if (usable) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name || "Profil"}
        onError={() => setBroken(src)}
        className="shrink-0 max-w-none w-9 h-9 rounded-full object-cover bg-neutral-800 ring-2 ring-[#387BE8]"
      />
    );
  }
  if (initials) {
    return (
      <span
        aria-label={name || "Profil"}
        className="flex shrink-0 items-center justify-center w-9 h-9 rounded-full bg-[#2463EB] text-white text-sm font-bold font-exo2 ring-2 ring-[#387BE8]/40"
      >
        {initials}
      </span>
    );
  }
  return <ProfileSvg />;
};

const ProfileIcon = () => {
  const isLogged = false;
  const profile = useProfile();
  const tier = profile?.tierInfo ?? null;

  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (isLogged) {
    } else {
      dispatch(changeIsModalAuthVisible(true));
    }
  };

  return (
    <div className="relative shrink-0 cursor-pointer" onClick={handleClick}>
      {profile ? <ProfilePicture image={profile.image} name={profile.fullName} /> : <ProfileSvg />}
      {tier?.name && (
        // subtle: just the tier's small picture on the corner of the icon
        <span className="absolute z-10 -top-1 -right-2">
          <TierBadge name={tier.name} color={tier.color} badge={tier.badge} discount={tier.discount} compact />
        </span>
      )}
    </div>
  );
};

const ProfileSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
    >
      <g clipPath="url(#clip0_1088_3176)">
        <path
          d="M18 18C19.1867 18 20.3467 17.6481 21.3334 16.9888C22.3201 16.3295 23.0892 15.3925 23.5433 14.2961C23.9974 13.1997 24.1162 11.9933 23.8847 10.8295C23.6532 9.66558 23.0818 8.59648 22.2426 7.75736C21.4035 6.91825 20.3344 6.3468 19.1705 6.11529C18.0067 5.88378 16.8003 6.0026 15.7039 6.45673C14.6075 6.91085 13.6705 7.67989 13.0112 8.66658C12.3519 9.65328 12 10.8133 12 12C12.0016 13.5908 12.6342 15.116 13.7591 16.2409C14.884 17.3658 16.4092 17.9984 18 18ZM18 8C18.7911 8 19.5645 8.2346 20.2223 8.67412C20.8801 9.11365 21.3928 9.73836 21.6955 10.4693C21.9983 11.2002 22.0775 12.0044 21.9231 12.7804C21.7688 13.5563 21.3878 14.269 20.8284 14.8284C20.269 15.3878 19.5563 15.7688 18.7804 15.9231C18.0044 16.0775 17.2002 15.9983 16.4693 15.6955C15.7384 15.3928 15.1136 14.8801 14.6741 14.2223C14.2346 13.5645 14 12.7911 14 12C14 10.9391 14.4214 9.92172 15.1716 9.17158C15.9217 8.42143 16.9391 8 18 8Z"
          fill="white"
        />
        <path
          d="M18 20C15.6139 20.0026 13.3262 20.9517 11.639 22.639C9.95171 24.3262 9.00265 26.6139 9 29C9 29.2652 9.10536 29.5196 9.29289 29.7071C9.48043 29.8946 9.73478 30 10 30C10.2652 30 10.5196 29.8946 10.7071 29.7071C10.8946 29.5196 11 29.2652 11 29C11 27.1435 11.7375 25.363 13.0503 24.0503C14.363 22.7375 16.1435 22 18 22C19.8565 22 21.637 22.7375 22.9497 24.0503C24.2625 25.363 25 27.1435 25 29C25 29.2652 25.1054 29.5196 25.2929 29.7071C25.4804 29.8946 25.7348 30 26 30C26.2652 30 26.5196 29.8946 26.7071 29.7071C26.8946 29.5196 27 29.2652 27 29C26.9974 26.6139 26.0483 24.3262 24.361 22.639C22.6738 20.9517 20.3861 20.0026 18 20Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1088_3176">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(6 6)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ProfileIcon;
