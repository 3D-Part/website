// The ready-made avatars a customer can pick for the profile (public/assets/avatars).
// The profile keeps "avatar:NN"; the picture is the file with that number.
// The files are cached for a year (next.config.js). When one is changed, raise
// AVATARS_VERSION so every browser fetches the new picture.
export const AVATARS_VERSION = "1";

export const AVATARS = [
  { id: "avatar:01", name: "Astronaut" },
  { id: "avatar:02", name: "Nindža" },
  { id: "avatar:03", name: "Čarobnjak" },
  { id: "avatar:04", name: "Viking" },
  { id: "avatar:05", name: "Pirat" },
  { id: "avatar:06", name: "Mačak" },
  { id: "avatar:07", name: "Lisica" },
  { id: "avatar:08", name: "Vanzemaljac" },
  { id: "avatar:09", name: "Vitez" },
  { id: "avatar:10", name: "Robot" },
];

/** The picture to show for what the profile keeps in `image`. */
export const avatarSrc = (image?: string | null) => {
  if (image && /^avatar:[0-9]{2}$/.test(image)) {
    return `/assets/avatars/${image.slice(7)}.svg?v=${AVATARS_VERSION}`;
  }
  return image || "/assets/img/logo.svg";
};
