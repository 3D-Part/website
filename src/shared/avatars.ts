import { useAppSelector } from "@/redux/hooks";
import { settingsDataSelector } from "@/redux/slices/settings/settingsSelector";

// The avatars a customer can pick for the profile. The admin keeps the list
// (settings `customerAvatars`): the shop's ten (public/assets/avatars/NN.svg)
// and the admin's uploads (in the image bucket). The profile keeps the
// avatar's id ("avatar:...") in `image`.
// The ten files are cached for a year (next.config.js). When one is changed,
// raise AVATARS_VERSION so every browser fetches the new picture.
export const AVATARS_VERSION = "1";

export type CustomerAvatar = {
  id: string;
  name: string;
  // key of the uploaded picture; "" for one of the shop's ten
  image: string;
  // stays with whoever has it, but is not offered
  hidden?: boolean;
};

export const DEFAULT_AVATARS: CustomerAvatar[] = [
  ["01", "Astronaut"],
  ["02", "Nindža"],
  ["03", "Čarobnjak"],
  ["04", "Viking"],
  ["05", "Pirat"],
  ["06", "Mačak"],
  ["07", "Lisica"],
  ["08", "Vanzemaljac"],
  ["09", "Vitez"],
  ["10", "Robot"],
].map(([n, name]) => ({ id: `avatar:${n}`, name, image: "" }));

const NO_AVATAR = "/assets/img/logo.svg";

/** The avatars of the shop's settings (the shop's ten until they are loaded). */
export const useAvatars = (): CustomerAvatar[] => {
  const settings = useAppSelector(settingsDataSelector)?.settings as
    | { customerAvatars?: CustomerAvatar[] }
    | undefined;
  return Array.isArray(settings?.customerAvatars) ? settings!.customerAvatars : DEFAULT_AVATARS;
};

export const avatarPicture = (avatar: CustomerAvatar) =>
  avatar.image
    ? `${process.env.NEXT_PUBLIC_AMAZON_IMAGES}/${avatar.image}`
    : `/assets/avatars/${avatar.id.slice(7)}.svg?v=${AVATARS_VERSION}`;

/**
 * The picture to show for what the profile keeps in `image`: the avatar, or
 * the default when there is none or the admin removed it.
 */
export const avatarSrc = (image: string | null | undefined, avatars: CustomerAvatar[] = DEFAULT_AVATARS) => {
  if (image && image.startsWith("avatar:")) {
    const avatar = avatars.find((item) => item.id === image);
    return avatar ? avatarPicture(avatar) : NO_AVATAR;
  }
  return image || NO_AVATAR;
};
