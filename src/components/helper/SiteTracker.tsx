"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/shared/helper/track";

/** Counts every page opened, also when moving between pages without a reload. */
const SiteTracker = () => {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname) track({ kind: "page", path: pathname });
  }, [pathname]);
  return null;
};

export default SiteTracker;
