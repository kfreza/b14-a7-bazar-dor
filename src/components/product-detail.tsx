import Image from "next/image";
import Link from "next/link";
import { CHANGE_TEXT_CLASS } from "@/lib/change";
import { formatBnNumber, formatChange, formatPrice, perUnitLabel, toBnDigits, unitLabel } from "@/lib/format";
import { marketAverage, priceSummary } from "@/lib/products";
import type { Product } from "@/lib/types";

const CHANGE_WORD = { up: "বেড়েছে", down: "কমেছে" } as const;

function Breadcrumbs({ product }: { product: Product }) {
  const chevron = (
    <Image src="/images/breadcrumb-chevron.svg" alt="" width={6} height={8} className="shrink-0" />
  );

  return (
    <nav aria-label="ব্রেডক্রাম্ব" className="py-2">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-1 text-sm leading-5">
        <li>
          <Link href="/" className="hover:text-primary">
            হোম
          </Link>
        </li>
        <li className="flex items-center gap-3">
          {chevron}
          <Link href={`/category/${product.category}`} className="hover:text-primary">
            {product.categoryNameBn}
          </Link>
        </li>
        <li className="flex items-center gap-3" aria-current="page">
          {chevron}
          <span>{product.nameBn}</span>
        </li>
      </ol>
    </nav>
  );
}

function SummaryStat({
  label,
  value,
  caption,
  valueClass,
}: {
  label: string;
  value: number;
  caption: string;
  valueClass: string;
}) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 px-6 py-4">
      <p className="text-xs leading-4.5">{label}</p>
      <p className={`leading-8 font-bold ${valueClass}`}>
        <span className="text-2xl">{formatBnNumber(value)}</span>{" "}
        <span className="text-sm font-medium">টাকা</span>
      </p>
      <p className="text-xs leading-4.5">{caption}</p>
    </div>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const summary = priceSummary(product);
  const diff = Math.abs(product.today - product.yesterday);
  const { dir } = product.change;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-6">
      <Breadcrumbs product={product} />

      <header className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl leading-10 sm:size-20">
            {product.image}
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl leading-8 font-bold sm:text-3xl sm:leading-9">{product.nameBn}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm leading-5">
              <span>{perUnitLabel(product.unit)}</span>
              <span aria-hidden>·</span>
              <Link
                href={`/category/${product.category}`}
                className="badge badge-sm border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
            </div>
            <p className="mt-2 text-sm leading-5">
              {dir === "flat" ? (
                <>
                  গতকালের তুলনায় আজ দাম <span className="font-semibold">অপরিবর্তিত</span>
                </>
              ) : (
                <>
                  গতকালের তুলনায় আজ দাম <span className="font-semibold">{CHANGE_WORD[dir]}</span> ·{" "}
                  {formatPrice(diff)}
                </>
              )}
            </p>
            {summary && (
              <p className="text-sm leading-5 text-base-content/70">
                {toBnDigits(product.markets.length)}টি বাজারে আজ দাম {formatBnNumber(summary.min)}–
                {formatPrice(summary.max)}-এর মধ্যে।
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center rounded-2xl bg-base-200 px-5 py-4 text-center">
          <p className="text-sm leading-5">আজকের দাম</p>
          <p className="text-3xl leading-9 font-bold">{formatBnNumber(product.today)}</p>
          <p className="text-sm leading-5">টাকা / {unitLabel(product.unit)}</p>
          <p className={`mt-1 text-sm leading-5 font-semibold ${CHANGE_TEXT_CLASS[dir]}`}>
            {formatChange(dir, product.change.pct)}
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-100 p-5">
        {summary && (
          <section className="flex flex-col gap-3">
            <h2 className="text-lg leading-7 font-semibold">দামের সারসংক্ষেপ</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <SummaryStat
                label="সর্বনিম্ন দাম"
                value={summary.min}
                caption={`সবচেয়ে কম: ${summary.cheapest.market}`}
                valueClass="text-success"
              />
              <SummaryStat
                label="সর্বাধিক দাম"
                value={summary.max}
                caption={`সবচেয়ে বেশি: ${summary.priciest.market}`}
                valueClass="text-error"
              />
              <SummaryStat
                label="গড় দাম"
                value={summary.avg}
                caption={`${perUnitLabel(product.unit)}-এর হিসাবে`}
                valueClass="text-primary"
              />
            </div>
          </section>
        )}

        <section className="flex flex-col gap-3">
          <h2 className="text-lg leading-7 font-semibold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="w-full min-w-xl text-sm leading-5.25">
              <thead>
                <tr className="border-b border-base-content/20 text-left">
                  <th className="px-4 py-3 font-bold">বাজার</th>
                  <th className="px-4 py-3 font-bold">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-bold">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right font-bold">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-bold">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((market) => (
                  <tr
                    key={`${market.division}-${market.market}`}
                    className="border-b border-base-content/10 last:border-b-0 hover:bg-base-200/60"
                  >
                    <td className="px-4 py-3 font-medium">{market.market}</td>
                    <td className="px-4 py-3">{market.division}</td>
                    <td
                      className={`px-4 py-3 text-right ${market.min === summary?.min ? "font-semibold text-success" : ""}`}
                    >
                      {formatPrice(market.min)}
                    </td>
                    <td
                      className={`px-4 py-3 text-right ${market.max === summary?.max ? "font-semibold text-error" : ""}`}
                    >
                      {formatPrice(market.max)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {formatPrice(marketAverage(market))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn btn-ghost btn-sm border-base-300 sm:btn-md">
          ← হোম পেজে ফিরে যান
        </Link>
        <Link href={`/category/${product.category}`} className="btn btn-primary btn-sm sm:btn-md">
          সব {product.categoryNameBn} দেখুন
        </Link>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-6" aria-busy="true">
      <div className="skeleton h-5 w-56" />
      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-4">
          <div className="skeleton size-20 shrink-0 rounded-2xl" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="skeleton h-8 w-48" />
            <div className="skeleton h-4 w-32" />
            <div className="skeleton h-4 w-64" />
          </div>
        </div>
        <div className="skeleton h-32 w-full rounded-2xl sm:w-28" />
      </div>
      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="skeleton h-6 w-40" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="skeleton h-24 rounded-2xl" />
          ))}
        </div>
        <div className="skeleton h-6 w-48" />
        <div className="skeleton h-72 rounded-2xl" />
      </div>
      <span className="sr-only">লোড হচ্ছে…</span>
    </div>
  );
}
