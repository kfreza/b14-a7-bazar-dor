import Link from "next/link";
import { Suspense } from "react";
import { getCategories } from "@/lib/api";
import BnDate from "./bn-date";
import CategoryNav, { CategoryChips } from "./category-nav";
import UserMenu from "./user-menu";

export default async function Navbar() {
  const categories = await getCategories();

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
          <span className="flex flex-col">
            <span className="text-xl leading-7 font-bold tracking-[-0.5px]">বাজার দর</span>
            <BnDate className="text-xs leading-4" />
          </span>
        </Link>

        <UserMenu />
      </div>

      <nav aria-label="ক্যাটাগরি" className="border-t border-base-200">
        <div className="mx-auto max-w-6xl px-4">
          <Suspense fallback={<CategoryChips categories={categories} />}>
            <CategoryNav categories={categories} />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
