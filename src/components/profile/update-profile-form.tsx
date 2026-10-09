"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient, authErrorMessage } from "@/lib/auth-client";
import FormField from "../auth/form-field";

export default function UpdateProfileForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get("name") ?? "").trim();

    if (name.length < 2) {
      const message = "আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)।";
      setError(message);
      toast.error(message);
      return;
    }
    setError(undefined);

    if (name === currentName) {
      toast("নামে কোনো পরিবর্তন করা হয়নি।", { icon: "ℹ️" });
      return;
    }

    setLoading(true);
    const { error: updateError } = await authClient.updateUser({ name });
    setLoading(false);

    if (updateError) {
      toast.error(authErrorMessage(updateError));
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        label="নাম"
        name="name"
        autoComplete="name"
        defaultValue={currentName}
        placeholder="যেমন: রহিম উদ্দিন"
        error={error}
      />
      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading && <span className="loading loading-spinner loading-sm" />}
        তথ্য আপডেট করুন
      </button>
    </form>
  );
}
