import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-10">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl leading-8 font-bold">{title}</h1>
        <p className="text-sm leading-5">{subtitle}</p>
      </div>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">{children}</div>
      <Link href="/" className="text-center text-sm leading-5 hover:text-primary">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

export function AuthFormSkeleton({ fields }: { fields: number }) {
  return (
    <div className="flex flex-col gap-4" aria-busy="true">
      {Array.from({ length: fields }, (_, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-10 w-full" />
        </div>
      ))}
      <div className="skeleton h-10 w-full" />
      <div className="skeleton h-4 w-full" />
      <div className="flex gap-2">
        <div className="skeleton h-10 flex-1" />
        <div className="skeleton h-10 flex-1" />
      </div>
    </div>
  );
}
