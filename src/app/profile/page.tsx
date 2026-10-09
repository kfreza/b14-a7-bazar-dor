import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import SignOutButton from "@/components/profile/sign-out-button";
import UserAvatar from "@/components/user-avatar";
import { formatBnDate } from "@/lib/format";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "আমার প্রোফাইল",
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-base-200 py-3 last:border-b-0 sm:flex-row sm:gap-4">
      <dt className="w-28 shrink-0 text-sm leading-5 text-base-content/70">{label}</dt>
      <dd className="text-sm leading-5 font-medium break-all">{value}</dd>
    </div>
  );
}

async function ProfileContent() {
  const { user } = await requireSession("/profile");

  return (
    <>
      <section className="flex flex-col items-start gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-center">
        <UserAvatar name={user.name} image={user.image} size={72} className="rounded-2xl" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xl leading-7 font-semibold">{user.name}</p>
          <p className="truncate text-base leading-6">{user.email}</p>
        </div>
        <SignOutButton />
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="text-lg leading-7 font-semibold">তথ্য</h2>
        <dl>
          <InfoRow label="নাম" value={user.name} />
          <InfoRow label="ইমেইল" value={user.email} />
          <InfoRow label="সদস্য হয়েছেন" value={formatBnDate(new Date(user.createdAt))} />
        </dl>
        <Link href="/profile/update" className="btn btn-primary mt-2 w-full sm:w-auto sm:self-start">
          ✏️ তথ্য আপডেট করুন
        </Link>
      </section>
    </>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-6">
        <div className="skeleton size-18 shrink-0 rounded-2xl" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="skeleton h-6 w-40" />
          <div className="skeleton h-4 w-56" />
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="skeleton h-6 w-16" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-10 w-44" />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
      <header>
        <h1 className="text-2xl leading-8 font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm leading-5">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </header>
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
