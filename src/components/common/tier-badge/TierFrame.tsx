import React from "react";
import { TierInfo, svgSrc } from "@/shared/tiers";

// light, middle and dark metal of each tier colour
const METAL: Record<string, [string, string, string]> = {
  amber: ["#f6d3a0", "#c8751f", "#5c3009"],
  slate: ["#f8fafc", "#94a3b8", "#3d4858"],
  yellow: ["#fff3a3", "#e0a800", "#6b4d00"],
  blue: ["#cfe3ff", "#3b82f6", "#16306e"],
  green: ["#c9f7d9", "#22c55e", "#0f4a27"],
  purple: ["#ecdcff", "#a855f7", "#4a1670"],
  red: ["#ffd5d5", "#ef4444", "#6b1414"],
  pink: ["#fcd5ea", "#ec4899", "#6d1240"],
};

const SIZE = 184;
const PHOTO = 150;

/** Winged ranked frame around the photo, in the metal of the tier. */
const Frame: React.FC<{ color: string }> = ({ color }) => {
  const [light, mid, dark] = METAL[color] ?? METAL.slate;
  const id = `frame-${color}`;
  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox="0 0 200 200"
      className="absolute inset-0 pointer-events-none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-r`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset=".45" stopColor={mid} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
      </defs>
      {/* a full metal ring: a dark edge outside, a bright line and a groove inside */}
      <circle cx="100" cy="100" r="93.500" fill="none" stroke={dark} strokeWidth="2" />
      <circle cx="100" cy="100" r="86" fill="none" stroke={`url(#${id}-r)`} strokeWidth="13" />
      {/* fine machined marks around the ring */}
      <circle
        cx="100"
        cy="100"
        r="86"
        fill="none"
        stroke={dark}
        strokeWidth="13"
        strokeDasharray="1.400 21.100"
        opacity=".35"
      />
      <circle cx="100" cy="100" r="91.500" fill="none" stroke={light} strokeWidth="1" opacity=".75" />
      <circle cx="100" cy="100" r="79.500" fill="none" stroke={dark} strokeWidth="2.500" />
      <circle cx="100" cy="100" r="77.500" fill="none" stroke={light} strokeWidth="0.8" opacity=".45" />
      {/* a small gem on top */}
      <path d="M100 2l8 9-8 11-8-11z" fill={`url(#${id}-r)`} stroke={dark} strokeWidth="1.300" strokeLinejoin="round" />
      <path d="M100 6l3.500 5-3.500 6-3.500-6z" fill={light} opacity=".85" />
    </svg>
  );
};

/**
 * The profile photo. A customer with a tier gets the frame of the tier's
 * colour and its badge as the emblem at the bottom, like a ranked border.
 */
const TierFrame: React.FC<{ photo: string; info: TierInfo | null }> = ({ photo, info }) => {
  const framed = !!info?.name;
  return (
    <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        width={PHOTO}
        height={PHOTO}
        alt="profile photo"
        src={photo}
        className={`absolute rounded-full object-contain bg-[#111] ${framed ? "" : "border border-white p-1"}`}
        style={{ width: PHOTO, height: PHOTO, left: (SIZE - PHOTO) / 2, top: (SIZE - PHOTO) / 2 }}
      />
      {framed && <Frame color={info?.color ?? "slate"} />}
      {framed && info?.badge && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={svgSrc(info.badge)}
          width={44}
          height={44}
          alt={info.name ?? ""}
          title={info.name ?? ""}
          className="absolute"
          style={{ width: 44, height: 44, left: SIZE / 2 - 22, bottom: -8 }}
        />
      )}
    </div>
  );
};

export default TierFrame;
