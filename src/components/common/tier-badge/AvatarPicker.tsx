"use client";
import React, { useState } from "react";
import { AVATARS, avatarSrc } from "@/shared/avatars";

type Props = {
  // what the profile keeps in `image`: "avatar:NN", an old address, or empty
  value: string;
  onPick: (image: string | null) => Promise<void> | void;
};

/** "Promijeni sliku": the ready-made avatars to pick from, one tap each. */
const AvatarPicker: React.FC<Props> = ({ value, onPick }) => {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const pick = async (image: string | null) => {
    setBusy(true);
    try {
      await onPick(image);
      setOpen(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 lg:items-start">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="text-sm text-primary-400 hover:underline"
      >
        {open ? "Zatvori" : "Promijeni sliku"}
      </button>

      {open && (
        <div className="p-4 border rounded-xl border-neutral-700 bg-neutral-800">
          <div className="grid grid-cols-5 gap-3">
            {AVATARS.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                disabled={busy}
                title={avatar.name}
                aria-label={avatar.name}
                onClick={() => pick(avatar.id)}
                className={`rounded-full transition-transform hover:scale-105 disabled:opacity-60 ${
                  value === avatar.id ? "ring-2 ring-primary-400" : "ring-1 ring-neutral-600"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarSrc(avatar.id)}
                  alt={avatar.name}
                  width={56}
                  height={56}
                  loading="lazy"
                  className="w-14 h-14 rounded-full"
                />
              </button>
            ))}
          </div>
          {value && (
            <button
              type="button"
              disabled={busy}
              onClick={() => pick(null)}
              className="mt-3 text-sm text-neutral-400 hover:underline"
            >
              Ukloni sliku
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarPicker;
