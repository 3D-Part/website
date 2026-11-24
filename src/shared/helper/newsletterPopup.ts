import { LocalStorageHelper } from "./LocalStorageHelper";

// The newsletter popup: when it may come, and what the visitor did with it.
// Browser storage only (it can be missing or blocked: then the popup simply
// comes after the delay again).

const KEY = "newsletterPopup";
const SINCE_KEY = "newsletterPopupSince";
const DAY = 24 * 60 * 60 * 1000;

export const NEWSLETTER_POPUP_DELAY_MS = 20 * 1000;
export const NEWSLETTER_POPUP_SCROLL = 0.4;
// closed, it stays away this long
export const NEWSLETTER_POPUP_PAUSE_MS = 30 * DAY;

type Stored = { subscribed?: boolean; dismissedAt?: number };

const read = (): Stored => {
  const value = LocalStorageHelper.getItem(KEY);
  return value && typeof value === "object" ? (value as Stored) : {};
};

/** Not signed up, and not closed in the last 30 days. */
export const newsletterPopupAllowed = (now = Date.now()) => {
  const stored = read();
  if (stored.subscribed) return false;
  return !(typeof stored.dismissedAt === "number" && now - stored.dismissedAt < NEWSLETTER_POPUP_PAUSE_MS);
};

export const markNewsletterDismissed = () => LocalStorageHelper.saveItem(KEY, { ...read(), dismissedAt: Date.now() });

/** After a sign-up, in the popup or in the footer: the popup never comes again. */
export const markNewsletterSubscribed = () => LocalStorageHelper.saveItem(KEY, { ...read(), subscribed: true });

/** When this visit started (the first page of the tab), for the 20 seconds. */
export const newsletterPopupSince = () => {
  try {
    const stored = Number(window.sessionStorage.getItem(SINCE_KEY));
    if (stored > 0) return stored;
    const now = Date.now();
    window.sessionStorage.setItem(SINCE_KEY, String(now));
    return now;
  } catch {
    return Date.now();
  }
};
