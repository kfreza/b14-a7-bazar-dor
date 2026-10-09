import Link from "next/link";

export default function EmptyState({
  icon = "🧺",
  code,
  title,
  message,
}: {
  icon?: string;
  code?: string;
  title: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-base-300 bg-base-100 px-4 py-14 text-center">
      <span aria-hidden className="text-5xl leading-none">
        {icon}
      </span>
      {code && <p className="text-5xl font-bold text-primary">{code}</p>}
      <h1 className="text-2xl leading-8 font-bold">{title}</h1>
      <p className="max-w-md text-sm leading-5 text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary btn-sm mt-2 sm:btn-md">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
