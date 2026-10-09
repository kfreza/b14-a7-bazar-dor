"use client";

import Image from "next/image";
import { useState } from "react";
import { toBnDigits } from "@/lib/format";
import { sortByPrice, type SortOrder } from "@/lib/products";
import type { Product } from "@/lib/types";
import ProductGrid from "./product-grid";

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortableProducts({ products }: { products: Product[] }) {
  const [order, setOrder] = useState<SortOrder>("default");
  const sorted = sortByPrice(products, order);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end rounded-2xl border border-base-300 bg-base-100 p-4">
        <label className="flex items-center gap-2">
          <span className="text-sm leading-5">সাজান</span>
          <span className="relative">
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as SortOrder)}
              className="h-8 cursor-pointer appearance-none rounded-lg border border-base-content bg-base-100 pr-7 pl-3 text-xs leading-4.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Image
              src="/images/chevron-down.svg"
              alt=""
              width={10}
              height={10}
              className="pointer-events-none absolute top-2.5 right-3"
            />
          </span>
        </label>
      </div>

      <p className="text-sm leading-5">মোট {toBnDigits(products.length)}টি পণ্য দেখানো হচ্ছে</p>

      <ProductGrid products={sorted} />
    </div>
  );
}
