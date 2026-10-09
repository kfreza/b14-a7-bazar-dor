"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient, authErrorMessage, withAuthFlag } from "@/lib/auth-client";

type Provider = "google" | "github";

const PROVIDERS: { id: Provider; label: string; icon: string }[] = [
  { id: "google", label: "Google দিয়ে চালিয়ে যান", icon: "/images/icon-google.svg" },
  { id: "github", label: "GitHub দিয়ে চালিয়ে যান", icon: "/images/icon-github.svg" },
];

export default function SocialButtons({ redirectTo = "/" }: { redirectTo?: string }) {
  const [pending, setPending] = useState<Provider | null>(null);

  async function handleClick(provider: Provider) {
    setPending(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: withAuthFlag(redirectTo, "welcome"),
      errorCallbackURL: withAuthFlag("/signin", "social-error"),
    });
    if (error) {
      toast.error(authErrorMessage(error));
      setPending(null);
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      {PROVIDERS.map(({ id, label, icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => handleClick(id)}
          disabled={pending !== null}
          className="btn flex-1 gap-1.5 border-base-300 bg-base-100 px-2 text-sm font-semibold whitespace-nowrap shadow-none"
        >
          {pending === id ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <Image src={icon} alt="" width={13.4} height={13.4} />
          )}
          {label}
        </button>
      ))}
    </div>
  );
}
