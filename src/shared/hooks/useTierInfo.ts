import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { userService } from "@/shared/services/userService";
import { TierInfo } from "@/shared/tiers";

// the header has two profile icons and the pages ask too: one request for all
let inflight: Promise<TierInfo | null> | null = null;
let loadedAt = 0;
const FRESH_MS = 60_000;

const load = () => {
  if (!inflight || Date.now() - loadedAt > FRESH_MS) {
    loadedAt = Date.now();
    inflight = userService
      .fetchUserProfile()
      .then((data) => data?.tierInfo ?? null)
      .catch(() => null);
  }
  return inflight;
};

/** The tier of the logged in customer, null while loading or when logged out. */
export const useTierInfo = () => {
  const { status } = useSession();
  const [info, setInfo] = useState<TierInfo | null>(null);

  useEffect(() => {
    if (status !== "authenticated") {
      setInfo(null);
      return;
    }
    let active = true;
    load().then((value) => active && setInfo(value));
    return () => {
      active = false;
    };
  }, [status]);

  return info;
};
