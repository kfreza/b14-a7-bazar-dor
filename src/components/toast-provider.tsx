"use client";

import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const URL_TOASTS: Record<string, { type: "success" | "error"; message: string }> = {
  welcome: { type: "success", message: "সফলভাবে সাইন ইন হয়েছে!" },
  "social-error": { type: "error", message: "সোশ্যাল লগইন ব্যর্থ হয়েছে, আবার চেষ্টা করুন।" },
};

export default function ToastProvider() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const key = url.searchParams.get("auth");
    if (!key || !URL_TOASTS[key]) return;

    const { type, message } = URL_TOASTS[key];
    toast[type](message, { id: `auth-${key}` });
    url.searchParams.delete("auth");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  }, []);

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: "!font-sans !text-sm",
        success: { iconTheme: { primary: "#05893e", secondary: "#f3fbf4" } },
        error: { iconTheme: { primary: "#d03739", secondary: "#fff5f5" } },
      }}
    />
  );
}
