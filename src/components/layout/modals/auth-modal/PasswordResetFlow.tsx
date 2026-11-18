"use client";
import { notify } from "@/components/common/toast/Toastify";
import { EmailIcon } from "@/components/layout/modals/auth-modal/LoginForm";
import { EyeIcon, LockIcon } from "@/components/layout/modals/auth-modal/SignUpForm";
import AuthAPI from "@/shared/services/auth";
import React, { FC, useEffect, useState } from "react";

const RESEND_SECONDS = 60;

type Props = {
  // known e-mail, e.g. of the logged in customer: it is not typed again
  email?: string;
  // what the customer sees when the password is changed
  onDone: () => void;
  // "back": to the login, when this is inside the login window
  onBack?: () => void;
};

const field =
  "flex items-center p-1 bg-[#313131] rounded-xl px-3 py-2 gap-3";
const primary =
  "w-full h-12 text-base font-bold bg-[#2463EB] font-exo2 rounded-lg disabled:opacity-60";

/** What the API said, in words for the customer. */
const messageOf = (error: any, fallback: string) => {
  const data = error?.response?.data;
  if (data?.key === "VALIDATION_ERROR") {
    const field = data.errors?.[0]?.field;
    if (field === "password") return "Lozinka mora imati najmanje 8 karaktera.";
    if (field === "code") return "Kod ima 6 cifara.";
    if (field === "email") return "Unesite ispravnu email adresu.";
  }
  if (data?.key === "BAD_REQUEST_ERROR") return "Kod nije ispravan ili je istekao.";
  return fallback;
};

/**
 * Changing a password without leaving the page: the e-mail is asked for, a
 * 6 digit code is sent to it, and the code is typed here together with the
 * new password. Used in the login window and in the profile settings.
 */
const PasswordResetFlow: FC<Props> = ({ email: knownEmail, onDone, onBack }) => {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState(knownEmail ?? "");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(0);

  useEffect(() => {
    if (knownEmail) setEmail(knownEmail);
  }, [knownEmail]);

  // the seconds until a new code can be asked for
  useEffect(() => {
    if (wait <= 0) return;
    const timer = setTimeout(() => setWait((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [wait]);

  const sendCode = async () => {
    setBusy(true);
    try {
      await AuthAPI.requestResetPassword({ email: email.trim() });
      setStep("code");
      setWait(RESEND_SECONDS);
      notify("Kod je poslat na vaš email", { type: "success" });
    } catch (error) {
      notify(messageOf(error, "Kod nije moguće poslati. Pokušajte ponovo."), { type: "error" });
    }
    setBusy(false);
  };

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeat) {
      notify("Lozinke se ne poklapaju", { type: "error" });
      return;
    }
    setBusy(true);
    try {
      await AuthAPI.resetPassword({ email: email.trim(), code: code.trim(), password });
      notify("Lozinka je promijenjena", { type: "success" });
      onDone();
    } catch (error) {
      notify(messageOf(error, "Lozinku nije moguće promijeniti. Pokušajte ponovo."), { type: "error" });
    }
    setBusy(false);
  };

  if (step === "email") {
    return (
      <form
        className="flex flex-col w-full gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          sendCode();
        }}
      >
        <p className="text-sm text-neutral-300">
          {knownEmail
            ? "Poslaćemo vam kod na vaš email, a sa njim ćete odmah postaviti novu lozinku."
            : "Unesite vašu email adresu. Poslaćemo vam kod kojim ćete postaviti novu lozinku."}
        </p>
        <div className={field}>
          <EmailIcon />
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            readOnly={!!knownEmail}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent text-[#cccccc] outline-none flex-1 read-only:text-neutral-400"
            autoFocus={!knownEmail}
          />
        </div>
        <button type="submit" disabled={busy || !email.trim()} className={primary}>
          Pošalji kod
        </button>
        {onBack && (
          <button type="button" onClick={onBack} className="text-sm text-neutral-400 hover:text-white">
            Nazad na prijavu
          </button>
        )}
      </form>
    );
  }

  return (
    <form className="flex flex-col w-full gap-4" onSubmit={submitCode}>
      <p className="text-sm text-neutral-300">
        Unesite kod od 6 cifara koji smo poslali na <span className="font-semibold text-white">{email}</span> i izaberite novu lozinku.
      </p>
      <div>
        <label htmlFor="reset-code" className="block mb-2 text-sm text-neutral-300">
          Kod iz emaila
        </label>
        {/* six boxes for the six digits; one invisible input on top takes the typing and the paste */}
        <div className="relative">
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className={`flex items-center justify-center h-14 text-2xl font-bold text-white rounded-xl bg-[#313131] ${
                  i === code.length ? "ring-2 ring-[#3B82F6]" : ""
                }`}
              >
                {code[i] ?? ""}
              </div>
            ))}
          </div>
          <input
            id="reset-code"
            required
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-text"
            autoFocus
          />
        </div>
      </div>
      <div className={field}>
        <LockIcon />
        <input
          required
          minLength={8}
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Nova lozinka (najmanje 8 karaktera)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent text-[#cccccc] outline-none flex-1"
        />
        <button type="button" onClick={() => setShowPassword((shown) => !shown)} aria-label="Prikaži lozinku">
          <EyeIcon fill={showPassword ? "#3B82F6" : "#999999"} />
        </button>
      </div>
      <div className={field}>
        <LockIcon />
        <input
          required
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Ponovite lozinku"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
          className="bg-transparent text-[#cccccc] outline-none flex-1"
        />
      </div>
      <button type="submit" disabled={busy || code.length !== 6 || password.length < 8} className={primary}>
        Promijeni lozinku
      </button>
      <div className="flex items-center justify-between text-sm text-neutral-400">
        <button type="button" disabled={wait > 0 || busy} onClick={sendCode} className="hover:text-white disabled:opacity-60 disabled:hover:text-neutral-400">
          {wait > 0 ? `Pošalji kod ponovo (${wait}s)` : "Pošalji kod ponovo"}
        </button>
        {!knownEmail && (
          <button type="button" onClick={() => setStep("email")} className="hover:text-white">
            Promijeni email
          </button>
        )}
      </div>
      {onBack && (
        <button type="button" onClick={onBack} className="text-sm text-neutral-400 hover:text-white">
          Nazad na prijavu
        </button>
      )}
    </form>
  );
};

export default PasswordResetFlow;
