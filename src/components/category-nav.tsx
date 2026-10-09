"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

const CHIP_BASE =
  "flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg border px-3 text-xs leading-[17.1px] font-semibold whitespace-nowrap transition-colors";
const CHIP_IDLE = "border-transparent text-base-content hover:bg-base-200";
const CHIP_ACTIVE = "border-primary-stronger bg-primary-strong text-primary-content";

export function CategoryChips({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  return (
    <ul className="no-scrollbar flex items-center gap-1 overflow-x-auto py-2">
      {categories.map((category) => {
        const active = category.slug === activeSlug;
        return (
          <li key={category.slug}>
            <Link
              href={`/category/${category.slug}`}
              aria-current={active ? "page" : undefined}
              className={`${CHIP_BASE} ${active ? CHIP_ACTIVE : CHIP_IDLE}`}
            >
              <span aria-hidden>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const match = pathname.match(/^\/category\/([^/]+)/);
  const activeSlug = match ? decodeURIComponent(match[1]) : undefined;

  return <CategoryChips categories={categories} activeSlug={activeSlug} />;
}
