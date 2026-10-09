"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function useSignOut() {
  const router = useRouter();

  return async function signOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন।");
      return;
    }
    toast.success("সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  };
}
