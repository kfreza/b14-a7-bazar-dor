import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell, { AuthFormSkeleton } from "@/components/auth/auth-shell";
import SignInForm from "@/components/auth/signin-form";

export const metadata: Metadata = {
  title: "সাইন ইন",
};

export default function SignInPage() {
  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <Suspense fallback={<AuthFormSkeleton fields={2} />}>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
