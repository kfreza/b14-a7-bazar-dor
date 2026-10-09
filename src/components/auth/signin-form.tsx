"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient, authErrorMessage, safeRedirect } from "@/lib/auth-client";
import FormField from "./form-field";
import SocialButtons from "./social-buttons";

type Errors = Partial<Record<"email" | "password", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("redirect"));
  const isProtectedRedirect = searchParams.get("reason") === "protected";
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isProtectedRedirect) {
      toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন।", { id: "protected-route" });
    }
  }, [isProtectedRedirect, redirectTo]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const nextErrors: Errors = {};
    if (!EMAIL_PATTERN.test(email)) nextErrors.email = "সঠিক ইমেইল ঠিকানা দিন।";
    if (!password) nextErrors.password = "পাসওয়ার্ড দিন।";
    setErrors(nextErrors);

    const firstError = Object.values(nextErrors)[0];
    if (firstError) {
      toast.error(firstError);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(authErrorMessage(error));
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে!");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        label="ইমেইল"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email}
      />
      <FormField
        label="পাসওয়ার্ড"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="কমপক্ষে ৮ অক্ষর"
        error={errors.password}
      />
      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading && <span className="loading loading-spinner loading-sm" />}
        সাইন ইন
      </button>

      <div className="divider my-0 text-xs">অথবা</div>

      <SocialButtons redirectTo={redirectTo} />

      <p className="text-center text-sm leading-5">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}
