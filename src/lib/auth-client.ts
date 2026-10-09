import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড সঠিক নয়।",
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।",
  INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা দিন।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
  PASSWORD_TOO_LONG: "পাসওয়ার্ড অনেক বড় হয়ে গেছে।",
  USER_NOT_FOUND: "এই ইমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি।",
};

export function authErrorMessage(error: { code?: string; message?: string } | null | undefined) {
  if (error?.code && ERROR_MESSAGES[error.code]) return ERROR_MESSAGES[error.code];
  return error?.message || "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।";
}

export function safeRedirect(value: string | null | undefined, fallback = "/") {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}

export function withAuthFlag(path: string, flag: string) {
  return `${path}${path.includes("?") ? "&" : "?"}auth=${flag}`;
}
