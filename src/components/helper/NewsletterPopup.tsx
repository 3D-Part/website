"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { cartModalVisibleSelector } from "@/redux/slices/cart/cartSelectors";
import { newsletterService } from "@/shared/services/newsletterService";
import {
  NEWSLETTER_POPUP_DELAY_MS,
  NEWSLETTER_POPUP_SCROLL,
  markNewsletterDismissed,
  markNewsletterSubscribed,
  newsletterPopupAllowed,
  newsletterPopupSince,
} from "@/shared/helper/newsletterPopup";

// pages where a popup would be in the way of buying or of the account
const HIDDEN_ON = ["/shop/checkout", "/login", "/profile-details", "/reset-password", "/verify"];
const isHiddenOn = (pathname: string | null) =>
  !!pathname && HIDDEN_ON.some((path) => pathname === path || pathname.startsWith(path + "/"));

const ASSISTANT_STATUS = process.env.NEXT_PUBLIC_BACKEND_URL + "shop/assistant/status";

/**
 * A small newsletter sign-up: a card in the bottom right corner on a desktop,
 * a slim card along the bottom on a phone. It comes after 20 seconds on the
 * site or once 40% of a page is scrolled, whichever is first, never on the
 * checkout, the cart or the account pages. Closed, it stays away for 30 days;
 * after a sign-up (here or in the footer) it never comes back. The address
 * goes to the same endpoint as the footer's form, and so to Zoho Campaigns.
 */
const NewsletterPopup = () => {
  const pathname = usePathname();
  const cartOpen = useAppSelector(cartModalVisibleSelector);
  // allowed for this visitor (not closed lately, not signed up)
  const [allowed, setAllowed] = useState(false);
  // the time or the scroll has come
  const [due, setDue] = useState(false);
  const [closed, setClosed] = useState(false);
  // the chat assistant's button sits in the same corner: the popup goes above it
  const [assistant, setAssistant] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    setAllowed(newsletterPopupAllowed());
  }, []);

  const hiddenHere = isHiddenOn(pathname);

  // 20 seconds on the site, counted from the first page of the visit
  useEffect(() => {
    if (!allowed || due) return;
    const wait = Math.max(0, newsletterPopupSince() + NEWSLETTER_POPUP_DELAY_MS - Date.now());
    const timer = setTimeout(() => setDue(true), wait);
    return () => clearTimeout(timer);
  }, [allowed, due]);

  // or 40% of a page scrolled
  useEffect(() => {
    if (!allowed || due || hiddenHere) return;
    const onScroll = () => {
      const room = document.documentElement.scrollHeight - window.innerHeight;
      if (room > 0 && window.scrollY / room >= NEWSLETTER_POPUP_SCROLL) setDue(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [allowed, due, hiddenHere]);

  useEffect(() => {
    if (!allowed) return;
    fetch(ASSISTANT_STATUS, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setAssistant(!!data?.enabled))
      .catch(() => setAssistant(false));
  }, [allowed]);

  const close = () => {
    if (state !== "done") markNewsletterDismissed();
    setClosed(true);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      await newsletterService.subscribeToNewsletter(email.trim());
      markNewsletterSubscribed();
      setState("done");
      setTimeout(() => setClosed(true), 4000);
    } catch {
      setState("error");
    }
  };

  if (!allowed || !due || closed || hiddenHere || cartOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Prijava na newsletter"
      className={`fixed z-40 left-3 right-3 sm:left-auto sm:right-5 sm:w-[360px] ${
        assistant ? "bottom-[84px]" : "bottom-3 sm:bottom-5"
      } overflow-hidden rounded-2xl border border-white/10 bg-[#0f1220]/95 backdrop-blur-[14px] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)] animate-[newsletterIn_.35s_ease-out]`}
    >
      {/* the blue glow and line of the site's buttons */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary-500 via-[#7c5cff] to-primary-400" />
      <div aria-hidden className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-primary-500/25 blur-3xl" />

      <button
        type="button"
        onClick={close}
        aria-label="Zatvori"
        className="absolute z-10 flex items-center justify-center w-8 h-8 rounded-full top-2.5 right-2.5 text-neutral-400 hover:text-white hover:bg-white/10"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <div className="relative p-4 sm:p-5">
        {state === "done" ? (
          <div className="flex items-center gap-3 pr-8">
            <span className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-success-500/20 text-success-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="text-sm font-semibold text-white sm:text-base">
              Hvala! Prijavljeni ste, javljamo vam prvi za akcije i novitete.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-3 pr-8">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 bg-gradient-to-br from-primary-500 to-[#7c5cff] text-white shadow-lg shadow-primary-500/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-bold leading-snug text-white sm:text-base">
                  Budite prvi koji saznaju za akcije i novitete
                </p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                  Popusti i novi artikli stižu vam prvi na mejl. Bez spama, odjava jednim klikom.
                </p>
              </div>
            </div>
            <form onSubmit={submit} className="flex flex-col gap-2 mt-3.5 sm:flex-row sm:mt-4">
              <input
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (state === "error") setState("idle");
                }}
                placeholder="Vaš e-mail"
                aria-label="E-mail"
                className="w-full sm:flex-1 min-w-0 h-11 shrink-0 px-3.5 text-sm text-white border rounded-xl bg-white/5 border-white/15 placeholder:text-neutral-500 focus:outline-none focus:ring-0 focus:border-primary-500"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="h-11 px-5 text-sm font-semibold text-white rounded-xl shrink-0 bg-primary-500 hover:bg-primary-600 disabled:opacity-60 shadow-lg shadow-primary-500/25"
              >
                {state === "sending" ? "Šaljem..." : "Prijavi se"}
              </button>
            </form>
            {state === "error" && (
              <p className="mt-2 text-xs text-error-400">Prijava nije uspjela. Provjerite adresu i pokušajte ponovo.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup;
