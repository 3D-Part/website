"use client";

import { useEffect } from "react";
import useSettingsApi from "@/redux/api/useSettingsApi";

const TidioChat = () => {
  const { settings } = useSettingsApi();
  const key: string = (settings?.settings as any)?.tidio?.key || "";

  useEffect(() => {
    if (!/^[a-z0-9]+$/i.test(key)) return;

    const id = "tidio-chat-script";
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = `https://code.tidio.co/${key}.js`;
    document.body.appendChild(script);
  }, [key]);

  return null;
};

export default TidioChat;
