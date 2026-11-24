import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserType, userService } from "@/shared/services/userService";
import { TierInfo } from "@/shared/tiers";

// the header has two profile icons and the pages ask too: one request for all
let inflight: Promise<UserType | null> | null = null;
let loadedAt = 0;
const FRESH_MS = 60_000;
const listeners = new Set<(profile: UserType | null) => void>();

const load = () => {
  if (!inflight || Date.now() - loadedAt > FRESH_MS) {
    loadedAt = Date.now();
    inflight = userService
      .fetchUserProfile()
      .then((data) => data ?? null)
      .catch(() => null);
  }
  return inflight;
};

/**
 * Asks for the profile again, e.g. after the customer picked another avatar,
 * so the header shows it at once.
 */
export const refreshProfile = () => {
  loadedAt = 0;
  load().then((profile) => listeners.forEach((listener) => listener(profile)));
};

/** The logged in customer's profile, null while loading or when logged out. */
export const useProfile = () => {
  const { status } = useSession();
  const [profile, setProfile] = useState<UserType | null>(null);

  useEffect(() => {
    if (status !== "authenticated") {
      setProfile(null);
      return;
    }
    let active = true;
    listeners.add(setProfile);
    load().then((value) => active && setProfile(value));
    return () => {
      active = false;
      listeners.delete(setProfile);
    };
  }, [status]);

  return profile;
};

/** The tier of the logged in customer, null while loading or when logged out. */
export const useTierInfo = (): TierInfo | null => useProfile()?.tierInfo ?? null;
