"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { changeIsContactModalVisible } from "@/redux/slices/ui/uiSlice";
import useSettingsApi from "@/redux/api/useSettingsApi";
import { imageToAmazonURl } from "@/shared/helper/imageToAmazonUrl";

// The ChatGPT shop assistant. It talks to our API, never to OpenAI directly,
// so the key stays on the server. It shows only when the admin switched it on
// and saved a key (Settings → Chat assistant).

const API = process.env.NEXT_PUBLIC_BACKEND_URL + "shop/assistant";
const STORAGE_KEY = "shopAssistantChat";
// what goes to the server with each question
const HISTORY = 8;

type ProductCard = {
  id: string;
  name: string;
  price: number;
  salePrice: number | null;
  inStock: boolean;
  imageId: string | null;
  url: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  products?: ProductCard[];
  contact?: boolean;
};

const GREETING =
  "Zdravo! Ja sam 3DPart asistent. Pitajte me o filamentima, smolama, printerima i dijelovima, pomoći ću vam da nađete pravi proizvod.";

const SUGGESTIONS = [
  "Koji filament je najbolji za početnike?",
  "Tražim crni PETG",
  "Imate li mlaznicu 0.4?",
  "Želim kontaktirati podršku",
];

const money = (value: number) => `${value.toFixed(2).replace(".", ",")} KM`;

const ProductMini: React.FC<{ card: ProductCard }> = ({ card }) => (
  <Link
    href={card.url}
    className="flex items-center gap-3 p-2 transition-colors border rounded-xl border-neutral-700 bg-neutral-900 hover:border-primary-400"
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={card.imageId ? imageToAmazonURl(card.imageId) : "/assets/img/no-image.svg"}
      alt=""
      className="object-contain w-12 h-12 rounded-lg shrink-0 bg-neutral-800"
    />
    <span className="min-w-0">
      <span className="block text-sm font-semibold text-white truncate">{card.name}</span>
      <span className="text-xs text-neutral-400">
        {card.salePrice !== null ? (
          <>
            <span className="text-primary-400">{money(card.salePrice)}</span>{" "}
            <span className="line-through">{money(card.price)}</span>
          </>
        ) : (
          money(card.price)
        )}
        {" · "}
        <span className={card.inStock ? "text-green-200" : "text-neutral-500"}>
          {card.inStock ? "na stanju" : "nema na stanju"}
        </span>
      </span>
    </span>
  </Link>
);

const ShopAssistant = () => {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { settings } = useSettingsApi();
  const company = (settings?.settings as any)?.company || {};

  // on only when the admin has switched it on and saved a key
  useEffect(() => {
    fetch(`${API}/status`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setEnabled(!!data?.enabled))
      .catch(() => setEnabled(false));
  }, []);

  // the conversation lasts as long as the tab
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setMessages(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {}
  }, [messages]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, open]);

  const ask = async (question: string) => {
    const content = question.trim();
    if (!content || busy) return;
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setText("");
    setBusy(true);
    try {
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: next.slice(-HISTORY).map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!res.ok) throw new Error("chat");
      const data = await res.json();
      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply, products: data.products || [], contact: !!data.contact },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "Asistent trenutno nije dostupan. Javite se našoj podršci, rado će vam pomoći.", contact: true },
      ]);
    }
    setBusy(false);
  };

  if (!enabled) return null;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Otvori chat asistenta"
          className="fixed z-[60] flex items-center gap-2 px-4 py-3 font-semibold text-white rounded-full shadow-lg bottom-5 right-5 bg-primary-500 hover:bg-primary-600"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline">Pitajte asistenta</span>
        </button>
      )}

      {open && (
        <div className="fixed z-[60] inset-0 sm:inset-auto sm:bottom-5 sm:right-5 sm:w-[380px] sm:h-[560px] flex flex-col bg-neutral-900 sm:rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700 bg-neutral-800">
            <div>
              <p className="font-bold text-white">3DPart asistent</p>
              <p className="text-xs text-neutral-400">Pomoć oko 3D štampe i naših proizvoda</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Zatvori chat"
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-700"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div ref={listRef} className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="max-w-[85%] px-3 py-2 text-sm rounded-2xl rounded-tl-sm bg-neutral-800 text-neutral-100">{GREETING}</div>

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => ask(suggestion)}
                    className="px-3 py-1.5 text-xs rounded-full border border-neutral-600 text-neutral-200 hover:border-primary-400"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {messages.map((message, i) =>
              message.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] px-3 py-2 text-sm text-white rounded-2xl rounded-tr-sm bg-primary-600 whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="space-y-2">
                  <div className="max-w-[85%] px-3 py-2 text-sm rounded-2xl rounded-tl-sm bg-neutral-800 text-neutral-100 whitespace-pre-wrap">
                    {message.content}
                  </div>
                  {message.products && message.products.length > 0 && (
                    <div className="space-y-2">
                      {message.products.map((card) => (
                        <ProductMini key={card.id} card={card} />
                      ))}
                    </div>
                  )}
                  {message.contact && (
                    <div className="p-3 space-y-2 border rounded-xl border-primary-500/40 bg-primary-500/10">
                      <p className="text-xs text-neutral-300">
                        Naša podrška će vam pomoći
                        {company.phone ? <> · {company.phone}</> : null}
                        {company.emails?.[0] ? <> · {company.emails[0]}</> : null}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          // the contact form opens over the page; the conversation stays for later
                          setOpen(false);
                          dispatch(changeIsContactModalVisible(true));
                        }}
                        className="w-full py-2 text-sm font-semibold text-white rounded-lg bg-primary-500 hover:bg-primary-600"
                      >
                        Kontaktiraj podršku
                      </button>
                    </div>
                  )}
                </div>
              )
            )}

            {busy && (
              <div className="inline-flex gap-1 px-3 py-3 rounded-2xl bg-neutral-800" aria-label="Asistent piše">
                {[0, 150, 300].map((delay) => (
                  <span key={delay} className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            )}
          </div>

          <form
            className="flex gap-2 p-3 border-t border-neutral-700 bg-neutral-800"
            onSubmit={(e) => {
              e.preventDefault();
              ask(text);
            }}
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={600}
              placeholder="Napišite pitanje..."
              className="flex-1 h-10 px-3 text-sm text-white rounded-lg outline-none bg-neutral-900 border border-neutral-700 focus:border-primary-400"
              aria-label="Vaše pitanje"
            />
            <button
              type="submit"
              disabled={busy || !text.trim()}
              className="px-4 text-sm font-semibold text-white rounded-lg bg-primary-500 hover:bg-primary-600 disabled:opacity-50"
            >
              Pošalji
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ShopAssistant;
