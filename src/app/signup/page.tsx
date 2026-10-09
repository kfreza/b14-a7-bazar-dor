import type { Metadata } from "next";
import AuthShell from "@/components/auth/auth-shell";
import SignUpForm from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "সাইন আপ",
};

export default function SignUpPage() {
  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <SignUpForm />
    </AuthShell>
  );
}
