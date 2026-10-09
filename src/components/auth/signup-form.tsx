"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient, authErrorMessage } from "@/lib/auth-client";
import FormField from "./form-field";
import SocialButtons from "./social-buttons";

type Field = "name" | "email" | "password" | "confirmPassword";
type Errors = Partial<Record<Field, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    const nextErrors: Errors = {};
    if (name.length < 2) nextErrors.name = "আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)।";
    if (!EMAIL_PATTERN.test(email)) nextErrors.email = "সঠিক ইমেইল ঠিকানা দিন।";
    if (password.length < 8) nextErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
    if (confirmPassword !== password) nextErrors.confirmPassword = "পাসওয়ার্ড দুটি মিলছে না।";
    setErrors(nextErrors);

    const firstError = Object.values(nextErrors)[0];
    if (firstError) {
      toast.error(firstError);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });

    if (error) {
      setLoading(false);
      toast.error(authErrorMessage(error));
      return;
    }

    await authClient.signOut();
    setLoading(false);
    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন।");
    router.push("/signin");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        label="নাম"
        name="name"
        autoComplete="name"
        placeholder="যেমন: রহিম উদ্দিন"
        error={errors.name}
      />
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
        autoComplete="new-password"
        placeholder="কমপক্ষে ৮ অক্ষর"
        error={errors.password}
      />
      <FormField
        label="পাসওয়ার্ড নিশ্চিত করুন"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        placeholder="আবার লিখুন"
        error={errors.confirmPassword}
      />
      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading && <span className="loading loading-spinner loading-sm" />}
        অ্যাকাউন্ট তৈরি করুন
      </button>

      <div className="divider my-0 text-xs">অথবা</div>

      <SocialButtons />

      <p className="text-center text-sm leading-5">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}
