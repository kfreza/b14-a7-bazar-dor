import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import UpdateProfileForm from "@/components/profile/update-profile-form";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "তথ্য আপডেট করুন",
};

async function UpdateForm() {
  const { user } = await requireSession("/profile/update");
  return <UpdateProfileForm currentName={user.name} />;
}

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true">
      <div className="flex flex-col gap-1">
        <div className="skeleton h-4 w-12" />
        <div className="skeleton h-10 w-full" />
      </div>
      <div className="skeleton h-10 w-full" />
    </div>
  );
}

export default function UpdateProfilePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
      <header>
        <h1 className="text-2xl leading-8 font-bold">তথ্য আপডেট করুন</h1>
        <p className="text-sm leading-5">আপনার নাম পরিবর্তন করে আপডেট বাটনে চাপ দিন।</p>
      </header>

      <section className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="text-lg leading-7 font-semibold">তথ্য</h2>
        <div className="p-0 sm:p-6">
          <Suspense fallback={<FormSkeleton />}>
            <UpdateForm />
          </Suspense>
        </div>
      </section>

      <Link href="/profile" className="text-center text-sm leading-5 hover:text-primary">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}
